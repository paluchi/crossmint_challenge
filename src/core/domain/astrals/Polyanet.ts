import BaseAstral from "./Astral";

class Polyanet extends BaseAstral {
  constructor(row: number, column: number) {
    super("POLYANET", row, column);
  }

  displayInfo() {
    console.log(`Polyanet at Row: ${this.row}, Column: ${this.column}`);
  }
}

export default Polyanet;
