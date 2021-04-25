# Demystify-Visualiser

This is a react-based tool that provides a visualisation of the human understandable solutions to "pen and paper" puzzles produced by the "Demystify" solver. 

## How to Run

1. Ensure you have [Node >= 10.16 and npm >= 5.6](https://nodejs.org/en/) installed.
2. Clone the repository.
3. Navigate to the `demystify-visualiser` folder. 
4. Run `npm install`
5. Run `npm start`

## Basic Usage

Currently the visualiser takes a JSON input file produced by running Demystify with the ``--json`` option (the value of the option is the name of the json file to be produced) e.g.

```bash
python3 demystify --eprime ./eprime/nfutoshiki.eprime --eprimeparam ./eprime/futoshiki/nfutoshiki-1.param --json futoshiki
```

Such an output can then be selected and viewed. Alternatively preloaded examples are available for demonstration purposes. 

## Extending the Styling Code for Further Puzzles

I have aimed to make this project extensible, so that it can properly style many similar puzzles to the ones already implemented. 

The core component for puzzle display is the [`Board`](./components/Board/Board.jsx) component. This provides by default a basic grid/numerical display for puzzles (as can be seen for the unstyled Binairo puzzle). To create a new Puzzle style, take the following steps:

1. Create a new `NewPuzzleBoard.jsx` file in the [`./components/PuzzleBoards`](./components/PuzzleBoards) directory. 
2. Copy the code for `BinairoBoard.jsx` into this file and change the class name accordingly. 
3. Add a case to the switch statement in the `chooseBoard()` function of the [`PuzzleStepper.jsx`](./compoents/PuzzleStepper.jsx) file.
4. Read desired `param` values into state from the `this.props.params` object.
5. Write functions to generate desired `Board` props from these `param` values. 

The currently supported `Board` props are as follows:

- **literalBackgrounds:** An object mapping literal singleton values to background image values, so that known cells can have a custom image background. See [`TentsBoard.jsx`](./components/PuzzleBoards/TentsBoard.jsx) for an example.
- **cellBorders:** A 2D array with each indexed value corresponding to the `border` css of each cell at that index in the grid. Can be used to draw arbitrary "boxes" within the borders of the grid. See [`StarBattleBoard.jsx`](./components/PuzzleBoards/StarBattleBoard.jsx) for an example. 
- **cellInnerBorders:** A 2D array with each indexed value corresponding to the `border` css of an "inner box" for each cell at that index in the grid. Can be used to draw additional "boxes" in over the borders of the grid. See [`KillerBoard.jsx`](./components/PuzzleBoards/KillerBoard.jsx) for an example. 
- **cellMargin:** An object containing the margin property for all cells in the grid. Can be used to space cells further apart. See [`FutoshikiBoard.jsx`](./components/PuzzleBoards/FutoshikiBoard.jsx) for an example. 
- **literalSize:** An float representing the size of the smallest literal values as a percentage of the viewport width (known literals are exactly 3 times larger). See [`KillerBoard.jsx`](./components/PuzzleBoard/KillerBoard.jsx) for an example. 
- **cornerNumbers**: A 2D array of objects, each with a `value` and a `style` field. For each cell this is an optional label to display, for example, a small number in the corner. See [`KillerBoard.jsx`](./components/PuzzleBoard/KillerBoard.jsx), or [`KakuroBoard.jsx`](./components/PuzzleBoards/KakuroBoard.jsx) for an example. 
- **rightLabels:** A 2D array of strings, to be displayed as an optional label between a cell and the cell directly to its right. See [`FutoshikiBoard.jsx`](./components/PuzzleBoards/FutoshikiBoard.jsx) for an example. 
- **bottomLabels:** As with right-labels, but between a cell and the cell directly below. 
- **hiddenLiterals:** An array of literal singleton values to be hidden, e.g. as a way to hide 0s. See [`KakuroBoard.jsx`](./components/PuzzleBoards/KakuroBoard.jsx) for an example. 
- **colsums:** An array representing an additional row to be displayed at the top of the grid (useful for puzzles with column sums). See [`TentsBoard.jsx`](./components/PuzzleBoards/TentsBoard.jsx) for an example.
- **rowsums:** An array representing an additional column to be displayed at the left of the grid (useful for puzzles with row sums). See [`TentsBoard.jsx`](./components/PuzzleBoards/TentsBoard.jsx) for an example.

