import React from "react";
import Board from "../Board/Board";

// KillerBoard: Display the normal Sudoku grid borders, along with extra inner
// borders indicated the sum boxes, as well as corner numbers for the sum.
class KillerBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: Object.values(this.props.params.grid).map((o) => Object.values(o)),
      hints: Object.values(this.props.params.hints),
    };
  }

  getCellBorders() {
    let borders = [];

    // Normal Sudoku borders: 3x3 boxes.
    for (let i = 0; i < 9; i++) {
      borders[i] = [];
      for (let j = 0; j < 9; j++) {
        borders[i].push({
          borderTop: i % 3 === 0 ? "2px solid black" : "2px solid lightgray",
          borderBottom: i === 8 ? "2px solid black" : "2px solid lightgray",
          borderLeft: j % 3 === 0 ? "2px solid black" : "2px solid lightgray",
          borderRight: j === 8 ? "2px solid black" : "2px solid lightgray",
          marginLeft: "-2px",
          marginBottom: "-2px",
        });
      }
    }

    return borders;
  }

  getCellInnerBorders() {
    let borders = [];
    const { grid } = this.state;

    // Sum boxes: put a dashed line between any two boxes where the number in
    // the grid changes.
    for (let i = 0; i < 9; i++) {
      borders[i] = [];
      for (let j = 0; j < 9; j++) {
        borders[i].push({
          borderTop:
            i === 0 || grid[i - 1][j] !== grid[i][j]
              ? "2px dashed black"
              : "2px dashed white",
          borderBottom:
            i === 8 || grid[i + 1][j] !== grid[i][j]
              ? "2px dashed black"
              : "2px dashed white",
          borderLeft:
            j === 0 || grid[i][j - 1] !== grid[i][j]
              ? "2px dashed black"
              : "2px dashed white",
          borderRight:
            j === 8 || grid[i][j + 1] !== grid[i][j]
              ? "2px dashed black"
              : "2px dashed white",
          margin: "3px",
        });
      }
    }

    return borders;
  }

  getCornerNumbers() {
    let cornerNumbers = [];
    const { hints, grid } = this.state;
    let currentHint = 0;

    // The "hints" become small numbers to display in certain corners.
    for (let i = 0; i < 9; i++) {
      cornerNumbers[i] = [];
      for (let j = 0; j < 9; j++) {
        if (grid[i][j] === currentHint + 1) {
          cornerNumbers[i].push({
            value: hints[currentHint],
            style: { top: "0%", left: "0%" },
          });
          currentHint++;
        } else
          cornerNumbers[i].push({
            value: null,
            style: { top: "0%", left: "0%" },
          });
      }
    }
    return cornerNumbers;
  }

  render() {
    return (
      <Board
        {...this.props}
        colsums={this.state.colsums}
        rowsums={this.state.rowsums}
        cellBorders={this.getCellBorders()}
        cellInnerBorders={this.getCellInnerBorders()}
        literalSize={0.7}
        cornerNumbers={this.getCornerNumbers()}
      />
    );
  }
}

export default KillerBoard;
