import React from 'react';
import { Accordion, Card, Button, ListGroup } from 'react-bootstrap';
import NavSwitcher from '../NavSwitcher';
import Explanation from './Explanation';

/**
 * A sidebar that displays the deductions made on a given step, along with the explanations for that deduction.
 */
class ExplanationList extends React.Component {

    render() {
        const { simpleDeductions, deductions, otherChoices, smallestMUSSize} = this.props;
        return (
            <React.Fragment>
                <Card className="mt-3" >

                    { /*For simple deductions (just one reason), display a collapsible list */
                        simpleDeductions ?
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
                        /* Otherwise we have an "interesting" deductions, 
                            so display the deductions with a list of reasons */
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

                {/*If there are other choices, display a NavSwitcher to step through the alternatives */
                otherChoices && 
                    <Card className="mt-3">
                    <Card.Header>
                        <b>Found {otherChoices.length + 1} choices in total for this step:</b>
                    </Card.Header>
                    <Card.Body>
                        <div className="mb-3">
                            See the alternative deductions with MUS size {smallestMUSSize}:
                            
                        </div>
                        <NavSwitcher 
                            stepName={"alternative"} 
                            className="p-3" 
                            setCurrentStep={this.props.setAlternative} 
                            maxSteps={otherChoices.length}
                            currentStep={this.props.currentAlternative}
                            />
                        <div>
                            <small className="text-muted">
                                (Note: different MUSs may result in deductions that look identical)
                            </small>
                        </div>

                    </Card.Body>

                </Card>}
            </React.Fragment>
        );
    }
}

export default ExplanationList;