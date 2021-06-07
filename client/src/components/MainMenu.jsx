import React from 'react';
import { Card, Row, ListGroup, Dropdown, Alert, Spinner, Button } from 'react-bootstrap'
import * as API from "../API";
import FileUploader from './FileUploader';

/**
 * Load a JSON input from the user's filesystem or preloaded examples.
 */
class MainMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoadingExamples: true,
            examples: [],
            eprime: null,
            eprimename: null,
            param: null,
            paramname: null,
            error: "",
            isRunning: false,
        };
    }

    componentDidMount() {
        API.getExamples()
            .then(res => this.setState({ examples: res },
                () => this.setState({ isLoadingExamples: false })));
    }

    async handleGo() {
        if(!this.state.eprime || ! this.state.param) {
            this.setError(
                "Please upload .eprime and .param files to run Demystify.");
            return;
        }

        this.setState({isRunning: true});
        const {eprimename, eprime, paramname, param} = this.state;
        const result = await API.runDemystifyOnInput(eprimename, eprime, paramname, param);
        this.props.setInput(result);
    }

    setError(message) {
        this.setState({error: message});
    }

    componentDidUpdate = () => {
        if (this.state.isRunning) {
          window.onbeforeunload = () => {return true;}
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
        const example = await API.getExampleData(name);
        this.props.setInput(example);
    }

    render() {
        return (
            <div className="d-flex flex-column align-items-center">
                <h1 className="mt-3">Demystify Visualiser</h1>
                <img className="mt-3" style={{width: "100px"}} src="favicon.ico"/>
                <Card as={Row} className="mt-3 pt-3 w-75">
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <Row>
                            {/* Basic file selection. */}
                            <b className="mx-4">  Load Demystify output from JSON file:</b>
                            <FileUploader
                                disabled={this.state.isRunning}
                                onUpload={(text) => this.props.setInput(JSON.parse(text))}
                                onError={() => this.setError(
                                    "Could not read the input file. Ensure it is a JSON file produced by Demystify.")}
                            />
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <b className="mx-4 pt-2">View a pre-generated example:</b>
                                <Dropdown onSelect={(e) => this.chooseExample(e)}>
                                    <Dropdown.Toggle disabled={this.state.isRunning} variant="success" id="dropdown-basic">
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
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
        
                                <Row>
                                    <b className="mx-4 mb-4">Run Demystify live:</b>
                                </Row>
                                <Row>
                                    <p className="mx-4">Puzzle description (.eprime): </p>
                                    <FileUploader
                                        disabled={this.state.isRunning}
                                        onUpload={(text, name) => this.setState({eprime: text, eprimename: name})}
                                        onError={() => this.setError(
                                        "Could not read the input file. Ensure it is a valid .eprime file.")}
                                    />
                                </Row>
                                
                                <Row>
                                    <p className="mx-4">Puzzle instance (.param): </p>
                                    <FileUploader 
                                        disabled={this.state.isRunning}
                                        onUpload={(text, name) => this.setState({param: text, paramname: name})}
                                        onError={() => this.setError(
                                        "Could not read the input file. Ensure it is a valid .param file.")}
                                    />
                                </Row>
                                <Row>
                                    <Button 
                                        disabled={this.state.isRunning}
                                        className="mx-4" 
                                        variant="success" 
                                        onClick={this.handleGo.bind(this)}>
                                            Go
                                    </Button>
                                    {this.state.isRunning &&
                                        <React.Fragment>
                                            <Spinner animation="border" />
                                            <p className="ml-4">Demystify is running... This may take some time to complete.</p>
                                        </React.Fragment>
                                        
                                    }
                                </Row>
                                
                        </ListGroup.Item>
                    </ListGroup>
                    {console.log(this.state.error.length)}
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