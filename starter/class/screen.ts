import Command from "./command";

const keypress = require("keypress");

type ColorCode = `\x1b[${string}m`;
// TODO: move to TTT
export type Player = "X" | "O";
// TODO: should be a generic parameter
export type GridSpace = Player | " ";

const colorCodes = {
  black: "\x1b[30m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
  cyan: "\x1b[36m",
  white: "\x1b[37m",
} satisfies Record<string, ColorCode>;

export type Color = keyof typeof colorCodes;

const bgColorCodes = {
  //background color
  black: "\x1b[40m",
  red: "\x1b[41m",
  green: "\x1b[42m",
  yellow: "\x1b[43m",
  blue: "\x1b[44m",
  cyan: "\x1b[46m",
  white: "\x1b[47m",
  magenta: "\x1b[45m",
} satisfies Record<Color, ColorCode>;

export default class Screen {
  static numCols = 0;
  static numRows = 0;
  static grid: GridSpace[][] = [];

  static borderChar = " ";
  static spacerCount = 1;

  static gridLines = false;

  static defaultTextColor: ColorCode = "\x1b[37m"; // White
  static defaultBackgroundColor: ColorCode = "\x1b[40m"; // Black

  static textColors: ColorCode[][] = [];
  static backgroundColors: ColorCode[][] = [];

  static message = "";

  static commands: Record<string, Command> = {};

  static initialized = false;

  static quitMessage: string;

  static initialize(numRows: number, numCols: number) {
    Screen.numRows = numRows;
    Screen.numCols = numCols;

    Screen.grid = [];
    Screen.textColors = [];
    Screen.backgroundColors = [];

    for (let row = 0; row < numRows; row++) {
      Screen.grid.push(new Array(numCols).fill(" "));
      Screen.textColors.push(new Array(numCols).fill(Screen.defaultTextColor));
      Screen.backgroundColors.push(
        new Array(numCols).fill(Screen.defaultBackgroundColor)
      );
    }

    Screen.setQuitMessage("\nThank you for playing! \nGoodbye.\n");
    const quitCmd = new Command("q", "quit the game", Screen.quit);
    Screen.commands["q"] = quitCmd;

    Screen.initialized = true;

    Screen.waitForInput();
  }

  static setGridlines(gridLines: boolean) {
    Screen.gridLines = gridLines;
    Screen.render();
  }

  static printCommands() {
    console.log("");

    for (let cmd in Screen.commands) {
      let description = Screen.commands[cmd].description;
      console.log(`  ${cmd} - ${description}`);
    }

    console.log("");
  }

  static waitForInput() {
    keypress(process.stdin);

    process.stdin.on("keypress", function (ch, key) {
      if (!key) {
        console.log("Warning: Unknown keypress");
      } else if (!Screen.commands.hasOwnProperty(key.name)) {
        Screen.render();
        console.log(`${key.name} not supported.`);
        Screen.printCommands();
      } else {
        Screen.render();
        Screen.commands[key.name].execute();
      }
    });

    process.stdin.setRawMode(true);
    process.stdin.resume();
  }

  static setGrid(row: number, col: number, char: GridSpace) {
    if (!Screen.initialized) return;

    if (char.length !== 1) {
      throw new Error("invalid grid character");
    }
    Screen.grid[row][col] = char;
  }

  static addCommand(key: string, description: string, action: () => void) {
    if (key === "q") {
      throw new Error("you cannot overwrite 'q'");
    }

    Screen.commands[key] = new Command(key, description, action);
  }

  static setQuitMessage(quitMessage: string) {
    Screen.quitMessage = quitMessage;
  }

  static quit(showMessage = true) {
    if (showMessage) console.log(Screen.quitMessage);
    process.exit(1);
  }

  static render() {
    if (!Screen.initialized) return;

    const spacer = new Array(Screen.spacerCount).fill(" ").join("");

    console.clear();

    let borderLength = Screen.numCols * (Screen.spacerCount * 2 + 1) + 2;
    if (Screen.gridLines) borderLength += Screen.numCols - 1;
    let horizontalBorder = new Array(borderLength)
      .fill(Screen.borderChar)
      .join("");

    console.log(horizontalBorder);

    for (let row = 0; row < Screen.numRows; row++) {
      const rowCopy: string[] = [...Screen.grid[row]];

      for (let col = 0; col < Screen.numCols; col++) {
        let textColor = Screen.textColors[row][col]
          ? Screen.textColors[row][col]
          : "";
        let backgroundColor = Screen.backgroundColors[row][col]
          ? Screen.backgroundColors[row][col]
          : "";
        if (!(textColor && backgroundColor)) textColor = "\x1b[0m";

        let vertLine = Screen.gridLines && col > 0 ? "|" : "";
        rowCopy[
          col
        ] = `${Screen.defaultBackgroundColor}${vertLine}\x1b[0m${textColor}${backgroundColor}${spacer}${rowCopy[col]}${spacer}\x1b[0m`;
      }

      if (Screen.gridLines && row > 0) {
        let horizontalGridLine = new Array(rowCopy.length * 4 - 1).fill("-");
        horizontalGridLine.unshift(
          `${Screen.borderChar}${Screen.defaultBackgroundColor}`
        );
        horizontalGridLine.push(`\x1b[0m${Screen.borderChar}`);
        console.log(horizontalGridLine.join(""));
      }

      // console.log(rowCopy);

      rowCopy.unshift(`${Screen.borderChar}`);
      rowCopy.push(`${Screen.borderChar}`);

      console.log(rowCopy.join(""));
    }

    console.log(horizontalBorder);

    console.log("");

    console.log(Screen.message);
  }

  static setTextColor(row: number, col: number, color: Color) {
    if (!Screen.initialized) return;

    let code = colorCodes[color];

    if (!code) {
      throw new Error("Invalid color");
    }

    Screen.textColors[row][col] = code;
  }

  static setBackgroundColor(row: number, col: number, color: Color) {
    if (!Screen.initialized) return;

    let code = bgColorCodes[color];

    if (!code) {
      throw new Error("Invalid background color");
    }

    Screen.backgroundColors[row][col] = code;
  }

  static setMessage(msg: string) {
    Screen.message = msg;
  }
}
