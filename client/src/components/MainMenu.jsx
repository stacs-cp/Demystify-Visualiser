import React from 'react';
import { Card, Row, ListGroup, Dropdown, Alert, Spinner, Button } from 'react-bootstrap'
import * as API from "../API";

/**
 * Load a JSON input from the user's filesystem or preloaded examples.
 */
class MainMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            examples: [],
            error: []
        };
    }

    componentDidMount() {
        API.getExamples()
            .then(res => this.setState({ examples: res },
                () => this.setState({ isLoading: false })));
    }
    // Read a JSON file on the user's filesystem
    readFile = async (e) => {
        e.preventDefault()
        const reader = new FileReader()
        reader.onload = async (e) => {
            try {
                const text = (e.target.result)
                this.props.setInput(JSON.parse(text));
            } catch {
                this.setState((prev) => ({error: [...prev.error, 
                    "Error: Could not read the input file. Ensure it is a JSON file produced by Demystify."]}));
            }
        };
        reader.readAsText(e.target.files[0])

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
                            <input type="file" onChange={(e) => this.readFile(e)} />
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <b className="mx-4 pt-2">View a pre-generated example:</b>
                                <Dropdown onSelect={(e) => this.chooseExample(e)}>
                                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                                        Examples
                                </Dropdown.Toggle>

                            
                                    <Dropdown.Menu>
                                        {this.state.isLoading ?
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
                                    <input type="file" onChange={(e) => this.readFile(e)} />
                                </Row>
                                
                                <Row>
                                    <p className="mx-4">Puzzle instance (.param): </p>
                                    <input type="file" onChange={(e) => this.readFile(e)} />
                                </Row>
                                <Row>
                                    <Button className="mx-4" variant="success">Go</Button>
                                </Row>
                                
                        </ListGroup.Item>
                    </ListGroup>
                    {console.log(this.state.error.length)}
                </Card>
                {this.state.error.length > 0 &&
                        <Alert variant="warning" className="mt-3 p-4 w-75 text-center">
                            {this.state.error[0]}
                        </Alert>}
            </div>
        )
    }
}

export default MainMenu;