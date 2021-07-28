import React from "react";
import Board from "../Board/Board";

class StarBattleBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: Object.values(this.props.params.blocks).map((o) =>
        Object.values(o)
      ),
      gridSize: this.props.params.grid,
    };
  }

  getCellBorders() {
    let borders = [];
    const { grid, gridSize } = this.state;
    for (let i = 0; i < gridSize; i++) {
      borders[i] = [];
      for (let j = 0; j < gridSize; j++) {
        borders[i].push({
          borderTop:
            i === 0 || grid[i - 1][j] !== grid[i][j]
              ? "2px solid black"
              : "2px solid lightgray",
          borderBottom:
            i === gridSize - 1 || grid[i + 1][j] !== grid[i][j]
              ? "2px solid black"
              : "2px solid lightgray",
          borderLeft:
            j === 0 || grid[i][j - 1] !== grid[i][j]
              ? "2px solid black"
              : "2px solid lightgray",
          borderRight:
            j === gridSize - 1 || grid[i][j + 1] !== grid[i][j]
              ? "2px solid black"
              : "2px solid lightgray",
          marginLeft: "-2px",
          marginBottom: "-2px",
        });
      }
    }

    return borders;
  }

  getBackgrounds() {
    let backgrounds = { 1: "url(images/star.png)" };

    return backgrounds;
  }

  render() {
    return (
      <Board
        {...this.props}
        colsums={this.state.colsums}
        rowsums={this.state.rowsums}
        cellBorders={this.getCellBorders()}
        literalBackgrounds={this.getBackgrounds()}
      />
    );
  }
}

export default StarBattleBoard;
