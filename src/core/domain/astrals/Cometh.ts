import BaseAstral from "./Astral";

export type ComethDirection = "up" | "down" | "left" | "right";

class Cometh extends BaseAstral {
  direction: ComethDirection;

  constructor(row: number, column: number, direction: ComethDirection) {
    super("COMETH", row, column);
    this.direction = direction;
  }

  displayInfo() {
    console.log(
      `Cometh moving ${this.direction} at Row: ${this.row}, Column: ${this.column}`
    );
  }
}

export default Cometh;
