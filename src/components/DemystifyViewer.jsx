import React from 'react';

import FileLoader from './FileLoader';

import { Container, Alert } from 'react-bootstrap';
import PuzzleStepper from './PuzzleStepper';

/**
 * Currently the main content component for this application.
 */
class DemystifyViewer extends React.Component {
  state = {
    inputObject: [],
    type: "",
    params: {},
    error: false,
  }
  
  // Load the steps, the type of puzzle, and the params (configuration) of the puzzle
  setInput(obj) {
    this.setState({ inputObject: obj.steps, type: obj.name, params: obj.params },
      () => !(this.state.inputObject && this.state.type && this.state.params)  
      && this.setError()) 
  }

  // Avoid invalid JSON
  setError() {
    this.setState({error: true});
  }

  conponentDidUpdate(prevProps, prevState) {
    if(prevState.error) this.setState({error: false});
  }

  render = () => {
    return (
      <Container fluid style={{textAlign: "center"}}>
        
        {/*If the puzzle has not been correctly loaded, display the initial screen*/
          (this.state.inputObject.length === 0 || this.state.error) ?
          <React.Fragment>
            <h1 className="mt-3">Demystify Visualiser</h1>
            
            <FileLoader setInput={this.setInput.bind(this)} setError={this.setError.bind(this)} />
            
            {this.state.error && 
              <Alert variant="warning" className="mt-3 p-4 text-center">
                Could not read the input file (ensure it is a JSON file produced by Demystify).
              </Alert> }
          </React.Fragment>
          
          :
          /*Otherwise display the main puzzle visualiser*/
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
