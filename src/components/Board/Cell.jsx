import React from 'react';
import { Container, Row } from 'react-bootstrap';
import Literal from './Literal';
import SquareCol from './SquareCol';
import SquareRow from './SquareRow';

class Cell extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            highlighted: this.props.highlighted,
        }
    }

    isSingleton() {
        const cellRows = this.props.cellContent.cellRows;

        return cellRows.length === 1 &&
                cellRows[0].cellValues.length === 1
    }

    getSingletonValue() {
        const cellRows = this.props.cellContent.cellRows;
        return cellRows[0].cellValues[0].value
    }


    componentDidUpdate(prevProps) {
        if (prevProps.highlighted !== this.props.highlighted) {
            this.setState({ highlighted: this.props.highlighted });
        }
    }

    highlight(exp) {
        this.props.highlight(exp);
    }

    chooseBackground() {
        const { literalBackgrounds, cellBackground } = this.props;
        const isSingleton = this.isSingleton();
        const singletonValue = this.getSingletonValue();

        if (literalBackgrounds && isSingleton) {
            return literalBackgrounds[singletonValue.toString()]
        } else if (cellBackground) {
            return cellBackground;
        } else {
            return null;
        }
    }

    getFontSize(scale) {
        const { literalSize } = this.props;
        if (literalSize) {
            console.log((literalSize * scale).toString() + "vw")
            return (literalSize * scale).toString() + "vw"
        } else {
            return scale.toString() + "vw"
        }
    }

    isHidden(value) {
        const { hiddenLiterals } = this.props;
        return hiddenLiterals && hiddenLiterals.includes(value);
    }

    render() {
        const {
            cellContent,
            cellBorders,
            cellInnerBorders,
            cellMargin,
            cornerNumber,
            rightLabel,
            bottomLabel,
            literalSize } = this.props;

        const {highlighted} = this.state;

        const isSingleton = this.isSingleton();
        const singletonValue = this.getSingletonValue();

        return (
            <SquareCol
                background={this.chooseBackground()}
                borders={cellBorders}
                innerBorders={cellInnerBorders}
                margin={cellMargin}
                size={literalSize}
                cornerNumber={cornerNumber}
                rightLabel={rightLabel}
                bottomLabel={bottomLabel}>

                {isSingleton ?
                    (
                        (!this.isHidden(singletonValue)) &&
                        <h1 style={{ fontSize: this.getFontSize(3) }}>
                            {singletonValue}
                        </h1>
                    ) :
                    <Container fluid className="p-0 align-items-center">
                        {cellContent.cellRows.map((row, i) =>
                            <SquareRow key={i} style={{ fontSize: this.getFontSize(1) }}>
                                {row.cellValues.map((literal, i) =>
                                    <Literal
                                        key={i}
                                        value={literal.value}
                                        status={literal.status}
                                        highlighted={literal.explanations.includes(highlighted.toString())}
                                        highlightExplanation={() => this.highlight(literal.explanations)}
                                    />
                                )}
                            </SquareRow>
                        )}
                    </Container>
                }
            </SquareCol>
        )
    }
}

export default Cell;