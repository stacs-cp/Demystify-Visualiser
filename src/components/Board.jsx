import React from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap'
import Cell from './Cell'
class Board extends React.Component {

    render() {
        return (
            <Card className="mt-3 p-4">
                <Container fluid style={{ maxWidth: "80vh", padding: "0px" }}>
                    <Row className="p-0 m-0 flex-direction-row justify-content-center">
                        <Col xs={1} className="m-0 p-0" />
                        {this.props.rows[0].cells.map((cell, i) =>
                            <Col key={i} className="m-0 p-0">
                                <small className="text-muted">{i + 1}</small>
                            </Col>)}
                    </Row>
                    {this.props.rows.map((row, i) =>
                        
                        <Row key={i} className="p-0 m-0 align-items-center flex-direction-row justify-content-center">
                            
                            <Col xs={1} key={i} className="m-0 p-0">
                                <small className="text-muted">{i + 1}</small>
                            </Col>
                            
                            {row.cells.map((cell, i) =>
                                <Col key={i} className="m-0 p-0">
                                    <Cell highlighted={this.props.highlighted} cellContent={cell} highlight={this.props.highlight}></Cell>
                                </Col>)}
                            
                        </Row>)}


                </Container>

            </Card>
        )
    }
}

export default Board;