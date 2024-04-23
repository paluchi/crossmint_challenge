import { Astral, CellString, buildAstral } from "../../domain/astrals";
import Cometh from "../../domain/astrals/Cometh";
import Polyanet from "../../domain/astrals/Polyanet";
import Soloon from "../../domain/astrals/Soolon";
import Space from "../../domain/astrals/Space";
import { MegaverseRepository } from "./types";
// import executeInBatches from "../../utils/executeInBatches";

class MegaverseEditor {
  private megaverseRepository: MegaverseRepository;
  public batchSize: number;
  public RetryInterval: number;

  constructor(
    megaverseRepository: MegaverseRepository,
    batchSize: number,
    RetryInterval: number
  ) {
    this.megaverseRepository = megaverseRepository;
    this.batchSize = batchSize;
    this.RetryInterval = RetryInterval;
  }

  // Function to retrieve and solve the goal map
  async solveNextGoalMap(): Promise<void> {
    const goalMapResponse = await this.megaverseRepository.getGoalMap();
    const goalData: CellString[][] = (await goalMapResponse.json()).goal;

    // Map each row and then each item in the row to the corresponding class
    const goalMap = this.buildAstralGoalMap(goalData).filter((row) =>
      row.some((astral) => !(astral instanceof Space))
    );

    // Flatten the goal map and filter out Space astral
    const flattenedGoalMap = goalMap
      .flatMap((row) => row.map((astral) => astral))
      .filter((astral) => !(astral instanceof Space));

    for (let i = 0; i < flattenedGoalMap.length; i++) {
      const astral = flattenedGoalMap[i];
      await this.createAstral(astral);
    }

    // PLEASE READ README.md -> notes to know why the above is commented

    // Execute the createAstral function in batches
    // await executeInBatches(
    //   flattenedGoalMap.map((astral) => () => this.createAstral(astral)),
    //   this.batchSize,
    //   this.RetryInterval,
    // );
  }

  buildAstralGoalMap(goalData: CellString[][]): Astral[][] {
    const goalMap: Astral[][] = goalData.map((row, rowIndex) =>
      row.map((cellType, columnIndex) =>
        buildAstral(cellType, rowIndex, columnIndex)
      )
    );
    return goalMap;
  }

  // Generalized create method
  async createAstral(astral: Astral): Promise<Response> {
    switch (true) {
      case astral instanceof Polyanet:
        return this.megaverseRepository.createPolyanet(
          astral.row,
          astral.column
        );
      case astral instanceof Soloon:
        return this.megaverseRepository.createSoloon(
          astral.row,
          astral.column,
          astral.color
        );
      case astral instanceof Cometh:
        return this.megaverseRepository.createCometh(
          astral.row,
          astral.column,
          astral.direction
        );
      case astral instanceof Space:
        // Skip
        return undefined as any;
      default:
        throw new Error(`Unsupported astral: ${(astral as any).type}`);
    }
  }

  // Generalized delete method
  async deleteAstral(astral: Astral): Promise<Response> {
    switch (true) {
      case astral instanceof Polyanet:
        return this.megaverseRepository.deletePolyanet(
          astral.row,
          astral.column
        );
      case astral instanceof Soloon:
        return this.megaverseRepository.deleteSoloon(astral.row, astral.column);
      case astral instanceof Cometh:
        return this.megaverseRepository.deleteCometh(astral.row, astral.column);
      case astral instanceof Space:
        // Skip
        return undefined as any;
      default:
        throw new Error(`Unsupported astral: ${(astral as any).type}`);
    }
  }
}

export default MegaverseEditor;
