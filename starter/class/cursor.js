const Screen = require("./screen");
const TTT = require("./ttt");

class Cursor {
  constructor(numRows, numCols) {
    this.numRows = numRows;
    this.numCols = numCols;

    this.row = 0;
    this.col = 0;

    this.gridColor = "black";
    this.cursorColor = "yellow";
    this.textColor = "magenta"; //not working
  }

  //Use setBackgroundColor and resetBackgroundColor in cursor.js
  //to highlight the cursor's current position on the grid
  resetBackgroundColor() {
    Screen.setBackgroundColor(this.row, this.col, this.gridColor);
    Screen.render();
  }

  setBackgroundColor() {
    Screen.setBackgroundColor(this.row, this.col, this.cursorColor);
    Screen.render();
  }

  setTextColor() {
    Screen.setTextColor(this.row, this.col, this.textColor);
    Screen.render();
  }

  up() {
    this.resetBackgroundColor();

    if (this.row > 0) {
      this.row--;
    }

    this.setBackgroundColor();
  }

  down() {
    this.resetBackgroundColor();

    if (this.row < 2) {
      this.row++;
    }

    this.setBackgroundColor();
  }

  left() {
    this.resetBackgroundColor();

    if (this.col > 0) {
      this.col--;
    }

    this.setBackgroundColor();
  }

  right() {
    this.resetBackgroundColor();

    if (this.col < 2) {
      this.col++;
    }

    this.setBackgroundColor();
  }

  return(playerTurn) {
    this.resetBackgroundColor();
    this.setTextColor();
    Screen.setGrid(this.cursor.row, this.cursor.col, playerTurn);
  }
}

module.exports = Cursor;
