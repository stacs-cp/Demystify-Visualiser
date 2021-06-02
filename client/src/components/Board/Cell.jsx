import React from 'react';
import { Container } from 'react-bootstrap';
import Literal from './Literal';
import SquareCol from './SquareCol';
import SquareRow from './SquareRow';

/**
 * Cell component, where a cell is itself a grid of possible values.
 * (1 x 1) grid if the value becomes or is known.
 */
class Cell extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            highlighted: this.props.highlighted,
        }
    }

    // Whether the cell grid is 1x1 i.e. the value is known.
    isSingleton() {
        const cellRows = this.props.cellContent.cellRows;

        return cellRows.length === 1 &&
                cellRows[0].cellValues.length === 1
    }

    // Get the first value of the cell grid.
    getSingletonValue() {
        const cellRows = this.props.cellContent.cellRows;
        return cellRows[0].cellValues[0].value
    }

    // Check whether the cell should be highlighted
    componentDidUpdate(prevProps) {
        if (prevProps.highlighted !== this.props.highlighted) {
            this.setState({ highlighted: this.props.highlighted });
        }
    }

    // Call the parent highlight function
    highlight(exp) {
        this.props.highlight(exp);
    }

    /* Choose the cell background, either by reading a mapping for a singleton,
        or taking the indexed cellBackground. */
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

    /* Known cells should be 3 times larger. */
    getFontSize(scale) {
        const { literalSize } = this.props;
        if (literalSize) {
            console.log((literalSize * scale).toString() + "vw")
            return (literalSize * scale).toString() + "vw"
        } else {
            return scale.toString() + "vw"
        }
    }

    /* Check if a singleton value should be hidden */
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
                    // Display a single value if it is known and not hidden.
                    (
                        (!this.isHidden(singletonValue)) &&
                        <h1 style={{ fontSize: this.getFontSize(2) }}>
                            {singletonValue}
                        </h1>
                    ) :
                    // Otherwise display a grid of possibilities
                    <Container fluid className="p-0 align-items-center">
                        {cellContent.cellRows.map((row, i) =>
                            <SquareRow key={i} style={{ fontSize: this.getFontSize(1) }}>
                                {row.cellValues.map((literal, i) =>
                                    // Possibilities are positive/negative literals.
                                    <Literal
                                        key={i}
                                        value={literal.value}
                                        status={literal.status} // positive / negative
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