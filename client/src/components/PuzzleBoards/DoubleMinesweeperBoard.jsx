import React from "react";
import Board from "../Board/Board";

/**
 * DoubleMinesweeperBoard: 
 *      For negative numbers, display 1 mine for -1, 2 mines for -2 and so on
 *      For numbers 0-(8*number of mines allowed in a box) simply display this number
 *      8*number of mines allowed in a box + 1 represents an empty square
 * 
 */
class DoubleMinesweeperBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        mines_per_box: this.props.params.mines_per_box
    };
  }

  getBackgrounds() {
    let backgrounds = {};

    //Images of mines
    backgrounds[-1] = "url(images/1mine.png)"
    backgrounds[-2] = "url(images/2mines.png)"
    backgrounds[-3] = "url(images/3mines.png)"
    backgrounds[-4] = "url(images/4mines.png)"  

    return backgrounds;
  }

  getHiddenLiterals() {
    let hiddenLiterals = [];

    //Hide numbers which represent mines
    for (let i = -1 * this.state.mines_per_box; i < 0; ++i) {
        hiddenLiterals.push(i);
    }

    //Hide the number representing the empty square
    hiddenLiterals.push(this.state.mines_per_box * 8 + 1);

    return hiddenLiterals;
  }

  render() {
    return <Board {...this.props} literalBackgrounds={this.getBackgrounds()} hiddenLiterals={this.getHiddenLiterals()} />;
  }
}

export default DoubleMinesweeperBoard;
