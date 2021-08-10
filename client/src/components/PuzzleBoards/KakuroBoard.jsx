import React from "react";
import Board from "../Board/Board";
/**
 * KakuroBoard: blank out irrelevant cells in light blue and apply the diagonal
 * horizontal and vertical sums using cornerNumbers and diagonal gradients.
 */
class KakuroBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      x: this.props.params.x_max,
      y: this.props.params.y_max,
      rowsums: Object.values(this.props.params.horzsums).map((o) =>
        Object.values(o)
      ),
      colsums: Object.values(this.props.params.vertsums).map((o) =>
        Object.values(o)
      ),
      blanks: Object.values(this.props.params.blanks).map((o) =>
        Object.values(o)
      ),
    };
  }

  // Helper function to display a cell split diagonally between to colours with
  // a gray border in between.
  getDiagonalGradient(bottomColor, topColor) {
    return `linear-gradient(to bottom left, ${bottomColor}, ${bottomColor} 49%,\
       lightgray 49%, lightgray 51%, ${topColor} 51%, ${topColor})`;
  }

  getBackgrounds() {
    const { rowsums, colsums, blanks } = this.state;
    let backgrounds = [];
    for (let i = 0; i < this.state.x; i++) {
      backgrounds[i] = [];
      for (let j = 0; j < this.state.y; j++) {
        if (rowsums[i][j] !== 0) {
          if (colsums[i][j] !== 0) {
            // If we have a horizontal and vertical sum then we have white / white
            backgrounds[i].push(this.getDiagonalGradient("white", "white"));
          } else {
            // white / lightblue
            backgrounds[i].push(this.getDiagonalGradient("white", "lightblue"));
          }
        } else {
          if (colsums[i][j] !== 0) {
            // lightblue / white
            backgrounds[i].push(this.getDiagonalGradient("lightblue", "white"));
          } else {
            if (blanks[i][j] === 0) {
              // lightblue
              backgrounds[i].push("linear-gradient(lightblue, lightblue)");
            } else {
              // nothing
              backgrounds[i].push("none");
            }
          }
        }
      }
    }
    return backgrounds;
  }

  getCornerNumbers() {
    let cornerNumbers = [];
    const { rowsums, colsums, x, y } = this.state;

    // Change the default look of the corner number to fit Kakuro
    const extraStyle = {
      fontWeight: "bolder",
      color: "gray",
      backgroundColor: "none",
      fontSize: "1.4vw",
    };

    for (let i = 0; i < x; i++) {
      cornerNumbers[i] = [];

      // Apply the corner numbers and move them to a better position within the 
      // box.
      for (let j = 0; j < y; j++) {
        if (rowsums[i][j] !== 0) {
          cornerNumbers[i].push({
            value: rowsums[i][j],
            style: { top: "20%", right: "20%", ...extraStyle },
          });
        } else if (i > 0 && colsums[i - 1][j] !== 0) {
          cornerNumbers[i].push({
            value: colsums[i - 1][j],
            style: { top: "-30%", left: "20%", ...extraStyle },
          });
        } else
          cornerNumbers[i].push({
            value: null,
            style: { top: "-30%", left: "20%", ...extraStyle },
          });
      }
    }

    return cornerNumbers;
  }
  
  render() {
    return (
      <Board
        {...this.props}
        cellBackgrounds={this.getBackgrounds()}
        cornerNumbers={this.getCornerNumbers()}
        hiddenLiterals={[0]}
      />
    );
  }
}

export default KakuroBoard;
