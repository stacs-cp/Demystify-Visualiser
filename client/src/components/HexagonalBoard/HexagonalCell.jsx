import React from "react";
import { Text, Hexagon } from "react-hexgrid";
import "./hexagons.css"
/**
 * Cell component, where a cell is itself a grid of possible values.
 * (1 x 1) grid if the value becomes or is known.
 */
class HexagonalCell extends React.Component {
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
   * Determines if the cell should be highlighted
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

   /*
   * Takes possible values of cell from cellRows object and turns them into 2D array with subarrays of length 5
   */
  getPossibilities2DArray(cellRows){
    let possibilities = [];
    let possibilities2D = [];
    
    //Place all possibilities from the cellRows object into 'possibilities'
    cellRows.forEach((row) => {
      row.cellValues.forEach((poss) => {
        possibilities.push(poss.value);
      })
    })

    //Place all possibilities into 2D array with subarrays of length 5
    let i = 0, j = 0;
    possibilities.forEach((poss) => {
      if (j == 0) {
        possibilities2D.push([]);
      }
      possibilities2D[i].push(poss);
      j++;
      if (j == 5){
        j = 0;
        i ++;
      }

    })

    return possibilities2D;
  }

  render() {
    const {
      cellContent,
      q,
      r,
      s,
      block
    } = this.props;

    const isSingleton = this.isSingleton();
    const singletonValue = this.getSingletonValue();
    
    return (
      <Hexagon 
        q={q} 
        r={r} 
        s={s} 
        block={block} 
        highlight={this.isHighlighted() ? "true" : "false"}>
      
        <Text size={"0.7em"}>
          {isSingleton ? (
            // Display a single value if it is known and not hidden.
            !this.isHidden(singletonValue) && (
              <tspan class="singleton">{this.getMeaningfulValue(singletonValue)}</tspan>
            )
          ) : (
            // Otherwise display a grid of possibilities
            <>
            {this.getPossibilities2DArray(cellContent.cellRows).map((row, i) => 
              {//Only display 5 rows of possibilities
                return i < 5 && (
                <tspan y={(i-1)*0.06-0.03 + "cm"} x="0cm">
                  {row.map((literal, j) => (
                    <>
                      {this.getMeaningfulValue(literal)}, 
                      {//If there are more than 5 rows of possibilities add '...' to indicate they could not fit
                      i == 4 && j == 4 && cellContent.cellRows.length > 5 && "..."}
                    </>
                  ))}
                </tspan>
              )}
            )}
            </>
          )}
        </Text>
      </Hexagon>
    );
  }
}

export default HexagonalCell;
