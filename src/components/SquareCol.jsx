import React from 'react';
import {Col} from 'react-bootstrap';

class SquareCol extends React.Component {
    render() {
        return (
            <Col className="m-0 p-0" >
                <div
                    style={{
                        border: "2px solid lightgray",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"

                    }}
                >
                    {this.props.children}
                    <div style={{
                        display: "block",
                        paddingBottom: "100%"
                    }}></div>
                </div>
            </Col >
        )
    }
}

export default SquareCol;