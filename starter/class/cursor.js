const Screen = require("./screen");

class Cursor {
  constructor(numRows, numCols) {
    this.numRows = numRows;
    this.numCols = numCols;

    this.row = 0;
    this.col = 0;

    this.gridColor = "black";
    this.cursorColor = "yellow";
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
    this.setBackgroundColor();

    if (this.col > 0) {
      this.col--;
    }

    this.resetBackgroundColor();
  }

  right() {
    if (this.col < 2) {
      this.col++;
    }
    this.resetBackgroundColor();
    this.setBackgroundColor();
  }
}

module.exports = Cursor;
