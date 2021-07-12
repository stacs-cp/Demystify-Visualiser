import React from 'react';
import NavSwitcher from './NavSwitcher';
import Board from './Board/Board';
import ExplanationList from "./Explanations/ExplanationList";

import { Row, Col, Card, Button } from 'react-bootstrap';

import TentsBoard from './PuzzleBoards/TentsBoard';
import BinairoBoard from './PuzzleBoards/BinairoBoard';
import KillerBoard from './PuzzleBoards/KillerBoard';
import KakuroBoard from './PuzzleBoards/KakuroBoard';
import StarBattleBoard from './PuzzleBoards/StarBattleBoard';
import FutoshikiBoard from './PuzzleBoards/FutoshikiBoard';
import ThermometerBoard from './PuzzleBoards/ThermometerBoard';
import SkyscrapersBoard from './PuzzleBoards/SkyscrapersBoard';
import GaramBoard from './PuzzleBoards/GaramBoard';
import NonogramBoard from './PuzzleBoards/NonogramBoard';
import SudokuBoard from './PuzzleBoards/SudokuBoard';
import JobWait from './JobWait';

import * as API from "../API";

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
            currentChoice: 0,
            type: this.props.type,
            params: this.props.params,
            inputObject: this.props.inputObject,
            continueData: this.props.continueData,
            isWaiting: false,
        }
    }

    isChoicesStep() {
        return (this.props.mode === "manual") && (this.state.currentStep === this.state.inputObject.length - 1)
    }

    /* Two-way highlighting system: mouseover an explanation and see relevant literals,
        mouseover a literals to see relevant explanations. 
    */
    highlightLiteral(val) {
        this.setState((prev) => { return { highlightedLiterals: prev.highlightedLiterals === val ? -1 : val } });
    }

    highlightExplanation(val) {
        this.setState((prev) => 
            { return { 
                highlightedExplanations:
                    JSON.stringify(prev.highlightedExplanations)===JSON.stringify(val) ? 
                        [] : val } });
    }

    // Passed to the NavSwitcher for overall steps
    setCurrentStep(step) {
        this.setState({ currentStep: step, currentChoice: 0});
    }

    // Passed to the NavSwitcher for switching between alternatives.
    setChoice(number) {
        this.setState({currentChoice: number})
    }

    // Choose a board if we have defined one for this puzzle type.
    chooseBoard(boardProps) {
        switch(this.state.type) {
            case "tents.eprime":
                return <TentsBoard {...boardProps}/>
            case "binairo.eprime":
                return <BinairoBoard {...boardProps}/>
            case "nice_killer.eprime":
                return <KillerBoard {...boardProps}/>
            case "star-battle.eprime":
                return <StarBattleBoard {...boardProps}/>
            case "kakuro.eprime":
                return <KakuroBoard {...boardProps}/>
            case "nfutoshiki.eprime":
                return <FutoshikiBoard {...boardProps}/>
            case "thermometer.eprime":
                return <ThermometerBoard {...boardProps}/>
            case "skyscrapers.eprime":
                return <SkyscrapersBoard {...boardProps}/>
            case "garam.eprime":
                return <GaramBoard {...boardProps}/>
            case "nonogram.eprime":
                return <NonogramBoard {...boardProps}/>
            case "x-sums.eprime":
                return <SudokuBoard {...boardProps} />
            case "miracle.eprime":
                return <SudokuBoard {...boardProps} />
            case "sudoku.eprime":
                return <SudokuBoard {...boardProps} />
            default:
                return <Board {...boardProps}/>
        }
    }

    getEndButton() {
        if(this.isChoicesStep()) {
            return <Button 
                        variant="success" 
                        disabled={this.state.isWaiting} 
                        onClick={this.handleGetChoices.bind(this)}>{"Choices for next step"} </Button>
        } else {
            return null
        }
    }

    appendInput(obj, mode) {
        this.setState({
            continueData: obj, 
            inputObject: [...this.state.inputObject, {...obj.result[0], otherChoices: obj.result}],
            isWaiting: false})
    }

    async handleGetChoices() {
        const {eprimename, eprime, paramname, param, algorithm} = this.state.continueData;

        const result = await API.createJob(eprimename, eprime, paramname, param, algorithm, 0);
        this.setState({isWaiting: true, jobId: result.jobId})
    }

    getStepData() {
        if(this.isChoicesStep()) {
            return this.state.inputObject[this.state.currentStep]
        }
    }
    render() {

        const stepData = this.state.currentChoice=== 0 ?
            this.state.inputObject[this.state.currentStep]
            : this.state.inputObject[this.state.currentStep].otherChoices[this.state.currentChoice - 1]

        // Core required board props. 
        const boardProps = {
            params: this.state.params,
            highlight: this.highlightExplanation.bind(this),
            key: this.state.highlightedLiterals,
            highlighted: this.state.highlightedLiterals, 
            rows: stepData.puzzleState.matrices[0].rows
        }


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
                {this.state.isWaiting ? 
                            <Row className="mt-4 d-flex justify-content-center align-items-center">
                                <JobWait jobId={this.state.jobId} setInput={this.appendInput.bind(this)} mode={this.state.mode}/>
                            </Row>:
                <Row className="mb-4">
                    {/*The main board: adjust width based on screen size */}
                    <Col xs={12} md={8} lg={8} xl={6}>
                        {this.chooseBoard(boardProps)} 
                    </Col>

                    {/*The explanations*/}
                    <Col>
                        {stepData.skippedDeductions &&
                            <Card className="mt-3">
                                <Card.Body>
                                    <small>Skipped some obvious deductions.</small>
                                </Card.Body>
                            </Card>
                        }

                        <ExplanationList
                            highlight={this.highlightLiteral.bind(this)}

                            /* Only one of simpleDeductions or deductions should be defined. */
                            simpleDeductions={stepData.simpleDeductions}
                            deduction={stepData.deduction}
                            
                            highlighted={this.state.highlightedExplanations} 

                            /* Props for displaying alternatives */
                            choices={this.state.inputObject[this.state.currentStep].otherChoices}
                            smallestMUSSize={this.state.inputObject[this.state.currentStep].smallestMUSSize}
                            setChoice={this.setChoice.bind(this)}
                            currentChoice={this.state.currentChoice}
                            >
                            {this.isChoicesStep() &&
                            <> <Button variant="success">Select explanation</Button> 
                                <p>Currently selected choice: </p> </>}
                        </ExplanationList>
                        
                        
                        
                    </Col>
                </Row>}
            </React.Fragment>
        );
    }
}

export default PuzzleStepper;
