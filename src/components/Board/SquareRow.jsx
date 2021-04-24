import React from 'react';
import {Row} from 'react-bootstrap';

class SquareRow extends React.Component {
    render() {
        return (
            <Row 
                style={this.props.style}
                className="p-0 m-0 d-flex flex-direction-row align-items-center justify-content-center">
                {this.props.children}
            </Row>
        );
    }
}

export default SquareRow;