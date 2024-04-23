import BaseAstral from "./Astral";

export type SoloonColor = "white" | "purple" | "red" | "green" | "blue";

class Soloon extends BaseAstral {
  color: SoloonColor;

  constructor(row: number, column: number, color: SoloonColor) {
    super("SOLOON", row, column);
    this.color = color;
  }

  displayInfo() {
    console.log(
      `Soloon of Color: ${this.color} at Row: ${this.row}, Column: ${this.column}`
    );
  }
}

export default Soloon;
