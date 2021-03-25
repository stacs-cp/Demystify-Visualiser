import React from 'react';
import { Accordion, Card, Button, ListGroup } from 'react-bootstrap';

class Explanations extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            highlighted: -1
        }
    }


    highlight(i) {
        this.props.highlight(i);

        this.setState({ highlighted: i })
    }


    render() {
        const { simpleDeductions, deductions } = this.props;
        console.log(deductions);
        return (
            <Card className="mt-3" >

                {simpleDeductions ?
                    <Accordion defaultActiveKey="1">
                        <Card.Header>
                            <h5>Made {simpleDeductions.length} simple deductions.</h5>
                            <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                Show/Hide
                            </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="0">
                            <ListGroup style={{ maxHeight: "75vh", overflowY: "scroll" }}>
                                {
                                    simpleDeductions.map((deduction, i) => {

                                        const itemStyle =
                                            this.state.highlighted === i ?
                                                { backgroundColor: "cornsilk" } : null
                                        return <ListGroup.Item
                                            style={itemStyle}
                                            key={i}
                                            onMouseOver={() => this.highlight(i)}>
                                            {deduction.decision}
                                            <br />
                                            {deduction.reason}
                                        </ListGroup.Item>
                                    }

                                    )
                                }
                            </ListGroup>
                        </Accordion.Collapse>
                    </Accordion>
                    : deductions &&
                    <React.Fragment>
                        <Card.Header>
                            <h5>Made the following deduction:</h5>
                        </Card.Header>
                        <Card.Body>
                            <ListGroup style={{ maxHeight: "75vh", overflowY: "scroll" }}>
                                <ListGroup.Item
                                    style={{ backgroundColor: "cornsilk" }}
                                    key={0}
                                    onMouseOver={() => this.highlight(0)}>
                                    {deductions.decision}
                                    <br />
                                    {deductions.reason.map((reason) => (<p>{reason}</p>))}
                                </ListGroup.Item>


                            </ListGroup>
                        </Card.Body>
                    </React.Fragment>

                }

            </Card>
        );
    }
}

export default Explanations;