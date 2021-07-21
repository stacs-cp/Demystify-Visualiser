import React from 'react';
import Board from '../Board/Board';

class NonogramBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rowcounts: Object.values(this.props.params.rowcounts)
                    .map(o => Object.values(o)),
            colcounts: Object.values(this.props.params.colcounts)
                .map(o => Object.values(o)),
        }
    }

    getBackgrounds() {
        let backgrounds = {};

        
        backgrounds["0"] = "linear-gradient(white, white)"
        backgrounds["1"] = "linear-gradient(black, black)"
        
        
        return backgrounds;
    }

    transpose(array) {
        return array[0].map((_, colIndex) => array.map(row => row[colIndex]));
    }

    render() {
        return (<Board
                {...this.props}
                literalBackgrounds={this.getBackgrounds()}
                hiddenLiterals={[0, 1]}
                startrows={this.transpose(this.state.colcounts)}
                startcols={this.transpose(this.state.rowcounts)}
                />)
    }
}

export default NonogramBoard;