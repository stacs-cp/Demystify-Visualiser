import React from 'react';
import { Card, Row, ListGroup, Dropdown, Alert, Spinner, Button, Form } from 'react-bootstrap'
import * as API from "../../API";
import FileUploader from './FileUploader';
import DropdownChoices from './DropdownChoices';
import JobWait from '../JobWait';
import RadioChoices from './RadioChoices';

/**
 * Load a JSON input from the user's filesystem or preloaded examples.
 */
class MainMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // Dropdown choices
            examples: [],
            eprimeChoices: [],
            chosenEprime: null,

            // Form input
            eprime: null,
            eprimeName: null,
            param: null,
            paramName: null,
            mode: "default",
            algorithm: "cascade-fast",

            // Controls spinners
            isLoadingExamples: true,
            isLoadingExampleJSON: false,
            isQueueing: false, // Setting up job
            isWaiting: false, // Job is running (show JobWait)

            // Other
            jobId: null,
            error: ""
        };
    }

    componentDidMount() {
        API.getExamples()
            .then(res => this.setState({ examples: res },
                () => this.setState({ isLoadingExamples: false })));
        API.getEprime()
            .then(res => this.setState({ eprimeChoices: res },
                () => this.setState({ isLoadingEprime: false })));
    }

    componentDidUpdate = () => {
        if (this.state.isQueueing || this.state.isWaiting) {
            window.onbeforeunload = () => { return true; }
        } else {
            window.onbeforeunload = undefined
        }
    }

    setError(message) {
        this.setState({ error: message });
    }

    async chooseExample(name) {
        this.setState({ isLoadingExampleJSON: true })
        const example = await API.getExampleData(name);
        this.props.setInput({ result: example }, "default");
    }

    chooseEprime(name) {
        const both = name.toString().split(",");
        this.setState(
            {
                eprimeName: both[0],
                eprime: null,
                paramName: both[1].replace(/\s/g, ''),
                param: null,
                chosenEprime: both[1].replace(/\s/g, '').substr(0, 8) + "..."
            })
    }

    handleOptionChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    async handleGo() {
        if (!this.state.eprimeName || !this.state.paramName) {
            this.setError(
                "Please select .eprime and .param files to run Demystify.");
            return;
        }

        this.setState({ isRunning: true });
        const { eprimeName, eprime, paramName, param, mode, algorithm } = this.state;
        const numSteps = mode === "default" ? -1 : 0;
        const getInitial = mode === "force"
        try {
            const result = await API.createJob(
                {
                    eprimeName: eprimeName,
                    eprime: eprime,
                    paramName: paramName,
                    param: param,
                    algorithm: algorithm,
                    numSteps: numSteps,
                    explainedLits: [],
                    getInitial: getInitial
                });

            this.setState({ isWaiting: true, jobId: result.jobId })

        } catch (err) {
            this.setError(
                "There was a problem running Demystify on the server.");
            this.setState({ isRunning: false });
        }
    }

    render() {
        return (

            <div className="d-flex flex-column align-items-center">
                <h1 className="mt-3">Demystify Visualiser</h1>
                <img className="mt-3" style={{ width: "80px" }} alt="demystify logo" src="favicon.ico" />

                <Card as={Row} className="mt-3 pt-3 w-75">
                    {this.state.isWaiting ? 
                        <JobWait jobId={this.state.jobId} setInput={this.props.setInput} mode={this.state.mode} /> :
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <Row>
                                    {/* Basic file selection. */}
                                    <b className="mx-4">  Load Demystify output from JSON file:</b>
                                    <FileUploader
                                        disabled={this.state.isQueueing || this.state.isLoadingExampleJSON}
                                        onUpload={(text) => this.props.setInput({ result: JSON.parse(text) }, "default")}
                                        onError={() => this.setError(
                                            "Could not read the input file. Ensure it is a JSON file produced by Demystify.")}
                                    />
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <b className="mx-4 pt-2">View a pre-generated example:</b>
                                    <DropdownChoices
                                        name={"Examples"}
                                        choices={this.state.examples}
                                        makeChoice={this.chooseExample.bind(this)}
                                        disabled={this.state.isQueueing}
                                        isLoading={this.state.isLoadingExamples}
                                    />
                                    {this.state.isLoadingExampleJSON && <Spinner className="ml-4" animation="border" />}
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <b className="mx-4 pt-2">Try your own Sudoku instance:</b>
                                    <Button variant="success" onClick={this.props.handleBuildSudoku}>Create</Button>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <b className="mx-4 mb-2">Run Demystify live:</b>
                                </Row>
                                <Row>
                                    <p className="mx-4 pt-2 mb-2">Select an eprime/param combination:</p>
                                    <DropdownChoices
                                        name={this.state.chosenEprime ? this.state.chosenEprime : "Essence"}
                                        choices={this.state.eprimeChoices}
                                        makeChoice={this.chooseEprime.bind(this)}
                                        disabled={this.state.isQueueing}
                                        isLoading={this.state.isLoadingEprime}
                                    />
                                </Row>
                                <Row>
                                    <b className="mx-4 mb-2">OR</b>
                                </Row>
                                <Row>
                                    <p className="mx-4">Upload puzzle description (.eprime): </p>
                                    <FileUploader
                                        disabled={this.state.isQueueing || this.state.isLoadingExampleJSON}
                                        onUpload={(text, name) => this.setState({ chosenEprime: null, eprime: text, eprimeName: name })}
                                        onError={() => this.setError(
                                            "Could not read the input file. Ensure it is a valid .eprime file.")}
                                        noFile={this.state.eprime === null}
                                    />
                                </Row>
                                <Row>
                                    <p className="mx-4">and puzzle instance (.param): </p>
                                    <FileUploader
                                        disabled={this.state.isQueueing || this.state.isLoadingExampleJSON}
                                        onUpload={(text, name) => this.setState({ chosenEprime: null, param: text, paramName: name })}
                                        onError={() => this.setError(
                                            "Could not read the input file. Ensure it is a valid .param file.")}
                                        noFile={this.state.param === null}
                                    />
                                </Row>
                                <Row>
                                    <RadioChoices
                                        name={"mode"}
                                        choices={["default", "manual", "force"]}
                                        labels={["Use default MUS choices", "Choose MUSes manually", "Force literal choices."]}
                                        selected={this.state.mode}
                                        onSelect={this.handleOptionChange.bind(this)} />
                                </Row>
                                <Row>
                                    <RadioChoices
                                        name={"algorithm"}
                                        choices={["cascade-fast", "cascade-more", "forqes"]}
                                        labels={["Cascade - faster", "Cascade - more choices", "FORQES"]}
                                        selected={this.state.algorithm}
                                        onSelect={this.handleOptionChange.bind(this)} />
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
                        </ListGroup>}
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