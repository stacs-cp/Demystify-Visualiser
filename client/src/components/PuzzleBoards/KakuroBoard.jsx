import React from 'react';
import Board from '../Board/Board';

class KakuroBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            x: this.props.params.x_max,
            y: this.props.params.y_max,
            rowsums: this.props.params.horzsums,
            colsums: this.props.params.vertsums,
            blanks: this.props.params.blanks
        }
    }

    getDiagonalGradient(bottomColor, topColor) {
        return `linear-gradient(to bottom left, ${bottomColor}, ${bottomColor} 49%, lightgray 49%, lightgray 51%, ${topColor} 51%, ${topColor})`
    }
   
    getBackgrounds() {
        const {rowsums, colsums, blanks} = this.state;
        let backgrounds = []
        for(let i = 0; i < this.state.x; i++) {
            backgrounds[i] = []
            for(let j = 0; j < this.state.y; j++) {
                if(rowsums[i][j]!==0) {
                    if(colsums[i][j]!==0) {
                        backgrounds[i].push(this.getDiagonalGradient("white", "white"))
                    } else {
                        backgrounds[i].push(this.getDiagonalGradient("white", "lightblue"))
                    }
                } else {
                    if(colsums[i][j]!==0) {
                        backgrounds[i].push(this.getDiagonalGradient("lightblue", "white"))
                    } else {
                        if(blanks[i][j]===0) {
                            backgrounds[i].push("linear-gradient(lightblue, lightblue)")
                        } else {
                            backgrounds[i].push("none")
                        }
                    }

                }
                
            }
        }
        /*return borders;
            {"0": "linear-gradient(to bottom left, white, white 49%, lightgray 49%, lightgray 51%, lightblue 51%, lightblue)"}*/
        

        return backgrounds;
    }

    getCornerNumbers() {
        let cornerNumbers = []
        const {rowsums, colsums, x, y} = this.state;
        const extraStyle = {
            fontWeight: "bolder",
            color: "gray",
            backgroundColor: "none",
            fontSize: "1.4vw"}

        for(let i = 0; i < x; i++) {
            cornerNumbers[i] = []
            for(let j = 0; j < y; j++) {
                if(rowsums[i][j] !== 0) {
                    cornerNumbers[i].push({value: rowsums[i][j], style: {top: "20%", right: "20%", ...extraStyle}})
                } else if(i > 0 && colsums[i-1][j] !== 0) {
                    cornerNumbers[i].push({value: colsums[i-1][j], style: {top: "-30%", left: "20%", ...extraStyle}})
                } else 
                    cornerNumbers[i].push({value: null,  style: {top: "-30%", left: "20%", ...extraStyle}})

            
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
                cellBackgrounds={this.getBackgrounds()}
                cornerNumbers={this.getCornerNumbers()}
                hiddenLiterals={[0]}
                />)
    }
}

export default KakuroBoard;