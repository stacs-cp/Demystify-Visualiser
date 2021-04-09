import React from 'react';
import Board from '../Board';

class TentsBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            x: this.props.params.x,
            y: this.props.params.y,
            colsums: this.props.params.colsums,
            rowsums: this.props.params.rowsums
        }
    }

    

    render() {
        return (<Board
                highlight={this.props.highlight} 
                key={this.props.key} 
                highlighted={this.props.highlighted} 
                rows={this.props.rows}
                colsums={this.state.colsums}
                rowsums={this.state.rowsums}
                />)
    }
}

export default TentsBoard;