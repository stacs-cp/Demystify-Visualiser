import React from 'react';
import NavSwitcher from './NavSwitcher';
import Board from './Board/Board';
import ExplanationList from "./Explanations/ExplanationList";

import { Row, Col, Card } from 'react-bootstrap';

import TentsBoard from './PuzzleBoards/TentsBoard';
import BinairoBoard from './PuzzleBoards/BinairoBoard';
import KillerBoard from './PuzzleBoards/KillerBoard';
import KakuroBoard from './PuzzleBoards/KakuroBoard';
import StarBattleBoard from './PuzzleBoards/StarBattleBoard';
import FutoshikiBoard from './PuzzleBoards/FutoshikiBoard';

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
            type: this.props.type,
            params: this.props.params,
            inputObject: this.props.inputObject
        }
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
                    JSON.stringify(prev.highlightedExplanations) == JSON.stringify(val) ? 
                        [] : val } });
    }

    // Passed to the NavSwitcher.
    setCurrentStep(step) {
        this.setState({ currentStep: step });
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
            // ...Add more cases here
            default:
                return <Board {...boardProps}/>
        }
    }
    render() {
        // Core required board props. 
        const boardProps = {
            params: this.state.params,
            highlight: this.highlightExplanation.bind(this),
            key: this.state.highlightedLiterals,
            highlighted: this.state.highlightedLiterals, 
            rows: this.state.inputObject[this.state.currentStep].puzzleState.matrices[0].rows
        }
        return (
            <React.Fragment>
                <NavSwitcher setCurrentStep={this.setCurrentStep.bind(this)} maxSteps={this.state.inputObject.length - 1} />
                <Row className="mb-4">
                    {/*The main board: adjust width based on screen size */}
                    <Col xs={12} md={8} lg={8} xl={6}>
                        {this.chooseBoard(boardProps)} 
                    </Col>

                    {/*The explanations */}
                    <Col>
                        {this.state.inputObject[this.state.currentStep].skippedDeductions &&
                            <Card className="mt-3">
                                <Card.Body>
                                    <small>Skipped some obvious deductions.</small>
                                </Card.Body>
                            </Card>
                            // TODO: add a way to see skipped deductions
                        }
                        <ExplanationList
                            highlight={this.highlightLiteral.bind(this)}
                            simpleDeductions={this.state.inputObject[this.state.currentStep].simpleDeductions}
                            deductions={this.state.inputObject[this.state.currentStep].deductions}
                            highlighted={this.state.highlightedExplanations} />
                        {/* TODO: add a way to see alternative deductions / follow different paths. */}
                    </Col>
                </Row>
            </React.Fragment>
        );
    }
}

export default PuzzleStepper;