import React from 'react';
import Board from '../Board/Board';

class BinairoBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    render() {
        return (<Board
                {...this.props}
                />)
    }
}

export default BinairoBoard;