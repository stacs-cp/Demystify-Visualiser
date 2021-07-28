import React from "react";
import Board from "../Board/Board";

class BinairoBoard extends React.Component {
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
    return <Board {...this.props} literalBackgrounds={this.getBackgrounds()} />;
  }
}

export default BinairoBoard;
