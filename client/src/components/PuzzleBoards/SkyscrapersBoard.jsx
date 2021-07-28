import React from "react";
import Board from "../Board/Board";

class SkyscrapersBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      size: this.props.params.SIZE,
      rowsums: Object.values(this.props.params.CLUES["1"]).map((num) =>
        num === 0 ? null : num
      ),
      colsums: Object.values(this.props.params.CLUES["2"]).map((num) =>
        num === 0 ? null : num
      ),
      endrowsums: Object.values(this.props.params.CLUES["3"]).map((num) =>
        num === 0 ? null : num
      ),
      endcolsums: Object.values(this.props.params.CLUES["4"]).map((num) =>
        num === 0 ? null : num
      ),
    };
  }

  render() {
    return (
      <Board
        {...this.props}
        colsums={this.state.colsums}
        endcolsums={this.state.endcolsums}
        rowsums={this.state.rowsums}
        endrowsums={this.state.endrowsums}
      />
    );
  }
}

export default SkyscrapersBoard;
