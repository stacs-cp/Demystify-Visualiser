import React from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap'
import Cell from './Cell'
class Board extends React.Component {
    
    render() {
        return (
            <Card className="mt-3 p-4">
                <Container fluid style={{maxWidth: "80vh", border: "solid", padding: "0px"}}>
                    {this.props.rows.map((row) =>
                    <Row className="p-0 m-0 flex-direction-row justify-content-center">
                        {row.cells.map((cell) =>
                        <Col className="m-0 p-0">
                            <Cell highlighted={this.props.highlighted} cellContent={cell}></Cell>
                        </Col>)}
                    </Row>)}
                    

                </Container>

            </Card>
        )
    }
}

export default Board;