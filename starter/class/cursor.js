const Screen = require("./screen");
const TTT = require("./ttt");

class Cursor {
  constructor(numRows, numCols) {
    this.numRows = numRows;
    this.numCols = numCols;

    this.row = 0;
    this.col = 0;

    this.gridColor = "black";
    this.cursorColor = "cyan";
  }

  //Use setBackgroundColor and resetBackgroundColor in cursor.js
  //to highlight the cursor's current position on the grid
  resetBackgroundColor() {
    Screen.setBackgroundColor(this.row, this.col, this.gridColor);
  }

  setBackgroundColor() {
    Screen.setBackgroundColor(this.row, this.col, this.cursorColor);
  }

  setTextColor() {
    Screen.setTextColor(this.row, this.col, this.textColor);
  }

  up() {
    this.resetBackgroundColor();

    if (this.row > 0) {
      this.row--;
    }

    this.setBackgroundColor();
    Screen.render();
  }

  down() {
    this.resetBackgroundColor();

    if (this.row < 2) {
      this.row++;
    }

    this.setBackgroundColor();
    Screen.render();
  }

  left() {
    this.resetBackgroundColor();

    if (this.col > 0) {
      this.col--;
    }

    this.setBackgroundColor();
    Screen.render();
  }

  right() {
    this.resetBackgroundColor();

    if (this.col < 2) {
      this.col++;
    }

    this.setBackgroundColor();
    Screen.render();
  }

  return(playerTurn) {
    this.resetBackgroundColor();
    this.setTextColor();
    Screen.setGrid(this.cursor.row, this.cursor.col, playerTurn);
  }
}

module.exports = Cursor;
