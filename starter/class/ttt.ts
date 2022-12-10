import Screen, { GridSpace } from "./screen";
import Cursor from "./cursor";

export type Player = "X" | "O";

export default class TTT {
  screen: Screen<Player> = new Screen(3, 3);
  playerTurn: Player = "O";

  cursor = new Cursor(3, 3, this.screen);
  space: GridSpace<Player> = this.screen.grid[this.cursor.row][this.cursor.col];

  constructor() {
    // Initialize a 3x3 tic-tac-toe grid
    this.screen.setGridlines(true);
  }

  play() {
    this.screen.printCommands();

    this.screen.addCommand(
      "up",
      "move cursor up",
      this.cursor.up.bind(this.cursor)
    );
    this.screen.addCommand(
      "down",
      "move cursor down",
      this.cursor.down.bind(this.cursor)
    );
    this.screen.addCommand(
      "left",
      "move cursor left",
      this.cursor.left.bind(this.cursor)
    );
    this.screen.addCommand(
      "right",
      "move cursor right",
      this.cursor.right.bind(this.cursor)
    );

    //Create a command in ttt.js that places a move at the cursor's position
    this.screen.addCommand(
      "return",
      "place move at cursor position",
      this.placeMove.bind(this)
    );

    this.screen.addCommand("r", "reset the game", this.resetGame.bind(this));

    this.screen.render();
  }

  placeMove() {
    //what is bind doing exactly in addCommand above?
    this.screen.render();
    //why couldn't I do below with this.screen.grid
    if (this.screen.grid[this.cursor.row][this.cursor.col] === " ") {
      this.screen.setGrid(this.cursor.row, this.cursor.col, this.playerTurn);
      if (this.playerTurn === "O") {
        this.playerTurn = "X";
      } else {
        this.playerTurn = "O";
      }
      this.screen.setMessage(`Player ${this.playerTurn}'s move.`);
      this.screen.render();
      const win = this.checkWin();
      if (win && win !== " ") this.endGame(win);
    } else {
      this.screen.setMessage(
        "That space is already occupied. Choose another space."
      );
      this.screen.render();
    }
  }

  checkWin(): GridSpace<Player> | "T" | false {
    // Returns 'X' if player X wins
    // Returns 'O' if player O wins
    // Returns 'T' if the game is a tie
    // Returns false if the game has not ended
    const emptyGrid = this.screen.grid.every((row) =>
      row.every((space) => space === " ")
    );
    const fullGrid = this.screen.grid.every((row) =>
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

  horizontalCheck(): Player | undefined {
    let win = this.screen.grid.find((row) =>
      row.every((space) => row[0] === space && space != " ")
    ) as Player[] | undefined;
    return win?.[0];
  }

  diagonalCheck(): Player | undefined {
    if (
      this.screen.grid[0][0] !== " " &&
      this.screen.grid[0][0] === this.screen.grid[1][1] &&
      this.screen.grid[0][0] === this.screen.grid[2][2]
    ) {
      return this.screen.grid[0][0];
    } else if (
      this.screen.grid[0][2] !== " " &&
      this.screen.grid[0][2] === this.screen.grid[1][1] &&
      this.screen.grid[0][2] === this.screen.grid[2][0]
    ) {
      return this.screen.grid[0][2];
    }
  }

  verticalCheck(): Player | undefined {
    let winningLetter;
    for (let h = 0; h < this.screen.grid.length; h++) {
      winningLetter = this.screen.grid[0][h];
      let count = 0;
      for (let v = 1; v < this.screen.grid[0].length; v++) {
        if (winningLetter === this.screen.grid[v][h] && winningLetter !== " ") {
          count++;
          if (count === 2) {
            return winningLetter;
          }
        }
      }
    }
  }

  playAgain() {
    this.screen.setMessage(
      "Would you like to play again? Press 'r' to reset the game or 'q' to quit."
    );
    this.screen.render();
  }

  resetGame() {
    this.screen.reset();
    this.screen.printCommands();
  }

  endGame(winner: Player | "T") {
    if (winner === "O" || winner === "X") {
      this.screen.setMessage(`Player ${winner} wins!`);
    } else if (winner === "T") {
      this.screen.setMessage(`Tie game!`);
    } else {
      this.screen.setMessage(`Game Over`);
    }
    this.screen.render();
    this.playAgain();
  }
}
