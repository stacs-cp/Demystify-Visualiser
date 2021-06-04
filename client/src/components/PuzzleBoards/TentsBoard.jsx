import React from 'react';
import Board from '../Board/Board';

class TentsBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            x: this.props.params.x,
            y: this.props.params.y,
            colsums: this.props.params.colsums,
            rowsums: this.props.params.rowsums,
            treecount: this.props.params.treecount
        }
    }

    getBackgrounds() {
        let backgrounds = {};

        for(let i = 1; i <= this.state.treecount; i++) {
            backgrounds["-" + i.toString()] = "url(images/tree.png)"
            backgrounds[i.toString()] = "url(images/tent.png)"
        }
        
        return backgrounds;
    }

    

    getCellBorders() {
        let borders = []

        for(let i = 0; i < this.state.x; i++) {
            borders[i] = []
            for(let j = 0; j < this.state.y; j++) {
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
        console.log("here")
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

export default TentsBoard;