import React from 'react';
import { Container, Row } from 'react-bootstrap';
import Literal from './Literal';

class Cell extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            highlighted: this.props.highlighted
        }
    }
    

    highlight(exp) {
       this.props.highlight(exp);
    }

    componentDidUpdate(prevProps) {
        if(prevProps.highlighted !== this.props.highlighted) {
            this.setState({highlighted: this.props.highlighted});
        }
    }
    render() {
        const { cellContent } = this.props;
        return (
            <div
                style={{ border: "solid", display: "flex", justifyContent: "center", alignItems: "center"}}
            >
                {cellContent.cellRows.length === 1 &&
                    cellContent.cellRows[0].cellValues.length === 1 ?
                    <h1 style={{fontSize: "3vw"}}>{cellContent.cellRows[0].cellValues[0].value}</h1>
                    :
                    <Container fluid className="p-0 align-items-center">
                        {cellContent.cellRows.map((row, i) =>
                            <Row key={i} style={{fontSize: "1vw"}} className="p-0 m-0 flex-direction-row justify-content-center">
                                {row.cellValues.map((literal, i) => 
                                    
                                    <Literal 
                                        key={i}
                                        value={literal.value} 
                                        status={literal.status}
                                        highlighted={literal.explanations.includes(this.state.highlighted.toString())}
                                        highlightExplanation={() => this.highlight(literal.explanations)}
                                    />
                                

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