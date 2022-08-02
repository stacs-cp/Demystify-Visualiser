import React from "react";
import { Col } from "react-bootstrap";
import { Text } from "react-hexgrid";

/**
 * A small "possible" value to display in the grid within each cell.
 * Style indicates in what way it is involved in the current step.
 */
class HexagonalLiteral extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      highlighted: false,
    };
  }

  // Highlight/Unhighlight this literal and corresponding explanation
  toggleHighlight() {
    this.setState((prev) => {
      return { highlighted: !prev.highlighted };
    });
    this.props.highlightExplanation();
  }

  // Check whether this literal should be highlighted.
  // componentDidUpdate(prevProps) {
  //   if (prevProps.highlighted !== this.props.highlighted) {
  //     this.setState({ highlighted: this.props.highlighted });
  //   }
  // }

  handleClick() {
    this.props.setSelectedLiteral();
  }
  render() {
    const { value, status } = this.props;
    return ({value}
    );
  }
}

export default HexagonalLiteral;
