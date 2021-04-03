import React from 'react';
import { Col } from 'react-bootstrap';

class Literal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            highlighted: this.props.highlighted
        }
    }

    toggleHighlight() {
        this.setState((prev) => { return {highlighted: !prev.highlighted }});
        this.props.highlightExplanation();
    }

    componentDidUpdate(prevProps) {
        if(prevProps.highlighted !== this.props.highlighted) {
            this.setState({highlighted: this.props.highlighted});
            console.log("here")
        }
    }

    render() {
        const { value, status } = this.props;
        return <Col className="m-0 p-0" style={{
            /*border: "solid",*/
            color:  (status === "involved") ? "blue" :
                    (status === "negative") ? "red" :
                    (status === "positive") ? "green" : "black",
            textDecoration:
                (status === "negative") ? "line-through" : "none",
            fontWeight:
                (status === "positive") ? "bold" : "normal",
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