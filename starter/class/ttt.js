const Screen = require("./screen");
const Cursor = require("./cursor");

class TTT {
  constructor() {
    this.playerTurn = "O";

    this.grid = [
      [" ", " ", " "],
      [" ", " ", " "],
      [" ", " ", " "],
    ];

    this.cursor = new Cursor(3, 3);

    // Initialize a 3x3 tic-tac-toe grid
    Screen.initialize(3, 3);
    Screen.setGridlines(true);
    this.cursor.setBackgroundColor(); //needed?

    Screen.addCommand("up", "move cursor up", this.cursor.up.bind(this.cursor));
    Screen.addCommand(
      "down",
      "move cursor down",
      this.cursor.down.bind(this.cursor)
    );
    Screen.addCommand(
      "left",
      "move cursor left",
      this.cursor.left.bind(this.cursor)
    );
    Screen.addCommand(
      "right",
      "move cursor right",
      this.cursor.right.bind(this.cursor)
    );

    //Create a command in ttt.js that places a move at the cursor's position
    Screen.addCommand(
      "return",
      "place move at cursor position",
      TTT.placeMove.bind(this)
    );

    Screen.render();
  }

  static placeMove() {
    //what is bind doing exactly in addCommand above?
    Screen.render();
    Screen.setGrid(this.cursor.row, this.cursor.col, this.playerTurn);
    if (this.playerTurn === "O") {
      this.playerTurn = "X";
    } else {
      this.playerTurn = "O";
    }

    Screen.render();
    TTT.checkWin(this.grid);
  }

  static checkWin(grid) {
    // Returns 'X' if player X wins
    // Returns 'O' if player O wins
    // Returns 'T' if the game is a tie
    // Returns false if the game has not ended
    const emptyGrid = grid.every((row) => row.every((space) => space === " "));
    const fullGrid = grid.every((row) => row.every((space) => space !== " "));

    if (emptyGrid) {
      // Return false if the game has not ended
      return false;
    } else if (TTT.horizontalCheck(grid)) {
      //horizontal win
      return TTT.horizontalCheck(grid);
    } else if (TTT.diagonalCheck(grid)) {
      //diagonal win
      return TTT.diagonalCheck(grid);
    } else if (TTT.verticalCheck(grid)) {
      //vertical win
      return TTT.verticalCheck(grid);
    } else if (fullGrid === true) {
      //tie game
      return "T";
    } else {
      // Return false if the game has not ended
      return false;
    }
  }

  static horizontalCheck(grid) {
    let win = grid.find((row) =>
      row.every((space) => row[0] === space && space != " ")
    );
    if (win) {
      return win[0];
    } else {
      return false;
    }
  }

  static diagonalCheck(grid) {
    if (grid[0][0] === grid[1][1] && grid[0][0] === grid[2][2]) {
      return grid[0][0];
    } else if (grid[0][2] === grid[1][1] && grid[0][2] === grid[2][0]) {
      return grid[0][2];
    }
  }

  static verticalCheck(grid) {
    let winningLetter;
    for (let h = 0; h < grid.length; h++) {
      winningLetter = grid[0][h];
      let count = 0;
      for (let v = 1; v < grid[0].length; v++) {
        if (winningLetter === grid[v][h] && grid[v][h] !== " ") {
          count++;
          if (count === 2) {
            return winningLetter;
          }
        }
      }
    }
    return false;
  }

  static endGame(winner) {
    if (winner === "O" || winner === "X") {
      Screen.setMessage(`Player ${winner} wins!`);
    } else if (winner === "T") {
      Screen.setMessage(`Tie game!`);
    } else {
      Screen.setMessage(`Game Over`);
    }
    Screen.render();
    Screen.quit();
  }
}

module.exports = TTT;
