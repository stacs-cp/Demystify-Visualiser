import React from "react";
import Board from "../Board/Board";

class LoopyBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      x: this.props.params.n,
      y: this.props.params.m
    };
  }

  getLiteralBackgrounds() {
    let backgrounds = {
      "-1": "radial-gradient(black 15%, #ffffff 16%)",
      1: "linear-gradient(black, black)",
    };

    return backgrounds;
  }

  getCellBorders() {
    let borders = [];
    const { x, y } = this.state;
    for (let i = 0; i < x*2+1; i++) {
      borders[i] = [];
      for (let j = 0; j < y*2+1; j++) {
        borders[i].push({
          border: "none"
        });
      }
    }

    return borders
    
  }

  getCellBackgrounds() {
    let backgrounds = [];
    const { x, y } = this.state;
    for (let i = 0; i < x*2+1; i++) {
      backgrounds[i] = [];
      for (let j = 0; j < y*2+1; j++) {
        
        if (j % 2 == 1 && i % 2 === 0) {
          backgrounds[i].push("linear-gradient(white 42%, transparent 43%, transparent 55%, white 56%)");
        } else if (j % 2 == 0 && i % 2 === 1) {
          backgrounds[i].push("linear-gradient(to right, white 42%, transparent 43%, transparent 55%, white 56%)");
        } else {
          backgrounds[i].push("none");
        }
        
        
      }
    }

    return backgrounds
    
  }

  render() {
    return <Board {...this.props} 
              cellBorders={this.getCellBorders()}
              cellBackgrounds={this.getCellBackgrounds()}
              literalBackgrounds={this.getLiteralBackgrounds()} 
              hiddenLiterals={[-1, 1, 0]}/>;
  }
}

export default LoopyBoard;
