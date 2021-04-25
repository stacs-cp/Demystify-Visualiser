import React from 'react';

import FileLoader from './FileLoader';

import { Container, Alert } from 'react-bootstrap';
import PuzzleStepper from './PuzzleStepper';

class DemystifyViewer extends React.Component {
  state = {
    inputObject: [],
    type: "",
    params: {},
    error: false,
  }
  
  setInput(obj) {
    this.setState({ inputObject: obj.steps, type: obj.name, params: obj.params },
      () => !(this.state.inputObject && this.state.type && this.state.params)  
      && this.setError())

    
  }

  setError() {
    this.setState({error: true});
  }

  conponentDidUpdate(prevProps, prevState) {
    if(prevState.error) this.setState({error: false});
  }

  render = () => {
    console.log(this.state)
    return (
      <Container fluid style={{textAlign: "center"}}>
        {(this.state.inputObject.length === 0 || this.state.error) ?
          <React.Fragment>
            <h1 className="mt-3">Demystify Visualiser</h1>
            <FileLoader setInput={this.setInput.bind(this)} setError={this.setError.bind(this)} />
            {this.state.error && 
              <Alert variant="warning" className="mt-3 p-4 text-center">
                Could not read the input file (ensure it is a JSON file produced by Demystify).
              </Alert> }
          </React.Fragment>
          
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
