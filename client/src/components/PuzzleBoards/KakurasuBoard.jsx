import React from "react";
import Board from "../Board/Board";

/**
 * KakurasuBoard: fill 0 values in with white and 1 values in with gray, add
 * row and column sums, and darken the border around the edge.
 */
class KakurasuBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      size: this.props.params.dims,
      colsums: Object.values(this.props.params.col_sums),
      rowsums: Object.values(this.props.params.row_sums),
    };
  }

  getBackgrounds() {
    let backgrounds = {};

    backgrounds["0"] = "linear-gradient(white, white)";
    backgrounds["1"] = "linear-gradient(gray, gray)";

    return backgrounds;
  }

  getCellBorders() {
    let borders = [];

    // If at the top, bottom, left or right, make the border darker.
    for (let i = 0; i < this.state.size; i++) {
      borders[i] = [];
      for (let j = 0; j < this.state.size; j++) {
        borders[i].push({
          borderTop: i === 0 ? "2px solid black" : "2px solid lightgray",
          borderBottom:
            i === this.state.x - 1 ? "2px solid black" : "2px solid lightgray",
          borderLeft: j === 0 ? "2px solid black" : "2px solid lightgray",
          borderRight:
            j === this.state.y - 1 ? "2px solid black" : "2px solid lightgray",
          marginLeft: "-2px",
          marginBottom: "-2px",
        });
      }
    }

    return borders;
  }

  render() {
    return (
      <Board
        {...this.props}
        colsums={this.state.colsums}
        rowsums={this.state.rowsums}
        literalBackgrounds={this.getBackgrounds()}
        cellBorders={this.getCellBorders()}
      />
    );
  }
}

export default KakurasuBoard;
