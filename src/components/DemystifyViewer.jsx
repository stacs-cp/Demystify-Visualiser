import React from 'react';

import FileLoader from './FileLoader';

import { Container, Row, Col, Card } from 'react-bootstrap';
import PuzzleStepper from './PuzzleStepper';

class DemystifyViewer extends React.Component {
  state = {
    inputObject: [],
    type: "",
    params: {}
  }
  setInput(obj) {
    this.setState({ inputObject: obj.steps, type: obj.name, params: obj.params })
  }

  render = () => {
    console.log(this.state)
    return (
      <Container fluid>
        {this.state.inputObject.length === 0 ?
          <FileLoader setInput={this.setInput.bind(this)} />
          :
          <PuzzleStepper
            inputObject={this.state.inputObject}
            type={this.state.type}
            params={this.state.params} />
        }
      </Container>
    )
  }
}

export default DemystifyViewer
