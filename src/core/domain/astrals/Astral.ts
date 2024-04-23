export type AstralType = "POLYANET" | "SOLOON" | "COMETH" | "SPACE";

abstract class BaseAstral {
  type: AstralType;
  row: number;
  column: number;

  constructor(type: AstralType, row: number, column: number) {
    this.type = type;
    this.row = row;
    this.column = column;
  }

  abstract displayInfo(): void;
}

export default BaseAstral;
