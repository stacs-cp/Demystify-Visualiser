import React from 'react';
import SquareRow from './Board/SquareRow';
import SquareCol from './Board/SquareCol';
import { Card, Row, Col, Form, Button, Alert } from 'react-bootstrap'
import JobWait from './JobWait';
import * as API from "../API";

class SudokuBuilder extends React.Component {
    state = {
        grid: Array.apply(null, Array(9)).map((v, i) => Array.apply(null, Array(9)).map((w, j) => "")),
        isRunning: false,
        isWaiting: false,
        error: null,
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

    getParamString() {
        const {grid} = this.state;

        return "letting fixed be \n\n" + "[" + grid.map(row => "\n    [" + row.map(v => v==="" ? "0" : v)+ "]") + "\n]"
    }

    handleSave() {
        const element = document.createElement("a");
        const file = new Blob([this.getParamString()],    
               {type: 'text/plain;charset=utf-8'});
        element.href = URL.createObjectURL(file);
        element.download = "sudoku_builder.param";
        document.body.appendChild(element);
        element.click();
    }

    async handleRun() {
        this.setState({ isRunning: true });

        try {
            const result = await API.createJob(
                {
                    eprimeName: "sudoku.eprime", 
                    eprime: null, 
                    paramName: "sudoku_builder_" + Date.now() + ".param", 
                    param: this.getParamString(), 
                    algorithm: "cascade",
                    numSteps: -1, 
                    explainedLits: [], 
                    appendChoices: false, 
                    choice: 0
                });

            this.setState({isWaiting: true, jobId: result.jobId})
            
        } catch (err) {
            this.setError(
                "There was a problem running Demystify on the server.");
            this.setState({ isRunning: false });
        }
    }
    
    setError(err) {
        this.setState({error: err})
    }
    render() {
        const {grid} = this.state
        return (
            <>
                <Row className="d-flex justify-content-center">
                    <Col xs={12} lg={8}>
                        <Card className="mt-3 pt-3 w-100" >
                            <Card.Body className="d-flex justify-content-between">
                                <Button disabled={this.state.isRunning} onClick={this.handleSave.bind(this)} variant="success">Save as .param file</Button>
                                <p className="mt-2" style={{textAlign: "center"}}>Fill in your desired starting grid values: </p>
                                <Button disabled={this.state.isRunning} onClick={this.handleRun.bind(this)} variant="success">Run Demystify</Button>
                            </Card.Body>
                        </Card>
                    </Col>


                </Row>
                {this.state.error && <Alert className="mt-3" variant="warning">{this.state.error}</Alert>}
                <Row className="d-flex justify-content-center">
                    <Col xs={12} sm={8} md={8} lg={5}>
                        <Card className="mt-3 pt-3">
                            <Card.Body>
                            {this.state.isWaiting ? <JobWait jobId={this.state.jobId} setInput={this.props.setInput} mode={this.state.mode}/> :
                                grid.map((row, i) =>
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