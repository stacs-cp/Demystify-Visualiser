# Extending the Styling Code for Further Square Grid Puzzles

I have aimed to make the puzzle styling for this project extensible, so that it can properly style many similar puzzles to the ones already implemented. 

The core component for puzzle display is the [`Board`](../client/src/components/Board/Board.jsx) component. This provides by default a basic grid/numerical display for puzzles. It will be used as the default whenever an unrecognised `.eprime` file is used as input (and the board_type param in the .prime file does not refer to a hexagonal or triangular grid).

 To create a new Puzzle style, take the following steps:

1. Create a new `NewPuzzleBoard.jsx` file in the [`../client/src/components/PuzzleBoards`](../client/src/components/PuzzleBoards) directory. 
2. Copy the code for `BinairoBoard.jsx` into this file and change the class/export name accordingly. 
3. Add a case to the switch statement in the `chooseBoard()` function of the [`PuzzleStepper.jsx`](../client/src/components/PuzzleStepper.jsx) file.
4. Read desired `param` values into state from the `this.props.params` object.
5. Write functions to generate desired `Board` props from these `param` values. 

_____

Note: Following an update to *conjure*, parameters are now represented as dictionaries mapping indices to values. The `Board` properties are based on arrays, so it is necessary to convert between representations. For example:

```javascript
grid: Object.values(this.props.params.presetvals).map((o) =>
        Object.values(o)
      )
```

____

The currently supported `Board` props are as follows:

- **literalBackgrounds:** An object mapping literal singleton values to background image values, so that known cells can have a custom image background. See [`TentsBoard.jsx`](../client/src/components/PuzzleBoards/TentsBoard.jsx) for an example.
- **cellBackgrounds:** A 2D array with each indexed value corresponding to the `backgroundImage` CSS of each cell at that index in the grid. Note that if both literalBackground and cellBackground apply to the same cell, the cellBackground will be overlayed on cellBackgrounds. See [`ThermometerBoard.jsx`](../client/src/components/PuzzleBoards/ThermometerBoard.jsx) for an example, and [`LoopyBoard.jsx`](../client/src/components/PuzzleBoards/LoopyBoard.jsx) for an example of how the overlay of cellBackgrounds and literalBackgrounds can be used together.
- **cellBorders:** A 2D array with each indexed value corresponding to the `border` css of each cell at that index in the grid. Can be used to draw arbitrary "boxes" within the borders of the grid. See [`StarBattleBoard.jsx`](../client/src/components/PuzzleBoards/StarBattleBoard.jsx) for an example. 
- **cellInnerBorders:** A 2D array with each indexed value corresponding to the `border` css of an "inner box" for each cell at that index in the grid. Can be used to draw additional "boxes" in over the borders of the grid. See [`KillerBoard.jsx`](../client/src/components/PuzzleBoards/KillerBoard.jsx) for an example. 
- **cellMargin:** An object containing the margin property for all cells in the grid. Can be used to space cells further apart. See [`FutoshikiBoard.jsx`](../client/src/components/PuzzleBoards/FutoshikiBoard.jsx) for an example. 
- **literalSize:** An float representing the size of the smallest literal values as a percentage of the viewport width (known literals are exactly 3 times larger). See [`KillerBoard.jsx`](../client/src/components/PuzzleBoard/KillerBoard.jsx) for an example. 
- **cornerNumbers**: A 2D array of objects, each with a `value` and a `style` field. For each cell this is an optional label to display, for example, a small number in the corner. See [`KillerBoard.jsx`](../client/src/components/PuzzleBoard/KillerBoard.jsx), or [`KakuroBoard.jsx`](../client/src/components/PuzzleBoards/KakuroBoard.jsx) for an example. 
- **rightLabels:** A 2D array of strings, to be displayed as an optional label between a cell and the cell directly to its right. See [`FutoshikiBoard.jsx`](../client/src/components/PuzzleBoards/FutoshikiBoard.jsx) for an example. 
- **bottomLabels:** As with right-labels, but between a cell and the cell directly below. 
- **hiddenLiterals:** An array of literal singleton values to be hidden, e.g. as a way to hide 0s. See [`KakuroBoard.jsx`](../client/src/components/PuzzleBoards/KakuroBoard.jsx) for an example. 
- **colsums:** An array representing an additional row to be displayed at the top of the grid (useful for puzzles with column sums). See [`TentsBoard.jsx`](../client/src/components/PuzzleBoards/TentsBoard.jsx) for an example. (**endcolsums** is the same but for the end of the grid.)
- **rowsums:** An array representing an additional column to be displayed at the left of the grid (useful for puzzles with row sums). See [`TentsBoard.jsx`](../client/src/components/PuzzleBoards/TentsBoard.jsx) for an example.  (**endrowsums** is the same but for the end of the grid.)
- **startrows**: A 2D array of additional rows to be displayed at the top of the grid. See [`NonogramBoard.jsx`](../client/src/components/PuzzleBoards/NonogramBoard.jsx) for an example.
- **startcols**: A 2D array of additional columns to be displayed at the left of the grid. See [`NonogramBoard.jsx`](../client/src/components/PuzzleBoards/NonogramBoard.jsx) for an example.
- **optionDict**: An object whose keys are the numbers in the essence prime specification of the puzzle, and the values are user readable strings which can be displayed in the PuzzleStepper view

____

It can be useful to pass CSS gradients in the **cellBackgrounds** property for drawing simple shapes such as circles, bars and diagonals. 

# Extending the Styling Code for Further Hexagonal Grid Puzzles

Creating a Board for a hexagon based puzzle follows a similar process to above.

The core component for puzzle display is the [`HexagonalBoard`](../client/src/components/HexagonalBoard/HexagonalBoard.jsx) component. This provides by default a basic grid/numerical display for puzzles. It will be used as the default whenever an unrecognised `.eprime` file is used as input and the board_type param in the .param file indicates that a hexagonal grid is required.

To create a new Puzzle style, take the following steps:

1. Create a new `NewPuzzleBoard.jsx` file in the [`../client/src/components/PuzzleBoards`](../client/src/components/PuzzleBoards) directory. 
2. Copy the code for `NumberHiveBoard.jsx` into this file and change the class/export name accordingly. 
3. Add a case to the switch statement in the `chooseBoard()` function of the [`PuzzleStepper.jsx`](../client/src/components/PuzzleStepper.jsx) file.
4. Read desired `param` values into state from the `this.props.params` object.
5. Write functions to generate desired `Board` props from these `param` values. 

The library used to generate these hexagons create them as an svg, so changing their display is done through CSS.

The "matrixprops" object passed to the HexagonalBoard component should have values of 2d arrays. Each cell then gets an attribute injected which maps that key, to the element in that 2d array which corresponds to that cell. This is a way of injecting attributes which makes it easier to specify cells for CSS rules.

# Extending the Styling Code for Further Triangular Grid Puzzles

Creating a board for a triangular puzzle follows the same process as creating one for a hexagonal puzzle, except the core component for puzzle display is the [`TriangularBoard`](../client/src/components/TriangularBoard/TriangularBoard.jsx) component. It will be used as the default whenever an unrecognised `.eprime` file is used as input and the board_type param in the .param file indicates that a triangular grid is required.