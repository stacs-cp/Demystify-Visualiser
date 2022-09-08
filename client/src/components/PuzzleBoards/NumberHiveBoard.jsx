import React from "react";
import HexagonalBoard from "../HexagonalBoard/HexagonalBoard";
import './NumberHive.css'

/**
 * NumberHive: fill grid so numbers 1-{size of the block} occur 
 * in each block just once, and no neighbours contain the same number
 */
class NumberHiveBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  //Convert 2d matrices from essence which are 1 indexed to 0 indexed objects
  essenceToZeroIndex(obj) {
    let zeroIndex = {};
  
    for(let i = 1; i <= Object.keys(obj).length; ++i){
      for(let j = 1; j <= Object.keys(obj[i]).length; ++j){
        if (j == 1){
          zeroIndex[i-1] = {};
        }
        zeroIndex[i-1][j-1]=obj[i][j];
      }
    }
  
    return zeroIndex;
  }
  
  render() {
    return <HexagonalBoard {...this.props} boardType={this.props.params.board_type} present={this.props.present} matrixprops={{"block":this.essenceToZeroIndex(this.props.params.blocks)}}/>;
  }
}

export default NumberHiveBoard;
