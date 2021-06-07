import React from 'react';
import Board from '../Board/Board';

class KillerBoard extends React.Component {
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

    getCellInnerBorders() {
        let borders = []
        const {grid} = this.state;
        for(let i = 0; i < 9; i++) {
            borders[i] = []
            for(let j = 0; j < 9; j++) {
                borders[i].push(
                    {
                        borderTop: 
                            i===0 || grid[i-1][j] !== grid[i][j] ? "2px dashed black" : "2px dashed white",
                        borderBottom: i===8 || grid[i+1][j] !== grid[i][j] ? "2px dashed black" : "2px dashed white",
                        borderLeft: j===0 || grid[i][j-1] !== grid[i][j] ? "2px dashed black" : "2px dashed white",
                        borderRight: j===8 || grid[i][j+1] !== grid[i][j] ? "2px dashed black" : "2px dashed white",
                        margin: "3px",
                    }
                )
            }
        }

        return borders;
    }

    getCornerNumbers() {
        let cornerNumbers = []
        const {hints, grid} = this.state;
        let currentHint = 0;

        for(let i = 0; i < 9; i++) {
            cornerNumbers[i] = []
            for(let j = 0; j < 9; j++) {
                if(grid[i][j] === currentHint + 1) {
                    cornerNumbers[i].push({value: hints[currentHint], style: {top: "0%", left: "0%"}})
                    currentHint++
                } else 
                    cornerNumbers[i].push({value: null, style: {top: "0%", left: "0%"}})
            }
        }
        return cornerNumbers
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
                cellInnerBorders={this.getCellInnerBorders()}
                literalSize={0.7}
                cornerNumbers={this.getCornerNumbers()}
                />)
    }
}

export default KillerBoard;