import React from 'react';
import Board from '../Board/Board';

/**
 * TODO: This still needs to be implemented on the demystify side. 
 */
class KakurasuBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            size: this.props.params.dims,
            colsums: this.props.params.col_sums,
            rowsums: this.props.params.row_sums,
        }
    }

    getBackgrounds() {
        let backgrounds = {};

        
        backgrounds["0"] = "linear-gradient(lightblue, lightblue)"
        backgrounds["1"] = "linear-gradient(lightblue, lightblue)"
        
        return backgrounds;
    }

    

    getCellBorders() {
        let borders = []

        for(let i = 0; i < this.state.size; i++) {
            borders[i] = []
            for(let j = 0; j < this.state.size; j++) {
                borders[i].push(
                    {
                        borderTop: i===0 ? "2px solid black" : "2px solid lightgray",
                        borderBottom: i===this.state.x - 1 ? "2px solid black" : "2px solid lightgray",
                        borderLeft: j===0 ? "2px solid black" : "2px solid lightgray",
                        borderRight: j===this.state.y - 1 ? "2px solid black" : "2px solid lightgray",
                        marginLeft: "-2px",
                        marginBottom: "-2px",
                    }
                )
            }
        }

        return borders;
    }
    

    render() {
        return (<Board
                highlight={this.props.highlight} 
                key={this.props.key} 
                highlighted={this.props.highlighted} 
                rows={this.props.rows}
                colsums={this.state.colsums}
                rowsums={this.state.rowsums}
                literalBackgrounds={this.getBackgrounds()}
                cellBorders={this.getCellBorders()}
                />)
    }
}

export default KakurasuBoard;