import Screen, { GridSpace, Player } from "./screen";
import Cursor from "./cursor";

export default class TTT {
  public playerTurn: Player = "O";
  public grid: GridSpace[][] = [
    [" ", " ", " "],
    [" ", " ", " "],
    [" ", " ", " "],
  ];

  public cursor = new Cursor(3, 3);
  public space: GridSpace;

  constructor() {
    this.space = this.grid[this.cursor.row][this.cursor.col];

    // Initialize a 3x3 tic-tac-toe grid
    Screen.initialize(3, 3);
    Screen.setGridlines(true);
    Screen.printCommands();

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
      this.placeMove.bind(this)
    );

    Screen.addCommand("r", "reset the game", TTT.resetGame.bind(this));

    Screen.addCommand("q", "quit the game", Screen.quit);

    Screen.render();
  }

  placeMove() {
    //what is bind doing exactly in addCommand above?
    Screen.render();
    //why couldn't I do below with this.grid
    if (Screen.grid[this.cursor.row][this.cursor.col] === " ") {
      Screen.setGrid(this.cursor.row, this.cursor.col, this.playerTurn);
      if (this.playerTurn === "O") {
        this.playerTurn = "X";
      } else {
        this.playerTurn = "O";
      }
      Screen.setMessage(`Player ${this.playerTurn}'s move.`);
      Screen.render();
      const win = this.checkWin();
      if (win && win !== " ") TTT.endGame(win);
    } else {
      Screen.setMessage(
        "That space is already occupied. Choose another space."
      );
      Screen.render();
    }
  }

  checkWin(): GridSpace | "T" | false {
    // Returns 'X' if player X wins
    // Returns 'O' if player O wins
    // Returns 'T' if the game is a tie
    // Returns false if the game has not ended
    const emptyGrid = this.grid.every((row) =>
      row.every((space) => space === " ")
    );
    const fullGrid = this.grid.every((row) =>
      row.every((space) => space !== " ")
    );

    if (emptyGrid) {
      // Return false if the game has not ended
      return false;
    }
    return (
      this.horizontalCheck() ||
      this.diagonalCheck() ||
      this.verticalCheck() ||
      (fullGrid ? "T" : false)
    );
  }

  horizontalCheck(): GridSpace | false {
    let win = this.grid.find((row) =>
      row.every((space) => row[0] === space && space != " ")
    );
    if (win) {
      return win[0];
    } else {
      return false;
    }
  }

  diagonalCheck(): Player | undefined {
    if (
      this.grid[0][0] !== " " &&
      this.grid[0][0] === this.grid[1][1] &&
      this.grid[0][0] === this.grid[2][2]
    ) {
      return this.grid[0][0];
    } else if (
      this.grid[0][2] !== " " &&
      this.grid[0][2] === this.grid[1][1] &&
      this.grid[0][2] === this.grid[2][0]
    ) {
      return this.grid[0][2];
    }
  }

  verticalCheck(): GridSpace | false {
    let winningLetter;
    for (let h = 0; h < this.grid.length; h++) {
      winningLetter = this.grid[0][h];
      let count = 0;
      for (let v = 1; v < this.grid[0].length; v++) {
        if (winningLetter === this.grid[v][h] && this.grid[v][h] !== " ") {
          count++;
          if (count === 2) {
            return winningLetter;
          }
        }
      }
    }
    return false;
  }

  static playAgain() {
    Screen.setMessage(
      "Would you like to play again? Press 'r' to reset the game or 'q' to quit."
    );
    Screen.render();
  }

  static resetGame() {
    Screen.initialize(3, 3);
    Screen.printCommands();
  }

  static endGame(winner: Player | "T") {
    if (winner === "O" || winner === "X") {
      Screen.setMessage(`Player ${winner} wins!`);
    } else if (winner === "T") {
      Screen.setMessage(`Tie game!`);
    } else {
      Screen.setMessage(`Game Over`);
    }
    Screen.render();
    TTT.playAgain();
  }
}
