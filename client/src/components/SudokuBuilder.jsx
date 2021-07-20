import React from 'react';
import SquareRow from './Board/SquareRow';
import SquareCol from './Board/SquareCol';
import { Card, Row, Col, Form, Button } from 'react-bootstrap'

class SudokuBuilder extends React.Component {
    state = {
        grid: Array.apply(null, Array(9)).map((v, i) => Array.apply(null, Array(9)).map((w, j) => ""))
    }
    getSudokuBorders(i, j) {
        return {
            borderTop: i % 3 === 0 ? "2px solid black" : "2px solid lightgray",
            borderBottom: i === 8 ? "2px solid black" : "2px solid lightgray",
            borderLeft: j % 3 === 0 ? "2px solid black" : "2px solid lightgray",
            borderRight: j === 8 ? "2px solid black" : "2px solid lightgray",
            marginLeft: "-2px",
            marginBottom: "-2px",
        }
    }

    handleChange(i, j, e) {
        // Match single digits or empty string
        if(/^\d$|^$/.test(e.target.value)) {
            this.updateGrid(i, j, e.target.value)
        }
        
    }

    updateGrid(i, j, v) {
        let newGrid = this.state.grid
        newGrid[i][j] = v
        this.setState({grid: newGrid})
    }

    handleSave() {
        const {grid} = this.state;

        const gridString = "letting fixed be \n\n" + "[" + grid.map(row => "\n    [" + row.map(v => v==="" ? "0" : v)+ "]") + "\n]"
        const element = document.createElement("a");
        const file = new Blob([gridString],    
               {type: 'text/plain;charset=utf-8'});
        element.href = URL.createObjectURL(file);
        element.download = "sudoku_builder.param";
        document.body.appendChild(element);
        element.click();
    }

    handleRun() {

    }
    
    render() {
        const {grid} = this.state
        return (
            <>
                <Row className="d-flex justify-content-center">
                    <Col xs={8}>
                        <Card className="mt-3 pt-3 w-100" >
                            <Card.Body className="d-flex justify-content-between">
                                <Button onClick={this.handleSave.bind(this)} variant="success">Save as .param file</Button>
                                <p className="mt-2" style={{textAlign: "center"}}>Fill in your desired starting grid values: </p>
                                <Button onClick={this.handleRun.bind(this)} variant="success">Run Demystify</Button>
                            </Card.Body>
                        </Card>
                    </Col>


                </Row>
                <Row className="d-flex justify-content-center">
                    <Col xs={5}>
                        <Card className="mt-3 pt-3">
                            <Card.Body>
                                {grid.map((row, i) =>
                                    <SquareRow>
                                        {row.map((v, j) =>
                                            <SquareCol
                                                borders={this.getSudokuBorders(i, j)}
                                            >
                                                <Form.Control 
                                                    className="m-0 w-100 h-100" 
                                                    style={{
                                                        border: 0, 
                                                        textAlign: "center", 
                                                        fontWeight: "bold",
                                                        fontSize: "2vw"}} 
                                                    value={v}
                                                    onFocus = {() => this.updateGrid(i, j, "")} 
                                                    type="text" 
                                                    size="1"
                                                    onChange={(e) => this.handleChange(i, j, e)}/>
                                            </SquareCol>)}
                                    </SquareRow>)}
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </>

        )
    }
}

export default SudokuBuilder;