import React from "react";
import { StyleSheet, View, Text } from "react-native";
import TriangularCell from "./TriangularCell";
import './triangles.css'
/**
 * Generic puzzle board component.
 */
class TriangularBoard extends React.Component {



  



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
      optionDict,
      matrixprops
    } = this.props;

    const styles = StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10
      },

      TriangleShapeCSS: {

        width: 0,
        height: 0,
        borderLeftWidth: 60,
        borderRightWidth: 60,
        borderBottomWidth: 120,
        borderStyle: 'solid',
        backgroundColor: 'transparent',
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: '#00BCD4'
      }
    });



    return (

      <svg class="grid" width="auto" height="auto" viewBox="-20 -20 80 80" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <g>
          <g class="hexagon-group" transform="translate(0, 0)" block="1" highlight="false" draggable="true">
            
              
              
                  {rows.map((row, i) => 
              (row.cells.map((cell, j) => {
            
    
                return (this.props.present[i+1][j+1] && (
           
                 <TriangularCell
                 leftLabels={leftLabels}
                  cellContent={cell}
                  // Whether this cell is currently highlighted
                  highlighted={highlighted}
                  /* Function to highlight explanation when this cell
                                            is moused over */
                  highlight={highlight}
                  i={i}
                  j={j}
                  />
                
              ))})))}
                  
                  </g>
        </g>


      </svg>

    );


  }
}

export default TriangularBoard;
