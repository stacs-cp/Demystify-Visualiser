import React from "react";
import { HexGrid, Layout } from 'react-hexgrid';
import { Card, Container } from "react-bootstrap";
import './hexagons.css';
import HexagonalCell from "./HexagonalCell";

/**
 * Generic puzzle board component.
 */
class HexagonalBoard extends React.Component {

  getBoardType(type){
    switch(type){
      case 1:
        return "oddq";
      case 2:
        return "oddr";
      case 3:
        return "evenq";
      case 4:
        return "evenr";
    }
  }

  //Functions which map 2d matrix coordinates to hexagonal cubic coordinates
  getQ(i, j, layout){
    switch(layout){
      case "oddr":
        return i - (j-(j&1)) / 2;
      case "evenr":
        return i - (j+(j&1)) / 2;
      case "oddq":
        return i;
      case "evenq":
        return i;
      default:
        throw "Invalid Hexagon Layout";
    }
  }

  getR(i, j, layout){
    switch(layout){
      case "oddr":
        return j;
      case "evenr":
        return j;
      case "oddq":
        return j - (i - (i&1))/2;
      case "evenq":
        return j - (i + (i&1))/2;
      default:
        throw "Invalid Hexagon Layout";
    }
  }

  getS(i, j, layout){
    switch(layout){
      case "oddr":
        return -( i - (j-(j&1)) / 2) - j;
      case "evenr":
        return -( i - (j+(j&1)) / 2) - j;
      case "oddq":
        return -i-(j - (i - (i&1))/2);
      case "evenq":
        return -i-(j - (i + (i&1))/2);
      default:
        throw "Invalid Hexagon Layout";
    }
  }


  render() {
    const {
      // Required Props
      highlighted,
      highlight,
      rows,
      present,

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

    console.log(this.props.present);

    return (
      <Card className="mt-3 p-5">
        <Container fluid style={{ minWidth: "400px", padding: "0px"}}  >

        <HexGrid height="auto" width="auto" viewBox = "-10 -10 80 80">
          <Layout origin={{ x: 0, y: 0 }}>
          {rows.map((row, i) => (row.cells.map((cell, j) => (this.props.present[i+1][j+1] != 0 && (
           
              
              
                <>

                  <HexagonalCell
                  q={this.getQ(i,j,this.props.boardType)} 
                  r={this.getR(i,j,this.props.boardType)} 
                  s={this.getS(i,j,this.props.boardType)}
                  leftLabels={leftLabels}
                  cellContent={cell}
                  block={this.props.params.blocks[i+1][j+1]}
                  // Whether this cell is currently highlighted
                  highlighted={highlighted}
                  /* Function to highlight explanation when this cell
                                            is moused over */
                  highlight={highlight}
                  // Styling
                  //cellBorders={this.getIndex(cellBorders, i, j)}
                  //cellInnerBorders={this.getIndex(cellInnerBorders, i, j)}
                  //cellBackground={this.getIndex(cellBackgrounds, i, j)}
                  //cornerNumber={this.getIndex(cornerNumbers, i, j)}
                  //rightLabel={this.getIndex(rightLabels, i, j)}
                  //bottomLabel={this.getIndex(bottomLabels, i, j)}
                  //cellMargin={cellMargin}
                  //literalBackgrounds={literalBackgrounds}
                  //literalSize={literalSize}
                  //hiddenLiterals={hiddenLiterals}
                  //setSelectedLiteral={this.props.setSelectedLiteral}
                  //optionDict={this.props.optionDict} 
                  />
                </>  
              
           
          )))))}
          </Layout>
        </HexGrid>

      </Container>
      </Card>
    );
  }
}

export default HexagonalBoard;
