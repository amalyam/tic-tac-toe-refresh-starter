import Screen, { Color, GridSpace } from "./screen";

export default class Cursor {
  public row = 0;
  public col = 0;

  public gridColor: Color = "black";
  public cursorColor: Color = "yellow";
  public textColor: Color = "magenta"; //not working

  constructor(public numRows: number, public numCols: number) {
    this.numRows = numRows;
    this.numCols = numCols;
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

  return(playerTurn: GridSpace) {
    this.resetBackgroundColor();
    this.setTextColor();
    Screen.setGrid(this.row, this.col, playerTurn);
  }
}
