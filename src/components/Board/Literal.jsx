import React from 'react';
import { Col } from 'react-bootstrap';

/**
 * A small "possible" value to display in the grid within each cell.
 * Style indicates in what way it is involved in the current step.
 */
class Literal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            highlighted: this.props.highlighted
        }
    }

    // Highlight/Unhighlight this literal and corresponding explanation
    toggleHighlight() {
        this.setState((prev) => { return {highlighted: !prev.highlighted }});
        this.props.highlightExplanation();
    }

    // Check whether this literal should be highlighted.
    componentDidUpdate(prevProps) {
        if(prevProps.highlighted !== this.props.highlighted) {
            this.setState({highlighted: this.props.highlighted});
        }
    }

    render() {
        const { value, status } = this.props;
        return <Col className="m-0 p-0" style={{
            // Styling dependent on literal status.
            color:  (status === "involved") ? "blue" :
                    (status === "negative") ? "red" :
                    (status === "positive") ? "green" : "black",
            textDecoration:
                (status === "negative") ? "line-through" : "none",
            fontWeight:
                (status === "positive") ? "bolder" : "normal",
            fontStyle:
                (status === "involved") ? "italic" : "normal",
            backgroundColor: this.state.highlighted ? "cornsilk" : null
        }}
            onMouseEnter={this.toggleHighlight.bind(this)} 
            onMouseLeave={this.toggleHighlight.bind(this)}
        >{value}
        </Col>
    }

}

export default Literal;