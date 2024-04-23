import Cometh from "./Cometh";
import Polyanet from "./Polyanet";
import Soloon from "./Soolon";
import Space from "./Space";

export type Astral = Polyanet | Soloon | Cometh | Space;

export type CellString =
  | "SPACE"
  | "POLYANET"
  | "RIGHT_COMETH"
  | "LEFT_COMETH"
  | "UP_COMETH"
  | "DOWN_COMETH"
  | "WHITE_SOLOON"
  | "BLUE_SOLOON"
  | "PURPLE_SOLOON"
  | "RED_SOLOON";

export const buildAstral = (
  astralString: CellString,
  row: number,
  column: number
): Astral => {
  switch (astralString) {
    case "SPACE":
      return new Space(row, column);
    case "RIGHT_COMETH":
      return new Cometh(row, column, "right");
    case "LEFT_COMETH":
      return new Cometh(row, column, "left");
    case "UP_COMETH":
      return new Cometh(row, column, "up");
    case "DOWN_COMETH":
      return new Cometh(row, column, "down");
    case "WHITE_SOLOON":
      return new Soloon(row, column, "white");
    case "BLUE_SOLOON":
      return new Soloon(row, column, "blue");
    case "PURPLE_SOLOON":
      return new Soloon(row, column, "purple");
    case "RED_SOLOON":
      return new Soloon(row, column, "red");
    case "POLYANET":
      return new Polyanet(row, column);
    default:
      throw new Error(`Invalid Astral String: ${astralString}`);
  }
};
