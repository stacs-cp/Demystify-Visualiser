import React from 'react';
import { Button, Card, Form } from 'react-bootstrap';

/**
 * A top navigation bar to advance or deadvance the steps of the solution.
 */
class NavSwitcher extends React.Component {
    state = {
        currentStep: this.props.currentStep,
    }

    // Advance
    nextStep() {
        const newValue = this.state.currentStep + 1;
        if (newValue <= this.props.maxSteps) {
            this.setState({ currentStep: newValue });
            this.props.setCurrentStep(newValue);
        }
    }

    // Deadvance
    lastStep() {
        const newValue = this.state.currentStep - 1;
        if (newValue >= 0) {
            this.setState({ currentStep: newValue });
            this.props.setCurrentStep(newValue);
        }
    }

    render() {
        return (
            <Card className={this.props.className}>

                <Form inline onSubmit={e => e.preventDefault()} className="d-flex justify-content-between">
                    <Button variant="primary" onClick={this.lastStep.bind(this)}>
                        Last {this.props.stepName}
                    </Button>

                    {/* Steps are indexed from 0 in JSON but display starting from 1 to the user. */}
                    <Form.Group>
                        <Form.Label className="w-70 mr-2">Current {this.props.stepName}:</Form.Label>
                        <Form.Label className="w-70 mr-2">{this.state.currentStep + 1}</Form.Label>
                    </Form.Group>

                    <Button variant="primary" onClick={this.nextStep.bind(this)}>
                        Next {this.props.stepName}
                    </Button>

                </Form>

            </Card>
        )
    }
}

export default NavSwitcher;