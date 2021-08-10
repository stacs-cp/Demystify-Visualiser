import React from "react";
import Board from "../Board/Board";

/**
 * FutoshikiBoard: Space out the cells and add inequalities between cells.
 */
class FutoshikiBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lessThans: Object.values(this.props.params.lt).map((o) =>
        Object.values(o)
      ),
      size: this.props.params.SIZE,
    };
  }

  // Inequalities to the right of cells.
  getRightLabels() {
    let rightLabels = [];
    const { size, lessThans } = this.state;

    // Start with an empty array.
    for (let i = 0; i < size; i++) {
      rightLabels[i] = [];
      for (let j = 0; j < size; j++) {
        rightLabels[i].push(null);
      }
    }

    for (let lessThan of lessThans) {
      // The lessThan array represents the inequality like this:
      // cell (i1, i2) is less than cell (j1, j2).
      const i1 = lessThan[0];
      const i2 = lessThan[1];
      const j1 = lessThan[2];
      const j2 = lessThan[3];

      // If they are in the same row, use a right label.
      if (i1 === j1) {
        if (i2 < j2) {
          rightLabels[i1 - 1][i2 - 1] = "<";
        } else {
          rightLabels[j1 - 1][j2 - 1] = ">";
        }
      }
    }
    return rightLabels;
  }

  // Inequalities beneath cells. 
  getBottomLabels() {
    let bottomLabels = [];
    const { size, lessThans } = this.state;

    // Start with an empty array.
    for (let i = 0; i < size; i++) {
      bottomLabels[i] = [];
      for (let j = 0; j < size; j++) {
        bottomLabels[i].push(null);
      }
    }

    for (let lessThan of lessThans) {
      const i1 = lessThan[0];
      const i2 = lessThan[1];
      const j1 = lessThan[2];
      const j2 = lessThan[3];

      // If they are in the same column, use a bottom label.
      if (i2 === j2) {
        if (i1 < j1) {
          // \u2227 is a vertical < sign
          bottomLabels[i1 - 1][i2 - 1] = "\u2227";
        } else {
           // \u2227 is a vertical > sign
          bottomLabels[j1 - 1][j2 - 1] = "\u2228";
        }
      }
    }

    return bottomLabels;
  }

  render() {
    return (
      <Board
        {...this.props}
        cellMargin={{ margin: "20px" }}
        rightLabels={this.getRightLabels()}
        bottomLabels={this.getBottomLabels()}
      />
    );
  }
}

export default FutoshikiBoard;
