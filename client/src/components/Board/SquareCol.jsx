import React from 'react';
import {Col} from 'react-bootstrap';

/**
 * A Square cell container, with optional extra styling.
 */
class SquareCol extends React.Component {
    
    render() {

        const borders = this.props.borders ? this.props.borders :
        {
            border: "2px solid lightgray",
            marginBottom: "-2px", // Deal with "doubled" borders.
            marginLeft: "-2px"
        }

        const margin = this.props.margin ? this.props.margin : {}

        return (
            <Col className="m-0 p-0" >
                <div
                    style={{
                        ...borders,
                        ...margin,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundImage: this.props.background,
                        backgroundSize:"100% 100%",
                    }}
                >   
                    { // Small optional number to overlay on the cell.
                    this.props.cornerNumber && <div style={{
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
                        ...this.props.cornerNumber.style,
                    }}>
                        {this.props.cornerNumber.value}
                    </div>}

                    { // Optional label between this cell and next on the right.
                    this.props.rightLabel && <div style={{
                        position: "absolute",
                        top: "35%",
                        right: "-5%",
                        fontSize: "2vw"
                    }}>
                        {this.props.rightLabel}
                    </div>}

                    { // Optional label between this cell and the next below.
                    this.props.bottomLabel && <div style={{
                        position: "absolute",
                        bottom: "-15%",
                        right: "42%",
                        fontSize: "2vw"
                    }}>
                        {this.props.bottomLabel}
                    </div>}

                    <div style={{
                        ...this.props.innerBorders,
                        padding: "0px",
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}>
                        {this.props.children /* Main cell content */} 
                        
                        {/*This div ensure the cell is always square
                            CSS trick: https://stackoverflow.com/a/28985475/12309539*/}
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