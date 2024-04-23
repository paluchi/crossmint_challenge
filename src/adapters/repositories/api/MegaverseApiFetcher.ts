import { ComethDirection } from "../../../core/domain/astrals/Cometh";
import { SoloonColor } from "../../../core/domain/astrals/Soolon";
import { RequestOptions } from "../../../core/domain/request";
import { MegaverseRepository } from "../../../core/services/MegaverseEditor/types";
import Fetcher from "../../../drivers/Fetcher";

class MegaverseApiFetcher extends Fetcher implements MegaverseRepository {
  private candidateId: string;

  constructor(
    candidateId: string,
    url: string,
    retryInterval: number,
    retryAmount: number
  ) {
    super(
      url,
      {
        "Content-Type": "application/json",
      },
      retryInterval,
      retryAmount
    );
    this.candidateId = candidateId;
  }

  private createBodyWithCandidateId(body: any): any {
    return { ...body, candidateId: this.candidateId };
  }

  public async createPolyanet(row: number, column: number): Promise<Response> {
    return await this.post({
      path: "/polyanets",
      body: this.createBodyWithCandidateId({ row, column }),
    });
  }

  public deletePolyanet(row: number, column: number): Promise<Response> {
    return this.delete({
      path: "/polyanets",
      body: this.createBodyWithCandidateId({ row, column }),
    });
  }

  public createSoloon(
    row: number,
    column: number,
    color: SoloonColor
  ): Promise<Response> {
    return this.post({
      path: "/soloons",
      body: this.createBodyWithCandidateId({ row, column, color }),
    });
  }

  public deleteSoloon(row: number, column: number): Promise<Response> {
    return this.delete({
      path: "/soloons",
      body: this.createBodyWithCandidateId({ row, column }),
    });
  }

  public createCometh(
    row: number,
    column: number,
    direction: ComethDirection
  ): Promise<Response> {
    return this.post({
      path: "/comeths",
      body: this.createBodyWithCandidateId({ row, column, direction }),
    });
  }

  public deleteCometh(row: number, column: number): Promise<Response> {
    return this.delete({
      path: "/comeths",
      body: this.createBodyWithCandidateId({ row, column }),
    });
  }

  public async getGoalMap(): Promise<Response> {
    return this.get({
      path: `/map/${this.candidateId}/goal`,
    });
  }
}

export default MegaverseApiFetcher;
