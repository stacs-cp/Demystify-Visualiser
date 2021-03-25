import React from 'react';
import { Button, Card, Row, Col, Form } from 'react-bootstrap';

class NavSwitcher extends React.Component {
    state = {
        currentStep: 0,

    }

    nextStep() {

        const newValue = this.state.currentStep + 1;
        if (newValue <= this.props.maxSteps) {
            this.setState({ currentStep: newValue });
            this.props.setCurrentStep(newValue);
        }
    }

    lastStep() {
        const newValue = this.state.currentStep - 1;
        if (newValue >= 0) {
            this.setState({ currentStep: newValue });
            this.props.setCurrentStep(newValue);
        }
    }

render() {
    return (
        <Card className="mt-3 p-3">

            <Form inline onSubmit={e => e.preventDefault()} className="d-flex justify-content-between">
                <Button variant="primary" onClick={this.lastStep.bind(this)}>Last Step</Button>

                <Form.Group>
                    <Form.Label className="w-70 mr-2">Current Step:</Form.Label>
                    <Form.Label className="w-70 mr-2">{this.state.currentStep + 1}</Form.Label>
                </Form.Group>

                <Button variant="primary" onClick={this.nextStep.bind(this)}>Next Step</Button>

            </Form>

        </Card>

    )
}
}

export default NavSwitcher;