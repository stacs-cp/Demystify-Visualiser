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

  getBoardType(boardTypeParam){
    switch(boardTypeParam){
      case 1:
        return "oddq";
      case 2:
        return "evenq";
      case 3:
        return "oddr";
      case 4:
        return "evenr";
      default:
        throw "Unrecognised board type parameter";
    }
  }

  essenceToZeroIndex(obj) {
    let zeroIndex = {}
  
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

    return <HexagonalBoard {...this.props} leftLabels={this.props.params.blocks} boardType={this.getBoardType(this.props.params.board_type)} present={this.props.params.blocks} matrixprops={{"block":this.essenceToZeroIndex(this.props.params.blocks)}}/>;
  }
}

export default NumberHiveBoard;
