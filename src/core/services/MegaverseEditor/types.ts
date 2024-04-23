import { SoloonColor } from "../../domain/astrals/Soolon";
import { ComethDirection } from "../../domain/astrals/Cometh";
import { RequestOptions } from "../../domain/request";

export interface MegaverseRepository {
  fetch(
    path: string,
    method: string,
    options: Omit<RequestOptions, "path">
  ): Promise<Response>;
  createPolyanet(row: number, column: number): Promise<Response>;
  deletePolyanet(row: number, column: number): Promise<Response>;
  createSoloon(
    row: number,
    column: number,
    color: SoloonColor
  ): Promise<Response>;
  deleteSoloon(row: number, column: number): Promise<Response>;
  createCometh(
    row: number,
    column: number,
    direction: ComethDirection
  ): Promise<Response>;
  deleteCometh(row: number, column: number): Promise<Response>;
  getGoalMap(): Promise<Response>;
}
