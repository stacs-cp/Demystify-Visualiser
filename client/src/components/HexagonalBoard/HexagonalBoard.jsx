import React from "react";
import { HexGrid, Layout } from 'react-hexgrid';
import { Card, Container } from "react-bootstrap";
import './hexagons.css';
import HexagonalCell from "./HexagonalCell";

/**
 * Generic puzzle board component.
 */
class HexagonalBoard extends React.Component {

  //Functions which map 2d matrix coordinates to hexagonal cubic coordinates
  //Formulae found in https://www.redblobgames.com/grids/hexagons/
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

  /*
   * Returns a string describing the relevant portion of the svg which should be shown
   */
  getViewBox(board_type, rows) {
    let minx, miny, width, height, dim;

    if (!rows || rows.length == 0 || !rows[0] || rows[0]["cells"].length == 0){
      return "0 0 0 0";
    }


    switch(board_type){
      case "oddr":
        minx = -10;
        miny = -10;
        width = (rows.length + 0.5) * 18;
        height = (rows[0]["cells"].length - 1) * 15 + 21;
        break;
      case "evenr":
        minx = -20; 
        miny = -10;
        width = (rows.length + 0.5) * 18;
        height = (rows[0]["cells"].length - 1) * 15 + 21;
        break;
      case "oddq":
        minx = -10;
        miny = -10;
        width = (rows.length - 1) * 15 + 21;
        height = (rows[0]["cells"].length + 0.5) * 18;
        break;
      case "evenq":
        minx = -10;
        miny = -20;
        width = (rows.length - 1) * 15 + 21;
        height = (rows[0]["cells"].length + 0.5) * 18;
        break;
      default:
        throw "Unrecognised Hexagonal Board Type";
    }

    dim = width > height ? width : height;

    return minx.toString() + " " + miny.toString() + " " + dim.toString() + " " + dim.toString();
    

  }

  getBoardType(boardTypeParam){
    switch(boardTypeParam){
      case 1:
        return "oddq";
      case 2:
        return "oddr";
      case 3:
        return "evenq";
      case 4:
        return "evenr";
      default:
        throw "Unrecognised board type parameter";
    }
  }


  render() {
    const {
      // Required Props - 'present' is defined in .prime files
      highlighted,
      rows,
      present,

      //Optional Props, for custom styling (see README)
      leftLabels,
      hiddenLiterals,
      optionDict,
      matrixprops
    } = this.props;

    let boardType = this.getBoardType(this.props.boardType);
   
    return (
      <Card className="mt-3 p-5">
        <Container fluid style={{ minWidth: "400px", minHeight: "400px", padding: "0px"}}  >

          <HexGrid height="400px" width="400px" viewBox = {this.getViewBox(boardType, rows)}>
            <Layout origin={{ x: 0, y: 0 }} flat={boardType=="oddq" || boardType=="evenq"}>
              {rows.map((row, i) => 
                (row.cells.map((cell, j) => {

                  //Create object storing the properties defined in matrixprops so they may be allocated to the appropriate cells
                  let matrixpropsset = {}
                  if (matrixprops){
                    Object.keys(matrixprops).forEach((key) => matrixpropsset[key] = matrixprops[key][i][j]);
                  }
      
                  //'present' indexed from 1 as it is obtained from Demystify
                  return (present[i+1][j+1] != 0 && (

                    <HexagonalCell
                      {...matrixpropsset}
                      q={this.getQ(i,j,boardType)} 
                      r={this.getR(i,j,boardType)} 
                      s={this.getS(i,j,boardType)}
                      cellContent={cell}
                      // Whether this cell is currently highlighted
                      highlighted={highlighted}

                      hiddenLiterals={hiddenLiterals}
                      optionDict={optionDict} 
                    />
                  ))
                }))
              )}
            </Layout>
          </HexGrid>

        </Container>
      </Card>
    );
  }
}

export default HexagonalBoard;
