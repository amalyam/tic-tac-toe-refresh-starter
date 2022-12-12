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

    Screen.addCommand("r", "reset the game", TTT.resetGame.bind(this));

    Screen.addCommand("q", "quit the game", Screen.quit);

    Screen.render();

    console.log(
      `Welcome to Tic-Tac-Toe. The players are X and O. first player is ${this.playerTurn}.`
    );
    Screen.printCommands();
  }

  setPlayerTurn(turn) {
    this.playerTurn = turn;
    Screen.setMessage(`Player ${this.playerTurn}'s move.`);
  }
  static placeMove() {
    //what is bind doing exactly in addCommand above?
    Screen.render();
    //why couldn't I do below with this.grid
    if (Screen.grid[this.cursor.row][this.cursor.col] === " ") {
      Screen.setGrid(this.cursor.row, this.cursor.col, this.playerTurn);
      if (this.playerTurn === "O") {
        this.setPlayerTurn("X");
      } else {
        this.setPlayerTurn("O");
      }

      Screen.render();
      TTT.endGame(TTT.checkWin(Screen.grid));
    } else {
      Screen.setMessage(
        "That space is already occupied. Choose another space."
      );
      Screen.render();
    }
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
    }
    if (fullGrid) {
      //tie game
      return "T";
    }
    return (
      TTT.horizontalCheck(grid) ||
      TTT.diagonalCheck(grid) ||
      TTT.verticalCheck(grid)
    );
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
    if (
      grid[0][0] !== " " &&
      grid[0][0] === grid[1][1] &&
      grid[0][0] === grid[2][2]
    ) {
      return grid[0][0];
    } else if (
      grid[0][2] !== " " &&
      grid[0][2] === grid[1][1] &&
      grid[0][2] === grid[2][0]
    ) {
      return grid[0][2];
    }
    return false;
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

  static resetGame() {
    Screen.initialize(3, 3);
    this.setPlayerTurn("O");
    Screen.render();
  }

  static endGame(winner) {
    let playAgain =
      "Would you like to play again? Press 'r' to reset the game or 'q' to quit.";
    if (winner) {
      if (winner === "O" || winner === "X") {
        Screen.setMessage(`Player ${winner} wins!\n${playAgain}`);
      } else if (winner === "T") {
        Screen.setMessage(`Tie game!\n${playAgain}`);
      } else {
        Screen.setMessage(`Game Over\n${playAgain}`);
      }
      Screen.render();
    }
  }
}

module.exports = TTT;
