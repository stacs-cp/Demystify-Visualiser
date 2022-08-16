import React from "react";
import { Text, Hexagon } from "react-hexgrid";
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

  getPoints(column, row){
    let x1 = -20 + 5*column;
    let x2 = x1 + 5;
    let x3 = x2 + 5;

    let ybase = -20 + row * 10;

    let y1 = (column+row) % 2 == 0 ? ybase  : ybase+10;
    let y3 = y1;
    let y2 = (column+row) % 2 == 0 ? ybase  + 10: ybase;
    return x1.toString() + "," + y1.toString() + " " + x2.toString() + "," + y2.toString() + " " + x3.toString() + "," + y3.toString()  
  }

  getTextX(column, row, total, number){
    let xBase = -20 + 5*column;
    
    let xLevel = 5;

    return xBase + xLevel;
  }

  getTextY(column, row, total, number){
    let yBase = -20 + row * 10;

    let yLevel = 5


    return yBase + yLevel;
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

  // Check whether the cell should be highlighted
  componentDidUpdate(prevProps) {
    if (prevProps.highlighted !== this.props.highlighted) {
      this.setState({ highlighted: this.props.highlighted });
    }
  }

  // Call the parent highlight function
  highlight(exp) {
    this.props.highlight(exp);
  }

  /* Choose the cell background, either by reading a mapping for a singleton,
        or taking the indexed cellBackground. */
  chooseClass() {
    const { cellContent, literalBackgrounds, cellBackground } = this.props;
    const { highlighted } = this.state;
    let highlightBackground;

    if (
      cellContent.cellRows.some((row) =>
        row.cellValues.some((value) =>
          value.explanations.includes(highlighted.toString())
        )
      )
    ) {
      highlightBackground = "linear-gradient(cornsilk, cornsilk)";
    } else {
      highlightBackground = null;
    }

    const isSingleton = this.isSingleton();
    const singletonValue = this.getSingletonValue();

    if (literalBackgrounds && isSingleton) {
      return ("" 
        + (cellBackground ? cellBackground + ", " : "") 
        + (literalBackgrounds[singletonValue.toString()] ? literalBackgrounds[singletonValue.toString()] +", " : "")
        + (highlightBackground ? highlightBackground + ", " : "")
        ).slice(0, -2) // Remove trailing comma

    } else if (cellBackground) {
      return ("" 
        + cellBackground 
        + ", " 
        + (highlightBackground ? highlightBackground + ", " : "")
        ).slice(0, -2) // Remove trailing comma
    } else {
      // console.log(this.props.row + ", " + this.props.column + ":" + highlightBackground)

      return highlightBackground;
    }
  }

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

  /* Known cells should be 3 times larger. */
  getFontSize(scale) {
    const { literalSize } = this.props;
    if (literalSize) {
      return (literalSize * scale).toString() + "vw";
    } else {
      return scale.toString() + "vw";
    }
  }

  /* Check if a singleton value should be hidden */
  isHidden(value) {
    const { hiddenLiterals } = this.props;
    return hiddenLiterals && hiddenLiterals.includes(value);
  }

  //Remove safeguards and test
  getMeaningfulValue(value) {
    if (!this.props.optionDict){
      return value;
    }

    try{
      return this.props.optionDict[value] == undefined ? value : this.props.optionDict[value];
    }catch{
      console.log(value);
      return value;
    }
  }

  render() {
    const {
      cellContent,
      cellBorders,
      cellInnerBorders,
      cellMargin,
      cornerNumber,
      rightLabel,
      bottomLabel,
      literalSize,
      leftLabels,
      i,
      j,
      row,
      column,
      block
    } = this.props;

    const { highlighted } = this.state;

    const isSingleton = this.isSingleton();
    const singletonValue = this.getSingletonValue();

    return (
       <g class="hexagon" highlight={this.isHighlighted() ? "true": "false"}>
                  <polygon points={this.getPoints(i,j)} class="triangle">
                    </polygon>
                  
                    {isSingleton ? (
          // Display a single value if it is known and not hidden.
          !this.isHidden(singletonValue) && (
            <text x={this.getTextX(i,j,1,1)} y={this.getTextY(i,j,1,1)} text-anchor="middle">
            <tspan style={{ }} class="singleton">{singletonValue}</tspan>
            </text>
          )
        ) : (
          // Otherwise display a grid of possibilities
          <><text x={this.getTextX(i,j,1,1)} y={this.getTextY(i,j,1,1)} text-anchor="middle">
          <tspan class="possibilities">
            {cellContent.cellRows.map((row, r) => (
              row.cellValues.map((literal, l) => {console.log(literal); return(
                
                  <>{literal.value},</>
                  
                )})
             
                ))}
                
                </tspan>
              </text>
          </>
        )}
                    </g>
      
      
    );
  }
}

export default TriangularCell;
