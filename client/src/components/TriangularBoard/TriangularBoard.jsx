import React from "react";
import TriangularCell from "./TriangularCell";
import './triangles.css'
import { Card, Container } from "react-bootstrap";


/**
 * Generic triangular puzzle board component.
 */
class TriangularBoard extends React.Component {

  //Dimensions of a single triangle
  triangle_height = 10;
  triangle_width = 10;

  /*
   * Returns a string defining where the triangle should be moved based off its row and column
   */
  getTransformation(i, j) {
    let x = this.triangle_width * i / 2;
    let y = this.triangle_height * j;
    return "translate(" + x.toString() + ", " + y.toString() + ")";
  }

  /*
   * Returns a string describing the relevant portion of the svg which should be shown
   */
  getViewBox(rows) {

    if (!rows || rows.length == 0 || !rows[0] || rows[0]["cells"].length == 0) {
      return "0 0 0 0";
    }

    let minx = 0;
    let miny = 0;
    let width = (rows.length - 1) * (this.triangle_width / 2) + this.triangle_width;
    let height = rows[0]["cells"].length * this.triangle_height;

    let dim = width > height ? width : height;

    return minx.toString() + " " + miny.toString() + " " + dim.toString() + " " + dim.toString();

  }

  render() {
    const {
      // Required Props
      highlighted,
      rows,
      present,

      //Optional Props, for custom styling (see README)
      hiddenLiterals,
      optionDict,
      matrixprops
    } = this.props;

    return (

      <Card className="mt-3 p-5">
        <Container fluid style={{ minWidth: "400px", minHeight: "400px", padding: "0px"}}  >
          <svg viewBox={this.getViewBox(rows)}>
            <g>

              {rows.map((row, i) =>
                (row.cells.map((cell, j) => {

                  //Create object storing the properties defined in matrixprops so they may be allocated to the appropriate cells
                  let matrixpropsset = {}
                  if (matrixprops){
                    Object.keys(matrixprops).forEach((key) => matrixpropsset[key] = matrixprops[key][i][j]);
                  }

                  //'present' indexed from 1 as it is obtained from Demystify
                  return (present[i + 1][j + 1] && (

                    <g transform={this.getTransformation(i, j)}>
                      
                      <TriangularCell
                        {...matrixpropsset}
                        cellContent={cell}

                        // Whether this cell is currently highlighted
                        highlighted={highlighted}
                        
                        hiddenLiterals={hiddenLiterals}
                        height={this.triangle_height}
                        width={this.triangle_width}
                        i={i}
                        j={j}
                        optionDict={optionDict}
                      />

                    </g>
                    
                  ))
                }))
              )}

            </g>
          </svg>
        </Container>
      </Card>            
    );
  }
}

export default TriangularBoard;
