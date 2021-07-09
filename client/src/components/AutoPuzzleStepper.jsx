import React from 'react';
import PuzzleStepper from './PuzzleStepper';

class ManualPuzzleStepper extends React.Component {
    render() {
        return (
            <div>
                <h1>AUTO</h1>
                <PuzzleStepper {...this.props} />
            </div>)
    }
}

export default ManualPuzzleStepper;