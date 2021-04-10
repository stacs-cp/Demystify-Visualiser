import React from 'react';
import Board from '../Board';

class BinairoBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    render() {
        return (<Board
                highlight={this.props.highlight} 
                key={this.props.key} 
                highlighted={this.props.highlighted} 
                rows={this.props.rows}
                />)
    }
}

export default BinairoBoard;