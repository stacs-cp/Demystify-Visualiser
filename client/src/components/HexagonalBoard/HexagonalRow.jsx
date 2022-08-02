import React from "react";

/**
 * Saves typing out the bootstrap class name multiple times.
 */
class HexagonalRow extends React.Component {
  render() {
    return (
      <tspan
        style={this.props.style}
        className="p-0 m-0 d-flex flex-direction-row align-items-center justify-content-center"
      >
        {this.props.children}
      </tspan>
    );
  }
}

export default HexagonalRow;
