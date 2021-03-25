import React from 'react';
import NavSwitcher from './NavSwitcher';
import Board from './Board';
import FileLoader from './FileLoader';

import { Container, Button, Row, Col } from 'react-bootstrap';
import Explanations from './Explanations';

class DemystifyViewer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      inputObject: [],
      currentStep: 0,
      highlighted: -1
    }
  }

  highlight(val) {
    this.setState({highlighted: val});
  }

  setInput(obj) {
    this.setState({ inputObject: obj })
  }

  setCurrentStep(step) {
    this.setState({ currentStep: step });
  }

  render = () => {
    
    return (
      <Container fluid>
        {this.state.inputObject.length == 0 && <FileLoader setInput={this.setInput.bind(this)} />}
        {this.state.inputObject.length != 0 && <NavSwitcher setCurrentStep={this.setCurrentStep.bind(this)} maxSteps={this.state.inputObject.length - 1} />}

        {this.state.inputObject.length != 0 &&
          <Row className="mb-4">
            <Col xs={9}><Board key={this.state.highlighted[0]} highlighted={this.state.highlighted} rows={this.state.inputObject[this.state.currentStep].puzzleState.matrices[0].rows} /></Col>
            <Col><Explanations highlight={this.highlight.bind(this)} simpleDeductions={this.state.inputObject[this.state.currentStep].simpleDeductions} deductions={this.state.inputObject[this.state.currentStep].deductions}/></Col>
          </Row>

        }
      </Container>
    )
  }
}

export default DemystifyViewer
