import React from 'react';
import { Accordion, Card, Button, ListGroup } from 'react-bootstrap';
import Explanation from './Explanation';

class Explanations extends React.Component {

    render() {
        const { simpleDeductions, deductions } = this.props;
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
                            <ListGroup style={{ maxHeight: "60vh", overflowY: "scroll" }}>
                                {
                                    simpleDeductions.map((deduction, i) => {

                                        return <Explanation
                                            highlighted={this.props.highlighted.includes(i.toString())}
                                            decision={deduction.decision}
                                            reason={deduction.reason}
                                            index={i}
                                            key={i}
                                            highlight={() => this.props.highlight(i)} />
                                    })
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
                            <div className="mb-3">
                                <b >{deductions.decision}</b>
                            </div>

                            <ListGroup style={{ maxHeight: "75vh", overflowY: "scroll" }}>
                                {deductions.reason.map((reason, i) =>
                                    <Explanation
                                        highlighted={this.props.highlighted.includes(i.toString())}
                                        reason={reason}
                                        index={i}
                                        key={i}
                                        highlight={() => this.props.highlight(i)} />)}


                            </ListGroup>
                        </Card.Body>
                    </React.Fragment>

                }

            </Card>
        );
    }
}

export default Explanations;