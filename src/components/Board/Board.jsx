import React from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap'
import Cell from './Cell';
import SquareCol from './SquareCol';
import SquareRow from './SquareRow';
class Board extends React.Component {

    getIndex(arr, row, column) {
        return arr ? arr[row][column] : null;
    }

    render() {
        const {
            // Required Props 
            highlighted, 
            highlight,
            rows,

            //Optional Props, for custom styling
            literalBackgrounds,
            cellBorders,
            cellInnerBorders,
            cellBackgrounds,
            cellMargin,
            literalSize,
            cornerNumbers,
            rightLabels,
            bottomLabels,
            hiddenLiterals,
            rowsums,
            colsums,
            
        } = this.props;
        
        return (
            <Card className="mt-3 p-4">
                <Container fluid style={{ minWidth: "400px", padding: "0px"}}>
                
                    <SquareRow>
                        <Col xs={1} className="m-0 p-0" />
                        {rowsums && <Col className="m-0 p-0" />}
                        {rows[0].cells.map((cell, i) =>
                            <Col key={i} className="m-0 p-0">
                                <small className="text-muted">{i + 1}</small>
                            </Col>)}
                    </SquareRow>

                    {colsums &&
                        <SquareRow>
                            <Col xs={1} className="m-0 p-0" />
                            <SquareCol />
                            {colsums.map((sum, j) =>
                                <SquareCol>
                                    <h3 style={{ fontSize: "3vw", color: "gray" }}>
                                        {sum}
                                    </h3>
                                </SquareCol>)}
                        </SquareRow>}

                    {rows.map((row, i) =>

                        <SquareRow key={i}>
                            <Col xs={1} key={i} className="m-0 p-0">
                                <small className="text-muted">{i + 1}</small>
                            </Col>

                            {rowsums &&
                                <SquareCol>
                                    <h3 style={{ fontSize: "3vw", color: "gray" }}>
                                        {rowsums[i]}
                                    </h3>
                                </SquareCol>}
                            {row.cells.map((cell, j) =>
                                    <Cell 
                                        row={i} 
                                        column={j} 
                                        highlighted={highlighted} 
                                        cellContent={cell} 
                                        highlight={highlight}
                                        
                                        cellBorders={this.getIndex(cellBorders, i, j)}
                                        cellInnerBorders={this.getIndex(cellInnerBorders, i, j)}
                                        cellBackground={this.getIndex(cellBackgrounds, i, j)}
                                        cornerNumber={this.getIndex(cornerNumbers, i, j)}
                                        rightLabel={this.getIndex(rightLabels, i, j)}
                                        bottomLabel={this.getIndex(bottomLabels, i, j)}
                                        cellMargin={cellMargin}
                                        literalBackgrounds={literalBackgrounds}
                                        literalSize={literalSize}
                                        hiddenLiterals={hiddenLiterals}
                                        />      
                                )}
                        </SquareRow>)}
                </Container>
            </Card>
        )
    }
}

export default Board;