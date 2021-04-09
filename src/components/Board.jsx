import React from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap'
import Cell from './Cell';
import SquareCol from './SquareCol';
class Board extends React.Component {

    render() {
        return (
            <Card className="mt-3 p-4">
                <Container fluid style={{ maxWidth: "80vh", minWidth: "400px", padding: "0px" }}>
                    <Row className="p-0 m-0 flex-direction-row justify-content-center">

                        <Col xs={1} className="m-0 p-0" />
                        {this.props.colsums && <Col className="m-0 p-0" />}
                        {this.props.rows[0].cells.map((cell, i) =>
                            <Col key={i} className="m-0 p-0">
                                <small className="text-muted">{i + 1}</small>
                            </Col>)}
                    </Row>

                    {this.props.rowsums &&
                        <Row className="p-0 m-0 align-items-center flex-direction-row justify-content-center">
                            <Col xs={1} className="m-0 p-0">

                            </Col>
                            <SquareCol />
                            {this.props.rowsums.map((sum, j) =>
                                <SquareCol>
                                        <h3 style={{ fontSize: "3vw", color: "gray" }}>{sum}</h3>
                                </SquareCol>)}
                        </Row>}

                    {this.props.rows.map((row, i) =>

                        <Row key={i} className="p-0 m-0 align-items-center flex-direction-row justify-content-center">

                            <Col xs={1} key={i} className="m-0 p-0">
                                <small className="text-muted">{i + 1}</small>
                            </Col>

                            {this.props.colsums &&
                                <SquareCol>
                                        <h3 style={{ fontSize: "3vw", color: "gray" }}>{this.props.colsums[i]}</h3>
                                </SquareCol>}
                            {row.cells.map((cell, j) =>
                                <Col key={j} className="m-0 p-0">
                                    <Cell row={i} column={j} highlighted={this.props.highlighted} cellContent={cell} highlight={this.props.highlight}></Cell>
                                </Col>)}

                        </Row>)}


                </Container>

            </Card>
        )
    }
}

export default Board;