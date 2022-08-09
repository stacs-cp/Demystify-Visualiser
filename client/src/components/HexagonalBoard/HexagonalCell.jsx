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
      q,
      r,
      s,
      row,
      column,
      block
    } = this.props;

    const { highlighted } = this.state;

    const isSingleton = this.isSingleton();
    const singletonValue = this.getSingletonValue();

    return (
      <Hexagon q={q} r={r} s={s} class={this.chooseClass()} block={block} highlight={this.isHighlighted() ? "true" : "false"}>
      {leftLabels && Object.keys(leftLabels).length >= 0 && Object.keys(leftLabels[1]).length >= column && leftLabels[row+1][column+1] && <Text x="-0.2cm" y="0cm" class="leftLabel">{leftLabels[row+1][column+1]}</Text>}
      <Text

        borders={cellBorders}
        
        margin={cellMargin}
        size={"0.7em"}
      
       
      >
        {isSingleton ? (
          // Display a single value if it is known and not hidden.
          !this.isHidden(singletonValue) && (
            <tspan style={{ }} class="singleton">{singletonValue}</tspan>
          )
        ) : (
          // Otherwise display a grid of possibilities
          <>
            {cellContent.cellRows.map((row, i) => {return(
                <tspan y={(i-1)*0.05 + "cm"} x="0cm">
                {row.cellValues.map((literal, j) => (
                  <>{literal.value}, </>
                ))}<br></br>
                </tspan>
             
                )})}
          </>
        )}
      </Text>
      </Hexagon>
    );
  }
}

export default HexagonalCell;
