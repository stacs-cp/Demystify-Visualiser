import React from 'react';
import Board from '../Board/Board';

class SudokuBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            grid: this.props.params.grid,
            hints: this.props.params.hints
        }
    }

    getCellBorders() {
        let borders = []

        for(let i = 0; i < 9; i++) {
            borders[i] = []
            for(let j = 0; j < 9; j++) {
                borders[i].push(
                    {
                        borderTop: i%3===0 ? "2px solid black" : "2px solid lightgray",
                        borderBottom: i===8 ? "2px solid black" : "2px solid lightgray",
                        borderLeft: j%3===0 ? "2px solid black" : "2px solid lightgray",
                        borderRight: j===8 ? "2px solid black" : "2px solid lightgray",
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
                cellBorders={this.getCellBorders()}
                literalSize={0.7}
                />)
    }
}

export default SudokuBoard;