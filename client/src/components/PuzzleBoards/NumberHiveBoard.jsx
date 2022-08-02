import React from "react";
import HexagonalBoard from "../HexagonalBoard/HexagonalBoard";

/**
 * NumberHive: fill grid so numbers 1-{size of the block} occur 
 * in each block just once, and no neighbours contain the same number
 */
class NumberHiveBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getBackgrounds() {
    let backgrounds = {
      0: "radial-gradient(gray 60%, #000000 61%, #ffffff 66%)",
      1: "radial-gradient(#ffffff 60%, #000000 61%, #ffffff 66%)",
    };

    return backgrounds;
  }

  render() {
    return <HexagonalBoard {...this.props} literalBackgrounds={this.getBackgrounds()} leftLabels={this.props.params.blocks} />;
  }
}

export default NumberHiveBoard;
