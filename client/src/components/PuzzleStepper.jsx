import React from "react";
import NavSwitcher from "./NavSwitcher";
import Board from "./Board/Board";
import ExplanationList from "./Explanations/ExplanationList";

import { Row, Col, Card, Button, Alert } from "react-bootstrap";

import TentsBoard from "./PuzzleBoards/TentsBoard";
import BinairoBoard from "./PuzzleBoards/BinairoBoard";
import KillerBoard from "./PuzzleBoards/KillerBoard";
import KakuroBoard from "./PuzzleBoards/KakuroBoard";
import KakurasuBoard from "./PuzzleBoards/KakurasuBoard";
import StarBattleBoard from "./PuzzleBoards/StarBattleBoard";
import FutoshikiBoard from "./PuzzleBoards/FutoshikiBoard";
import ThermometerBoard from "./PuzzleBoards/ThermometerBoard";
import SkyscrapersBoard from "./PuzzleBoards/SkyscrapersBoard";
import GaramBoard from "./PuzzleBoards/GaramBoard";
import NonogramBoard from "./PuzzleBoards/NonogramBoard";
import SudokuBoard from "./PuzzleBoards/SudokuBoard";
import DoubleMinesweeperBoard from "./PuzzleBoards/DoubleMinesweeperBoard";
import JobWait from "./JobWait";

import * as API from "../API";
import LoopyBoard from "./PuzzleBoards/LoopyBoard";

/**
 * Main puzzle visualiser with a board on the left and explanations on the right.
 */
class PuzzleStepper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentStep: 0,
      highlightedLiterals: -1,
      highlightedExplanations: [],
      selectedLiteral: null,
      currentChoice: 0,
      selectedChoice: 0,
      type: this.props.type,
      params: this.props.params,
      inputObject: this.props.inputObject,
      continueData: this.props.continueData,
      isWaiting: false,
      finishedPuzzle: false,
      error: null,
      optionDict: this.getOptionDict(this.props.type, this.props.params)
    };
  }

  // Get dictionary mapping numbers in essence prime puzzle spec to more user readable strings
  getOptionDict(type, params) {
    let optionDict = {};
    switch (type) {
      case "double_minesweeper.eprime":
        let mines_per_box = params.mines_per_box;

        //Display number representing empty square as "Empty"
        optionDict[mines_per_box * 8 + 1] = "Empty";

        //Display -1 as "1 mine", -2 as "2 mines" and so on
        for (let i = -mines_per_box; i < 0; ++i) {
          optionDict[i] = (-i).toString() + " mine"
          if (i != -1) {
            optionDict[i] += "s";
          }
        }

        return optionDict;
      // ================================
      // <-- More Cases can be added here
      // ================================
      default:
        return optionDict;
    }
  }


  // Choose a board if we have defined one for this puzzle type.
  chooseBoard(boardProps) {
    switch (this.state.type) {
      case "tents.eprime":
        return <TentsBoard {...boardProps} />;
      case "binairo.eprime":
        return <BinairoBoard {...boardProps} />;
      case "nice_killer.eprime":
        return <KillerBoard {...boardProps} />;
      case "star-battle.eprime":
        return <StarBattleBoard {...boardProps} />;
      case "kakuro.eprime":
        return <KakuroBoard {...boardProps} />;
      case "kakurasu.eprime":
        return <KakurasuBoard {...boardProps} />;
      case "nfutoshiki.eprime":
        return <FutoshikiBoard {...boardProps} />;
      case "thermometer.eprime":
        return <ThermometerBoard {...boardProps} />;
      case "skyscrapers.eprime":
        return <SkyscrapersBoard {...boardProps} />;
      case "garam.eprime":
        return <GaramBoard {...boardProps} />;
      case "nonogram.eprime":
        return <NonogramBoard {...boardProps} />;
      case "x-sums.eprime":
        return <SudokuBoard {...boardProps} />;
      case "miracle.eprime":
        return <SudokuBoard {...boardProps} />;
      case "sudoku.eprime":
        return <SudokuBoard {...boardProps} />;
      case "loopy.essence":
        return <LoopyBoard {...boardProps} />;
      case "double_minesweeper.eprime":
        return <DoubleMinesweeperBoard {...boardProps} />;
      // ================================
      // <-- More Cases can be added here
      // ================================
      default:
        return <Board {...boardProps} />;
    }
  }

  /* Detect whether we are at a step where the user should have a choice 
       (mode dependent) 
    */
  isChoicesStep() {
    return (
      this.props.mode === "manual" &&
      !this.state.finishedPuzzle &&
      this.state.currentStep === this.state.inputObject.length - 1
    );
  }

  isLitForceStep() {
    return (
      this.props.mode === "force" &&
      !this.state.finishedPuzzle &&
      this.state.currentStep === this.state.inputObject.length - 1
    );
  }

  /* Two-way highlighting system: mouseover an explanation and see relevant literals,
        mouseover a literals to see relevant explanations. 
    */
  highlightLiteral(val) {
    this.setState((prev) => {
      return {
        highlightedLiterals: prev.highlightedLiterals === val ? -1 : val,
      };
    });
  }

  highlightExplanation(val) {
    this.setState((prev) => {
      return {
        highlightedExplanations:
          JSON.stringify(prev.highlightedExplanations) === JSON.stringify(val)
            ? []
            : val,
      };
    });
  }

  // Passed to the NavSwitcher for overall steps
  setCurrentStep(step) {
    this.setState({ currentStep: step, currentChoice: 0 });
  }

  // Passed to the NavSwitcher for switching between alternatives.
  setChoice(number) {
    this.setState({ currentChoice: number });
  }

  // Alternative button to pass to NavSwitcher for confirming interactive choice.
  getEndButton() {
    if (this.isChoicesStep()) {
      return (
        <Button
          variant="success"
          disabled={this.state.isWaiting}
          onClick={this.handleGetNext.bind(this)}
        >
          {"Confirm Choice"}{" "}
        </Button>
      );
    } else if (this.isLitForceStep()) {
      return (
        <Button
          variant="success"
          disabled={this.state.isWaiting}
          onClick={this.handleGetNextWithForce.bind(this)}
        >
          {"Confirm Choice"}{" "}
        </Button>
      );
    } else {
      return null;
    }
  }

  // Update the input object and state after a choice has been made.
  appendInput(obj, mode) {
    this.setState({
      currentChoice: 0,
      selectedChoice: 0,
      selectedLiteral: null,
      currentStep:
        this.props.mode === "force"
          ? this.state.currentStep
          : this.state.currentStep + 1,
      continueData: obj,
      finishedPuzzle: obj.finished,
      inputObject: [
        ...this.state.inputObject.slice(0, -1),
        ...obj.result.steps,
      ],
      isWaiting: false,
    });
  }

  // Get next step with MUS choice.
  async handleGetNext() {
    const { eprimeName, eprime, paramName, param, algorithm, explainedLits } =
      this.state.continueData;
    const { currentChoice } = this.state;
    const result = await API.createJob({
      eprimeName: eprimeName,
      eprime: eprime,
      paramName: paramName,
      param: param,
      algorithm: algorithm,
      numSteps: 1,
      explainedLits: explainedLits,
      choice: currentChoice,
      appendCurrent: this.props.mode === "force"
    });
    this.setState({ isWaiting: true, jobId: result.jobId });
  }

    // Get next step skipping choices entirely
    async handleSkip() {
        const { eprimeName, eprime, paramName, param, algorithm, explainedLits } =
          this.state.continueData;
        const { currentChoice } = this.state;
        const result = await API.createJob({
          eprimeName: eprimeName,
          eprime: eprime,
          paramName: paramName,
          param: param,
          algorithm: algorithm,
          numSteps: 1,
          explainedLits: explainedLits,
          choice: 0,
          appendCurrent: this.props.mode === "force"
        });
        this.setState({ isWaiting: true, jobId: result.jobId });
      }

  // Get next step with literal choice.
  async handleGetNextWithForce() {
    if (!this.state.selectedLiteral) {
      this.setState({ error: "Please choose a literal to continue." });
      return;
    }
    const { eprimeName, eprime, paramName, param, algorithm, explainedLits } =
      this.state.continueData;
    const { selectedLiteral } = this.state;
    const litChoice = {
      row: selectedLiteral.row + 1,
      column: selectedLiteral.column + 1,
      value: selectedLiteral.value,
    };

    const result = await API.createJob({
      eprimeName: eprimeName,
      eprime: eprime,
      paramName: paramName,
      param: param,
      algorithm: algorithm,
      numSteps: 1,
      explainedLits: explainedLits,
      litChoice: litChoice,
      appendCurrent: true
    });
    this.setState({ isWaiting: true, jobId: result.jobId, error: null });
  }

  /* Retrieve the current step being displayed: depends on mode and whether
     there are alternative choices */
  getStepData() {
    if (this.isChoicesStep()) {
      return this.state.inputObject[this.state.currentStep].choices[
        this.state.currentChoice
      ];
    } else {
      return this.state.currentChoice === 0
        ? this.state.inputObject[this.state.currentStep]
        : this.state.inputObject[this.state.currentStep].otherChoices[
            this.state.currentChoice - 1
          ];
    }
  }

  getAlternatives() {
    if (this.isChoicesStep()) {
      return this.state.inputObject[this.state.currentStep].choices;
    } else {
      return this.state.inputObject[this.state.currentStep].otherChoices;
    }
  }

  handleSelectChoice() {
    this.setState({ selectedChoice: this.state.currentChoice });
  }

  setSelectedLiteral(row, column, value) {
    this.setState({
      selectedLiteral: { row: row, column: column, value: value },
    });
  }
  render() {
    const stepData = this.getStepData();

    // Core required board props.
    const boardProps = {
      params: this.state.params,
      highlight: this.highlightExplanation.bind(this),
      key: this.state.highlightedLiterals,
      highlighted: this.state.highlightedLiterals,
      rows: stepData.puzzleState.matrices[0].rows,
      setSelectedLiteral: this.setSelectedLiteral.bind(this),
      optionDict: this.state.optionDict
    };

    return (
      <React.Fragment>
        <NavSwitcher
          className="mt-3 p-3"
          stepName={"step"}
          setCurrentStep={this.setCurrentStep.bind(this)}
          maxSteps={this.state.inputObject.length - 1}
          currentStep={this.state.currentStep}
          endButton={this.getEndButton()}
        />
        {this.state.isWaiting ? (
          <Row className="mt-4 d-flex justify-content-center align-items-center">
            <Card className="mt-3">
              <Card.Body>
                <JobWait
                  jobId={this.state.jobId}
                  setInput={this.appendInput.bind(this)}
                  mode={this.state.mode}
                />
              </Card.Body>
            </Card>
          </Row>
        ) : (
          <Row className="mb-4">
            {/*The main board: adjust width based on screen size */}
            <Col xs={12} md={8} lg={8} xl={6}>
              {this.chooseBoard(boardProps)}
            </Col>

            {/*Sidebar for explanation and/or options*/}
            <Col>
              {this.isLitForceStep() && (
                /* If this a literal choice step, display a prompt with the currently
                   selected literal. */
                <Card className="mt-3">
                  <Card.Body>
                    <b>
                      Choose a literal (value on the board) to force
                      explanations for that literal.
                    </b>
                    <br /> <br /> Currently selected literal:
                    <b>
                      {this.state.selectedLiteral
                        ? " [" +
                          (this.state.selectedLiteral.row + 1) +
                          ", " +
                          (this.state.selectedLiteral.column + 1) +
                          "] with value " +
                          this.state.selectedLiteral.value
                        : " none"}
                    </b>
                    <br />
                    <Button 
                       className="mt-4" 
                       variant="secondary"
                       onClick={this.handleSkip.bind(this)}>
                        Skip choice for this step</Button>
                  </Card.Body>
                </Card>
              )}

              {stepData.skippedDeductions && (
                <Card className="mt-3">
                  <Card.Body>
                    <small>Skipped some obvious deductions.</small>
                  </Card.Body>
                </Card>
              )}

              {this.state.error && (
                <Alert className="mt-3" variant="warning">
                  {this.state.error}
                </Alert>
              )}

              {!this.isLitForceStep() && (
                // The explanations
                <ExplanationList
                  highlight={this.highlightLiteral.bind(this)}
                  /* Only one of simpleDeductions or deductions should be defined. */
                  simpleDeductions={stepData.simpleDeductions}
                  deduction={stepData.deduction}
                  highlighted={this.state.highlightedExplanations}
                  boldBorder={
                    this.isChoicesStep() &&
                    this.state.currentChoice === this.state.selectedChoice
                  }
                  /* Props for displaying alternatives */
                  choices={this.getAlternatives()}
                  smallestMUSSize={
                    this.state.inputObject[this.state.currentStep]
                      .smallestMUSSize
                  }
                  setChoice={this.setChoice.bind(this)}
                  currentChoice={this.state.currentChoice}
                  extraChoice={!this.isChoicesStep()}
                  optionDict={this.state.optionDict}
                >
                  {/* If this is a MUS choice step, display another NavSwitcher
                      to view the choices, along with a selection button. */
                    this.isChoicesStep() && (
                    <>
                      {this.state.currentChoice !==
                      this.state.selectedChoice ? (
                        <Button
                          onClick={this.handleSelectChoice.bind(this)}
                          className="mt-3"
                          variant="success"
                        >
                          Select explanation
                        </Button>
                      ) : (
                        <Button className="mt-3" disabled variant="success">
                          Currently selected
                        </Button>
                      )}
                      <p className="mt-3">
                        Currently selected choice:{" "}
                        {this.state.selectedChoice + 1}
                      </p>{" "}
                    </>
                  )}
                </ExplanationList>
              )}
            </Col>
          </Row>
        )}
      </React.Fragment>
    );
  }
}

export default PuzzleStepper;
