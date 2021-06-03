import React from 'react';
import Board from '../Board/Board';

class SkyscrapersBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            size: this.props.params.SIZE,
            rowsums: this.props.params.CLUES[0].map(num => num === 0 ? null : num),
            colsums: this.props.params.CLUES[1].map(num => num === 0 ? null : num),
            endrowsums: this.props.params.CLUES[2].map(num => num === 0 ? null : num),
            endcolsums: this.props.params.CLUES[3].map(num => num === 0 ? null : num),
        }
    }

    render() {
        return (<Board
                highlight={this.props.highlight} 
                key={this.props.key} 
                highlighted={this.props.highlighted} 
                rows={this.props.rows}
                colsums={this.state.colsums}
                endcolsums={this.state.endcolsums}
                rowsums={this.state.rowsums}
                endrowsums={this.state.endrowsums}
                
                />)
    }
}

export default SkyscrapersBoard;