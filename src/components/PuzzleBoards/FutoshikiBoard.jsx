import React from 'react';
import Board from '../Board/Board';

class FutoshikiBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lessThans: this.props.params.lt,
            size: this.props.params.SIZE
        }
    }

    getRightLabels() {
        let rightLabels = []
        const {size, lessThans} = this.state;
        for(let i = 0; i < size; i++) {
            rightLabels[i] = []
            for(let j = 0; j < size; j++) {
                rightLabels[i].push(
                   null
                )
            }
        }

        for(let lessThan of lessThans) {
            const i1 = lessThan[0];
            const i2 = lessThan[1];
            const j1 = lessThan[2];
            const j2 = lessThan[3];

            if(i1 == j1) {
                if(i2 < j2) {
                    rightLabels[i1-1][i2-1] = "<"
                } else {
                    rightLabels[j1-1][j2-1] = ">"
                }
            }
        }
        console.log(rightLabels);
        return rightLabels;
    }

    getBottomLabels() {
        let bottomLabels = []
        const {size, lessThans} = this.state;
        for(let i = 0; i < size; i++) {
            bottomLabels[i] = []
            for(let j = 0; j < size; j++) {
                bottomLabels[i].push(
                   null
                )
            }
        }

        for(let lessThan of lessThans) {
            const i1 = lessThan[0];
            const i2 = lessThan[1];
            const j1 = lessThan[2];
            const j2 = lessThan[3];

            if(i2 == j2) {
                if(i1 < j1) {
                    bottomLabels[i1-1][i2-1] = "\u2227"
                } else {
                    bottomLabels[j1-1][j2-1] = "\u2228"
                }
            }
        }

        return bottomLabels;
    }

    render() {
        return (<Board
                highlight={this.props.highlight} 
                key={this.props.key} 
                highlighted={this.props.highlighted} 
                rows={this.props.rows}
                cellMargin={{margin: "20px"}}
                rightLabels={this.getRightLabels()}
                bottomLabels={this.getBottomLabels()}
                />)
    }
}

export default FutoshikiBoard;