import React from 'react';

import { Container} from 'react-bootstrap';
import PuzzleStepper from './PuzzleStepper';

import MainMenu from './MainMenu';
import SudokuBuilder from './SudokuBuilder';

/**
 * Currently the main content component for this application.
 */
class DemystifyVisualiser extends React.Component {
  state = {
    inputObject: [],
    type: "",
    params: {},
    error: false,
    mode: "default",
    continueData: null,
    buildSudoku: false
  }
  
  // Load the steps, the type of puzzle, and the params (configuration) of the puzzle
  setJSONInput(obj, mode) {
    const result = obj.result;

    this.setState({ continueData: obj, inputObject: result.steps, type: result.name, params: result.params, mode: mode},
      () => !(this.state.inputObject && this.state.type && this.state.params)  
      && this.setError()) 
    
    // If we already finished the puzzle, switch to non-interactive
    obj.finished && this.setState({mode: "default"})
  }


  // Avoid invalid JSON
  setError() {
    this.setState({error: true});
  }

  conponentDidUpdate(prevProps, prevState) {
    if(prevState.error) this.setState({error: false});
  }

  handleBuildSudoku() {
    this.setState({buildSudoku: true})
  }
  render = () => {
    return (
      <Container fluid style={{textAlign: "center"}}>
        
        {/*If the puzzle has not been correctly loaded, display the main menu*/
          (this.state.inputObject.length === 0 || this.state.error) ?
            this.state.buildSudoku ? 
              <SudokuBuilder />
              :
              <MainMenu 
                setInput={this.setJSONInput.bind(this)} 
                handleBuildSudoku={this.handleBuildSudoku.bind(this)}/>
          :
          /*Otherwise display the main puzzle visualiser*/
            <PuzzleStepper
              inputObject={this.state.inputObject}
              continueData={this.state.continueData}
              type={this.state.type}
              params={this.state.params} 
              mode={this.state.mode} />
        }
      </Container>
    )
  }
}

export default DemystifyVisualiser
