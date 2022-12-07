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

    // Replace this with real commands
    Screen.addCommand("ArrowUp", "move cursor up");

    Screen.render();
  }

  static checkWin(grid) {
    let emptyGrid = [
      [" ", " ", " "],
      [" ", " ", " "],
      [" ", " ", " "],
    ];

    if (grid === emptyGrid) {
      // Return false if the game has not ended
      return false;
    } else {
      let horizontalWin = horizontalCheck(grid);
      if (horizontalWin) {
        //if horizontalCheck did not return a falsey,
        //return the letter in the first place in the returned array
        return horizontalWin[0][0];

        //else, check for a diagonal win
      } else {
        //if no horizontal or diagonal win, check for vertical win
      }
    // Return 'X' if player X wins
    // Return 'O' if player O wins
    // Return 'T' if the game is a tie
    }
  }

  

  static horizontalCheck(grid) {
    return grid.find((row) =>
    row.every((space) => row[0] === space && space != " ")
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
