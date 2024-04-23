import BaseAstral from "./Astral";

class Space extends BaseAstral {
  constructor(row: number, column: number) {
    super("SPACE", row, column);
  }

  displayInfo() {
    console.log(`Space at Row: ${this.row}, Column: ${this.column}`);
  }
}

export default Space;
