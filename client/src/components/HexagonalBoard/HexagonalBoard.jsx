import React from "react";
import { HexGrid, Layout, Hexagon, Text, Pattern, Path, Hex } from 'react-hexgrid';
import { Card, Container, Col } from "react-bootstrap";
import './hexagons.css';
import HexagonalCell from "./HexagonalCell";

/**
 * Generic puzzle board component.
 */
class HexagonalBoard extends React.Component {
  // Return item at index, if the array prop is defined.
  getIndex(arr, row, column) {
    return arr ? arr[row][column] : null;
  }

  render() {
    const {
      // Required Props
      highlighted,
      highlight,
      rows,

      //Optional Props, for custom styling (see README)
      literalBackgrounds,
      cellBorders,
      cellInnerBorders,
      cellBackgrounds,
      cellMargin,
      literalSize,
      cornerNumbers,
      rightLabels,
      leftLabels,
      bottomLabels,
      hiddenLiterals,
      rowsums,
      endrowsums,
      colsums,
      endcolsums,
      startrows,
      startcols,
      optionDict
    } = this.props;


    
    return (
      <Card className="mt-3 p-5">
        <Container fluid style={{ minWidth: "400px", padding: "0px"}}  >

        <HexGrid height="auto" width="auto" viewBox = "-10 -10 80 80">
          <Layout origin={{ x: 0, y: 0 }}>
          {rows.map((row, i) => (row.cells.map((cell, j) => (this.props.params.blocks[i+1][j+1] != 0 && (
           
              
              <Hexagon q={i} r={j - (i - (i&1))/2} s={-i-(j - (i - (i&1))/2)} style={{fill: "#aaaaaa"}}>
                {leftLabels && Object.keys(leftLabels).length >= 0 && Object.keys(leftLabels[1]).length >= j && leftLabels[i+1][j+1] && <Text x="-0.2cm" y="0cm" class="leftLabel">{leftLabels[i+1][j+1]}</Text>}
                <>

                  <HexagonalCell
                  cellContent={cell}
                  row={i}
                  column={j}
                  // Whether this cell is currently highlighted
                  highlighted={highlighted}
                  /* Function to highlight explanation when this cell
                                            is moused over */
                  highlight={highlight}
                  // Styling
                  cellBorders={this.getIndex(cellBorders, i, j)}
                  cellInnerBorders={this.getIndex(cellInnerBorders, i, j)}
                  cellBackground={this.getIndex(cellBackgrounds, i, j)}
                  cornerNumber={this.getIndex(cornerNumbers, i, j)}
                  rightLabel={this.getIndex(rightLabels, i, j)}
                  bottomLabel={this.getIndex(bottomLabels, i, j)}
                  cellMargin={cellMargin}
                  literalBackgrounds={literalBackgrounds}
                  literalSize={literalSize}
                  hiddenLiterals={hiddenLiterals}
                  setSelectedLiteral={this.props.setSelectedLiteral}
                  optionDict={this.props.optionDict} />
                </>  
              </Hexagon>
           
          )))))}
          </Layout>
        </HexGrid>

      </Container>
      </Card>
    );
  }
}

export default HexagonalBoard;
