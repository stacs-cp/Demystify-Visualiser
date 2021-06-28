import React from 'react'
import Board from '../Board/Board'
class GaramBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            grid: Object.values(this.props.params.presetvals)
                .map(o => Object.values(o)),
            operations: Object.values(this.props.params.op),
            opMap: {1: "+", 2: "-", 3: "\u00D7"}
        }
    }

    getCellBorders() {
        let borders = []
        const {grid} = this.state;

        for(let i = 0; i < grid.length; i++) {
            borders[i] = []
            for(let j = 0; j < grid[0].length; j++) {
                borders[i].push(
                    {
                        borderTop: grid[i][j] == -2 ? "2px solid transparent" : "2px solid lightgray",
                        borderBottom: grid[i][j] == -2 ? "2px solid transparent" : "2px solid lightgray",
                        borderLeft: grid[i][j] == -2 ? "2px solid transparent" : "2px solid lightgray",
                        borderRight: grid[i][j] == -2 ? "2px solid transparent" : "2px solid lightgray",
                        marginLeft: "-2px",
                        marginBottom: "-2px",
                    }
                )
            }
        }

        return borders;
    }

    // The positions of the operations is the same every time in garam, so we can hardcode.
    getRightLabels() {
        let rightLabels = []
        const {grid, opMap, operations} = this.state
        for(let i = 0; i < grid.length; i++) {
            rightLabels[i] = []
            for(let j = 0; j < grid[0].length; j++) {
                rightLabels[i].push(
                   null
                )
            }
        }

        rightLabels[0][1] = '='
        rightLabels[0][5] = '='
        rightLabels[1][3] = '='
        rightLabels[3][1] = '='
        rightLabels[3][5] = '='
        rightLabels[5][1] = '='
        rightLabels[5][5] = '='
        rightLabels[8][1] = '='
        rightLabels[8][5] = '='
        
        rightLabels[0][0] = opMap[operations[0]]
        rightLabels[0][4] = opMap[operations[1]]
        rightLabels[1][2] = opMap[operations[6]]
        rightLabels[3][0] = opMap[operations[7]]
        rightLabels[3][4] = opMap[operations[8]]
        rightLabels[5][0] = opMap[operations[11]]
        rightLabels[5][4] = opMap[operations[12]]
        rightLabels[6][2] = opMap[operations[17]]
        rightLabels[8][0] = opMap[operations[18]]
        rightLabels[8][4] = opMap[operations[19]]
        return rightLabels;
    }

    getBottomLabels() {
        let bottomLabels = []
        const {grid, opMap, operations} = this.state;

        for(let i = 0; i < grid.length; i++) {
            bottomLabels[i] = []
            for(let j = 0; j < grid[0].length; j++) {
                bottomLabels[i].push(
                   null
                )
            }
        }

        bottomLabels[1][0] = "="
        bottomLabels[1][2] = "="
        bottomLabels[1][4] = "="
        bottomLabels[1][6] = "="
        bottomLabels[4][1] = "="
        bottomLabels[4][5] = "="
        bottomLabels[6][0] = "="
        bottomLabels[6][2] = "="
        bottomLabels[6][4] = "="
        bottomLabels[6][6] = "="
        
        bottomLabels[0][0] = opMap[operations[2]]
        bottomLabels[0][2] = opMap[operations[3]]
        bottomLabels[0][4] = opMap[operations[4]]
        bottomLabels[0][6] = opMap[operations[5]]
        bottomLabels[3][1] = opMap[operations[9]]
        bottomLabels[3][5] = opMap[operations[10]]
        bottomLabels[5][0] = opMap[operations[13]]
        bottomLabels[5][2] = opMap[operations[14]]
        bottomLabels[5][4] = opMap[operations[15]]
        bottomLabels[5][6] = opMap[operations[16]]

        return bottomLabels;
    }

    render() {
        return (<Board
                highlight={this.props.highlight} 
                key={this.props.key} 
                highlighted={this.props.highlighted} 
                rows={this.props.rows}
                hiddenLiterals={[-2]}
                cellBorders={this.getCellBorders()}
                rightLabels={this.getRightLabels()}
                bottomLabels={this.getBottomLabels()}
                />)
    }
}

export default GaramBoard;