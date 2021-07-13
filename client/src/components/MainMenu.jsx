import React from 'react';
import { Card, Row, ListGroup, Dropdown, Alert, Spinner, Button, Form } from 'react-bootstrap'
import * as API from "../API";
import FileUploader from './FileUploader';
import JobWait from './JobWait';

/**
 * Load a JSON input from the user's filesystem or preloaded examples.
 */
class MainMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            examples: [],
            eprime: null,
            eprimename: null,
            param: null,
            paramname: null,
            error: "",
            jobId: null,
            isLoadingExamples: true,
            isLoadingExampleJSON: false,
            mode: "default",
            algorithm: "cascade",
            isQueueing: false,
            isWaiting: false
        };
    }

    componentDidMount() {
        API.getExamples()
            .then(res => this.setState({ examples: res },
                () => this.setState({ isLoadingExamples: false })));
    }

    async handleGo() {
        if (!this.state.eprime || !this.state.param) {
            this.setError(
                "Please upload .eprime and .param files to run Demystify.");
            return;
        }

        this.setState({ isRunning: true });
        const { eprimename, eprime, paramname, param, mode, algorithm } = this.state;
        const numSteps = mode === "default" ? -1 : 0;

        try {
            const result = await API.createJob(eprimename, eprime, paramname, param, algorithm, numSteps);
            this.setState({isWaiting: true, jobId: result.jobId})
            
        } catch (err) {
            this.setError(
                "There was a problem running Demystify on the server.");
            this.setState({ isRunning: false });
        }
    }

    setError(message) {
        this.setState({ error: message });
    }

    componentDidUpdate = () => {
        if (this.state.isQueueing) {
            window.onbeforeunload = () => { return true; }
        } else {
            window.onbeforeunload = undefined
        }
    }

    async getExamples() {
        const examples = await API.getExamples();

        try {
            const items = examples.map(name =>
                <Dropdown.Item>
                    {name}
                </Dropdown.Item>);
            return items;
        } catch {
            return (
                <Alert className="m-0" variant="warning">
                    Error fetching examples.
                </Alert>)
        }
    }

    async chooseExample(name) {
        this.setState({isLoadingExampleJSON: true})
        const example = await API.getExampleData(name);
        this.props.setInput({result: example}, "default");
    }

    handleModeChange(e) {
        this.setState({
            mode: e.target.value
        });
    }

    handleOptionChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    render() {
        return (
            
            <div className="d-flex flex-column align-items-center">
                <h1 className="mt-3">Demystify Visualiser</h1>
                <img className="mt-3" style={{ width: "100px" }} alt="demystify logo" src="favicon.ico" />
                <Card as={Row} className="mt-3 pt-3 w-75">
                    {this.state.isWaiting ? <JobWait jobId={this.state.jobId} setInput={this.props.setInput} mode={this.state.mode}/> :
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <Row>
                                {/* Basic file selection. */}
                                <b className="mx-4">  Load Demystify output from JSON file:</b>
                                <FileUploader
                                    disabled={this.state.isQueueing || this.state.isLoadingExampleJSON}
                                    onUpload={(text) => this.props.setInput({result: JSON.parse(text)}, "default")}
                                    onError={() => this.setError(
                                        "Could not read the input file. Ensure it is a JSON file produced by Demystify.")}
                                />
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <b className="mx-4 pt-2">View a pre-generated example:</b>
                                <Dropdown onSelect={(e) => this.chooseExample(e)}>
                                    <Dropdown.Toggle disabled={this.state.isQueueing} variant="success" id="dropdown-basic">
                                        Examples
                                    </Dropdown.Toggle>


                                    <Dropdown.Menu>
                                        {this.state.isLoadingExamples ?
                                            <div className="d-flex justify-content-center">
                                                <Spinner animation="border" />
                                            </div>
                                            :
                                            this.state.examples.map((name) =>
                                                <Dropdown.Item key={name} eventKey={name} onClick={() => this.chooseExample(name)}>
                                                    {name}
                                                </Dropdown.Item>)}
                                    </Dropdown.Menu>
                                </Dropdown>
                                {this.state.isLoadingExampleJSON && <Spinner className="ml-4" animation="border"/>}
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>

                            <Row>
                                <b className="mx-4 mb-4">Run Demystify live:</b>
                            </Row>
                            <Row>
                                <p className="mx-4">Puzzle description (.eprime): </p>
                                <FileUploader
                                    disabled={this.state.isQueueing || this.state.isLoadingExampleJSON}
                                    onUpload={(text, name) => this.setState({ eprime: text, eprimename: name })}
                                    onError={() => this.setError(
                                        "Could not read the input file. Ensure it is a valid .eprime file.")}
                                />
                            </Row>

                            <Row>
                                <p className="mx-4">Puzzle instance (.param): </p>
                                <FileUploader
                                    disabled={this.state.isQueueing || this.state.isLoadingExampleJSON}
                                    onUpload={(text, name) => this.setState({ param: text, paramname: name })}
                                    onError={() => this.setError(
                                        "Could not read the input file. Ensure it is a valid .param file.")}
                                />
                            </Row>
                            <Row>
                                <Form inline className="mx-4 mb-3">
                                            <Form.Label className="mr-4">Mode: </Form.Label>
                                            <Form.Check className="mr-4"
                                                type="radio"
                                                name="mode"
                                                value="default"
                                                checked={this.state.mode === "default"}
                                                onChange={this.handleModeChange.bind(this)}
                                                label="Use default MUS choices"
                                            />

                                            <Form.Check
                                                type='radio'
                                                name="mode"
                                                value="manual"
                                                checked={this.state.mode === "manual"}
                                                onChange={this.handleModeChange.bind(this)}
                                                label="Choose MUSes manually"
                                            />
                                </Form>
                            </Row>
                            <Row>
                                <Form inline className="mx-4 mb-3">
                                            <Form.Label className="mr-4">MUS algorithm: </Form.Label>
                                            <Form.Check className="mr-4"
                                                type="radio"
                                                name="algorithm"
                                                value="cascade"
                                                checked={this.state.algorithm === "cascade"}
                                                onChange={this.handleOptionChange.bind(this)}
                                                label="Cascade"
                                            />

                                            <Form.Check
                                                type='radio'
                                                name="algorithm"
                                                value="forqes"
                                                checked={this.state.algorithm === "forqes"}
                                                onChange={this.handleOptionChange.bind(this)}
                                                label="FORQES"
                                            />
                                </Form>
                            </Row>
                            <Row>
                                <Button
                                    disabled={this.state.isQueueing || this.state.isLoadingExampleJSON}
                                    className="mx-4"
                                    variant="success"
                                    onClick={this.handleGo.bind(this)}>
                                    Go
                                </Button>
                                {this.state.isQueueing &&
                                    <React.Fragment>
                                        <Spinner animation="border" />
                                        <p className="ml-4">Setting up Demystify job...</p>
                                    </React.Fragment>

                                }
                            </Row>

                        </ListGroup.Item>
                    </ListGroup> }
                </Card>
                {this.state.error.length > 0 &&
                    <Alert variant="warning" className="mt-3 p-4 w-75 text-center">
                        {this.state.error}
                    </Alert>}
            </div>
        )
    }
}

export default MainMenu;