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
            currentAlternative: 0,
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
                    JSON.stringify(prev.highlightedExplanations)===JSON.stringify(val) ? 
                        [] : val } });
    }

    // Passed to the NavSwitcher for overall steps
    setCurrentStep(step) {
        this.setState({ currentStep: step, currentAlternative: 0});
    }

    // Passed to the NavSwitcher for switching between alternatives.
    setAlternative(number) {
        this.setState({currentAlternative: number})
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
        const stepData = this.state.currentAlternative=== 0 ?
            this.state.inputObject[this.state.currentStep]
            : this.state.inputObject[this.state.currentStep].otherChoices[this.state.currentAlternative - 1]

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
                    currentStep={this.state.currentStep}/>

                <Row className="mb-4">
                    {/*The main board: adjust width based on screen size */}
                    <Col xs={12} md={8} lg={8} xl={8}>
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
                            deductions={stepData.deductions}

                            highlighted={this.state.highlightedExplanations} 

                            /* Props for displaying alternatives */
                            otherChoices={this.state.inputObject[this.state.currentStep].otherChoices}
                            smallestMUSSize={this.state.inputObject[this.state.currentStep].smallestMUSSize}
                            setAlternative={this.setAlternative.bind(this)}
                            currentAlternative={this.state.currentAlternative}
                            />
                        
                        
                    </Col>
                </Row>
            </React.Fragment>
        );
    }
}

export default PuzzleStepper;