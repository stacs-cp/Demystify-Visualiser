import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

class Cell extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          highlighted: this.props.highlighted
        }
      }
    

    highlight(i) {
       this.props.highlight(i);
       
       this.setState({highlighted: i})
    }

    componentDidUpdate(prevProps) {
        if(prevProps.highlighted !== this.props.highlighted) {
            this.setState({highlighted: this.props.highlighted});
        }
    }
    render() {
        const { cellContent } = this.props;
        console.log(this.state.highlighted)
        return (
            <div
                style={{ border: "solid", display: "flex", justifyContent: "center", alignItems: "center"}}
            >
                {cellContent.cellRows.length == 1 &&
                    cellContent.cellRows[0].cellValues.length == 1 ?
                    <h1 style={{fontSize: "3vw"}}>{cellContent.cellRows[0].cellValues[0].value}</h1>
                    :
                    <Container fluid className="p-0 align-items-center">
                        {cellContent.cellRows.map((row) =>
                            <Row style={{fontSize: "1vw"}} className="p-0 m-0 flex-direction-row justify-content-center">
                                {row.cellValues.map((literal) => {
                                    return <Col className="m-0 p-0" style={{
                                        /*border: "solid",*/
                                        color: (literal.markers.includes("pii") ? "blue" :
                                            literal.markers.includes("nit") ? "red" :
                                            literal.markers.includes("pit") ? "green" : "black"),
                                        backgroundColor: literal.markers.includes(String(this.state.highlighted)) ? "cornsilk" : null

                                    }}
                                    
                                    >{literal.value}
                                    </Col>
                                }

                                )}
                            </Row>
                        )}

                    </Container>
                }
                <div style={{
                    display: "block",
                    paddingBottom: "100%"
                }}></div>
            </div >

        )
    }
}

export default Cell;