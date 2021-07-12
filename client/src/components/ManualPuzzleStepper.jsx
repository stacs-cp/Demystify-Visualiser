import React from 'react';
import PuzzleStepper from './PuzzleStepper';

class ManualPuzzleStepper extends React.Component {
    render() {
        return (
            <div>
                <PuzzleStepper mode="manual" {...this.props} />
            </div>)
    }
}

export default ManualPuzzleStepper;