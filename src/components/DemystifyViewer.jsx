import React from 'react';
import NavSwitcher from './NavSwitcher';
import Board from './Board';
import FileLoader from './FileLoader';

import { Container, Row, Col } from 'react-bootstrap';
import Explanations from './Explanations';

class DemystifyViewer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      inputObject: [],
      currentStep: 0,
      highlightedLiterals: -1,
      highlightedExplanation: -1,
    }
  }

  highlightLiteral(val) {
    this.setState((prev) => { return {highlightedLiterals: prev.highlightedLiterals === val ? -1 : val}});
  }

  highlightExplanation(val) {
    this.setState((prev) => { return {highlightedExplanation: prev.highlightedExplanation === val ? -1 : val}});
  }

  setInput(obj) {
    this.setState({ inputObject: obj })
  }

  setCurrentStep(step) {
    this.setState({ currentStep: step });
  }

  render = () => {
    console.log(this.state)
    return (
      <Container fluid>
        {this.state.inputObject.length === 0 && <FileLoader setInput={this.setInput.bind(this)} />}
        {this.state.inputObject.length !== 0 && <NavSwitcher setCurrentStep={this.setCurrentStep.bind(this)} maxSteps={this.state.inputObject.length - 1} />}

        {this.state.inputObject.length !== 0 &&
          <Row className="mb-4">
            <Col xs={9}>
              <Board
                highlight={this.highlightExplanation.bind(this)} 
                key={this.state.highlightedLiterals} 
                highlighted={this.state.highlightedLiterals} 
                rows={this.state.inputObject[this.state.currentStep].puzzleState.matrices[0].rows} /></Col>
            <Col>
              <Explanations 
                highlight={this.highlightLiteral.bind(this)} 
                simpleDeductions={this.state.inputObject[this.state.currentStep].simpleDeductions} 
                deductions={this.state.inputObject[this.state.currentStep].deductions}
                highlighted={this.state.highlightedExplanation} /></Col>
          </Row>

        }
      </Container>
    )
  }
}

export default DemystifyViewer
