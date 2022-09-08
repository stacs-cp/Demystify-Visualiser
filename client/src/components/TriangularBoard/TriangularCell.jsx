import React from "react";
/**
 * Cell component, where a cell is itself a grid of possible values.
 * (1 x 1) grid if the value becomes or is known.
 */
class TriangularCell extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      highlighted: this.props.highlighted,
    };
  }

  /*
   * Uses the optionDict to convert a numeric value in the Essence Prime model to a more user friendly value to display
   */
    getMeaningfulValue(value) {
      if (!this.props.optionDict){
        return value;
      }
  
      return this.props.optionDict[value] ? this.props.optionDict[value] : value;
    }

  /*
   * Takes possible values of cell from cellRows object and turns them into 2D array with subarrays of length 5
   */
  getPossibilities2DArray(cellRows) {

    let possibilities = [];
    let possibilities2D = [];

    //Place all possibilities from the cellRows object into 'possibilities'
    cellRows.forEach((row) => {
      row.cellValues.forEach((poss) => {
        possibilities.push(poss.value);
      })
    });

    //Place all possibilities into 2D array with subarrays of length 5
    let i = 0, j = 0;
    possibilities.forEach((poss) => {
      if (j == 0) {
        possibilities2D.push([]);
      }
      possibilities2D[i].push(poss);
      j++;
      if (j == 5) {
        j = 0;
        i++;
      }
    });

    return possibilities2D;
  }

  /*
   * Return string representing coordinates of points on triangle, using its column and row to determine if its facing up or down
   */
  getPoints(column, row) {

    let {height, width} = this.props;
    let pointDown = "0,0 " + (width/2).toString() + "," + height.toString() + " " + width.toString() + ",0";
    let pointUp = "0," + height.toString() + " " + (width/2).toString() + ",0 " + width.toString() + "," + height.toString();
    return (column + row) % 2 == 0 ? pointDown : pointUp;
  }

  /*
   * Get the Y offset of a row of possibilities
   */
  getTextYOffset(i, j, textRow) {
    return ((i + j) % 2 == 0 ? (textRow - 1) + 2 : (textRow - 1) + 7).toString() + "px";
  }

  // Whether the cell grid is 1x1 i.e. the value is known.
  isSingleton() {
    const cellRows = this.props.cellContent.cellRows;

    return (
      (cellRows.length === 1 && cellRows[0].cellValues.length === 1) ||
      this.containsKnown(cellRows)
    );
  }

  // Additional check in case for some reason (e.g. with PyExplain) the grid isn't 1x1 but the value
  // is nevertheless known.
  containsKnown(cellRows) {
    return cellRows.some((row) =>
      row.cellValues.some((value) => value.markers.includes("pik"))
    );
  }

  // Get the first value of the cell grid.
  getSingletonValue() {
    const cellRows = this.props.cellContent.cellRows;
    let result;
    if (this.containsKnown(cellRows)) {
      // "pik" stands for "positive in known" - marker applied by Demystify
      result = cellRows
        .filter((row) =>
          row.cellValues.some((value) => value.markers.includes("pik"))
        )[0]
        .cellValues.filter((value) => value.markers.includes("pik"))[0].value;
    } else {
      result = cellRows[0].cellValues[0].value;
    }

    return result;
  }

  /*
   * Determines if a triangle should be highlighted
   */
  isHighlighted() {
    const { cellContent } = this.props;
    const { highlighted } = this.state;

    return (
      cellContent.cellRows.some((row) =>
        row.cellValues.some((value) =>
          value.explanations.includes(highlighted.toString())
        )
      )
    )
  }

  /* Check if a singleton value should be hidden */
  isHidden(value) {
    const { hiddenLiterals } = this.props;
    return hiddenLiterals && hiddenLiterals.includes(value);
  }

  render() {
    const {
      cellContent,
      i,
      j
    } = this.props;

    const isSingleton = this.isSingleton();
    const singletonValue = this.getSingletonValue();

    return (
      <g highlight={this.isHighlighted() ? "true" : "false"}>
        <polygon points={this.getPoints(i, j)}/>

        {isSingleton ? (
          // Display a single value if it is known and not hidden.
          !this.isHidden(singletonValue) && (
            <text x="5px" y="5px" text-anchor="middle">
              <tspan class="singleton">{this.getMeaningfulValue(singletonValue)}</tspan>
            </text>
          )
        ) : (
          // Otherwise display a grid of possibilities
          <text x="5px" y="5px" text-anchor="middle">
            <tspan class="possibilities">
              {this.getPossibilities2DArray(cellContent.cellRows).map((row, r) => {
                //Only display 3 rows due to size of triangle
                return r < 3 && (
                  <tspan y={this.getTextYOffset(i, j, r)} x="5px">
                    {row.map((literal, l) => (
                      //Display ... if there are more possibilities that cannot be shown
                      <>{this.getMeaningfulValue(literal)}, {r == 2 && l == 4 && cellContent.cellRows.length > 3 && "..."}</>
                    ))}
                  </tspan>
                )
              })}
            </tspan>
          </text>
        )}
      </g>
    );
  }
}

export default TriangularCell;
