import React from 'react';
import { Card, Row, ListGroup, Dropdown, Alert, Spinner } from 'react-bootstrap'
import * as API from "../API";

/**
 * Load a JSON input from the user's filesystem or preloaded examples.
 */
class FileLoader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            examples: []
        };
    }

    componentDidMount() {
        API.getExamples()
        .then(res => this.setState({examples: res}, 
            () => this.setState({isLoading: false})));
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
                this.props.setError();
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
            <Card className="mt-3 pt-3">
                <ListGroup variant="flush">
                    <ListGroup.Item>
                        {/* Basic file selection. */}
                        <Row className="d-flex justify-content-center">
                            <p className="mx-4">  Load Demystify output from JSON file:</p>
                            <input type="file" onChange={(e) => this.readFile(e)} />
                        </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <Row className="d-flex justify-content-center">
                            <p className="mx-4 pt-2">Or choose a preloaded example:</p>
                            <Dropdown onSelect={(e) => this.chooseExample(e)}>
                                <Dropdown.Toggle variant="success" id="dropdown-basic">
                                    Examples
                                </Dropdown.Toggle>
                                
                                {/* Again, hardcoded options should be fetched from somewhere in future.*/}
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
                </ListGroup>
            </Card>
        )
    }
}

export default FileLoader;