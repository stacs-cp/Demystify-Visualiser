import React from 'react';
import Board from '../Board/Board';

class ThermometerBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            colsums: Object.values(this.props.params.colsums),
            rowsums: Object.values(this.props.params.rowsums),
            grid: Object.values(this.props.params.therms)
                    .map(o => Object.values(o))
        }
    }

    getBackgrounds() {
        const {grid} = this.state;
        let backgrounds = []
        const xsize = this.state.grid.length;
        const ysize = this.state.grid[0].length;
        for(let i = 0; i < xsize; i++) {
            backgrounds[i] = []
            for(let j = 0; j < ysize; j++) {
                const thermNum = Math.floor(grid[i][j] / 10)
                const north = i > 0 ? Math.floor(grid[i-1][j] / 10) : null
                const south = i < xsize - 1 ? Math.floor(grid[i+1][j] / 10) : null
                const west = j > 0 ? Math.floor(grid[i][j-1] / 10) : null
                const east = j < ysize - 1 ? Math.floor(grid[i][j+1] / 10) : null

                if(grid[i][j] % 10 === 1) {
                    if(north === thermNum) {
                        backgrounds[i].push("url(images/themHeadN.png)")
                    } else if(west === thermNum) {
                        backgrounds[i].push("url(images/themHeadW.png)")
                    } else if(east === thermNum) {
                        backgrounds[i].push("url(images/themHeadE.png)")
                    } else if(south === thermNum) {
                        backgrounds[i].push("url(images/themHeadS.png)")
                    }
                } else {
                    if(north === thermNum && south !== thermNum) {
                        backgrounds[i].push("url(images/themTipS.png)")    
                    } else if(south === thermNum && north !== thermNum) {
                        backgrounds[i].push("url(images/themTipN.png)")
                    } else if(north === thermNum && south === thermNum) {
                        backgrounds[i].push("url(images/themV.png)")
                    } else if(east === thermNum && west !== thermNum) {
                        backgrounds[i].push("url(images/themTipW.png)")    
                    } else if(west === thermNum && east !== thermNum) {
                        backgrounds[i].push("url(images/themTipE.png)")
                    } else if(east === thermNum && west === thermNum) {
                        backgrounds[i].push("url(images/themH.png)")
                    }
                }
                
            }
        }

        return backgrounds;
    }

    getCellBorders() {
        let borders = []

        for(let i = 0; i < this.state.grid.length; i++) {
            borders[i] = []
            for(let j = 0; j < this.state.grid[0].length; j++) {
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
                cellBackgrounds={this.getBackgrounds()}
                highlighted={this.props.highlighted} 
                colsums={this.state.colsums}
                rowsums={this.state.rowsums}
                rows={this.props.rows}
                cellBorders={this.getCellBorders()}
                />)
    }
}

export default ThermometerBoard;