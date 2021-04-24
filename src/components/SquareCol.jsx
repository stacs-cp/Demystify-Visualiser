import React from 'react';
import {Col} from 'react-bootstrap';

class SquareCol extends React.Component {
    
    render() {
        const borders = this.props.borders ? this.props.borders :
        {
            border: "2px solid lightgray",
            marginBottom: "-2px",
            marginLeft: "-2px"
        }
        return (
            <Col className="m-0 p-0" >
                <div
                    style={{
                        ...borders,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundImage: this.props.background,
                        backgroundSize:"100% 100%"
                    }}
                >   
                    {this.props.cornerNumber && <div style={{
                        position: "absolute",
                        fontWeight: "bolder",
                        color: "white",
                        backgroundColor: "#0275d8",
                        borderRadius: "10px",
                        minWidth: "1vw",
                        fontSize: "0.8vw",
                        paddingRight: "1px",
                        paddingLeft: "1px",
                        zIndex: "2",
                        ...this.props.cornerNumber.pos,
                    }}>
                        {this.props.cornerNumber.value}
                    </div>}
                    <div style={{
                        ...this.props.innerBorders,
                        padding: "0px",
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}>
                        {this.props.children}
                        <div style={{
                        display: "block",
                        paddingBottom: "100%"
                        }}></div>
                    </div>
                    
                    
                </div>
            </Col >
        )
    }
}

export default SquareCol;