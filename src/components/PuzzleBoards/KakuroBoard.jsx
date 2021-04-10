import React from 'react';
import Board from '../Board';

class StarBattleBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            x: this.props.params.x_max,
            y: this.props.params.y_max,
            rowsums: this.props.params.horzsums,
            colsums: this.props.params.vertsums
        }
    }

    getBackgrounds() {
        let backgrounds = {"0": "linear-gradient(to bottom left, white, white 49%, lightgray 49%, lightgray 51%, lightblue 51%, lightblue)"}
        

        return backgrounds;
    }

    getCornerNumbers() {
        let cornerNumbers = []
        const {rowsums, colsums, x, y} = this.state;
        let currentHint = 0;

        for(let i = 0; i < x; i++) {
            cornerNumbers[i] = []
            for(let j = 0; j < y; j++) {
                if(rowsums[i][j] !== 0) {
                    cornerNumbers[i].push({value: rowsums[i][j], pos: {top: "20%", right: "20%"}})
                    currentHint++
                } else if(i > 0 && colsums[i-1][j] !== 0) {
                    cornerNumbers[i].push({value: colsums[i-1][j], pos: {top: "-30%", left: "20%"}})
                    currentHint++
                } else 
                    cornerNumbers[i].push({value: null, pos: {top: "0%", left: "0%"}})

            
            }
        }

        console.log(cornerNumbers)
        return cornerNumbers
    }

    render() {
        return (<Board
                highlight={this.props.highlight} 
                key={this.props.key} 
                highlighted={this.props.highlighted} 
                rows={this.props.rows}
                literalBackgrounds={this.getBackgrounds()}
                cornerNumbers={this.getCornerNumbers()}
                />)
    }
}

export default StarBattleBoard;