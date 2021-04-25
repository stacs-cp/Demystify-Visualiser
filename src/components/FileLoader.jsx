import React from 'react';
import { Card, Row, ListGroup, ListGroupItem, Dropdown } from 'react-bootstrap'

/* In future, put these behind a backend endpoint.*/
let binairo = require('../json_inputs/binairo.json');
let futoshiki = require('../json_inputs/futoshiki.json');
let kakuro = require('../json_inputs/kakuro.json');
let killersudoku = require('../json_inputs/killersudoku.json');
let starbattle = require('../json_inputs/starbattle.json');
let tents = require('../json_inputs/tents.json');

class FileLoader extends React.Component {

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

    chooseExample(e) {
        // Harcoded for now.
        switch(e) {
            case "1":
                this.props.setInput(binairo)
                break;
            case "2":
                this.props.setInput(futoshiki)
                break;
            case "3":
                this.props.setInput(kakuro)
                break;
            case "4":
                this.props.setInput(killersudoku)
                break;
            case "5":
                this.props.setInput(starbattle)
                break;
            case "6":
                this.props.setInput(tents)
                break;
        }
    }

    render() {
        return (
            <Card className="mt-3 pt-3">
                <ListGroup variant="flush">
                    <ListGroup.Item>
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

                                <Dropdown.Menu>
                                    <Dropdown.Item eventKey="1">
                                        Binairo
                                    </Dropdown.Item>
                                    <Dropdown.Item eventKey="2">
                                        Futoshiki
                                    </Dropdown.Item>
                                    <Dropdown.Item eventKey="3">
                                        Kakuro
                                    </Dropdown.Item>
                                    <Dropdown.Item eventKey="4">
                                        Killer Sudoku
                                    </Dropdown.Item>
                                    <Dropdown.Item eventKey="5">
                                        Star Battle
                                    </Dropdown.Item>
                                    <Dropdown.Item eventKey="6">
                                        Tents and Trees
                                    </Dropdown.Item>
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