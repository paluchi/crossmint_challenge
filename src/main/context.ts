import MegaverseFetcher from "../adapters/repositories/api/MegaverseApiFetcher";
import MegaverseEditor from "../core/services/MegaverseEditor";
import env from "../shared/utils/env";

const fetcher = new MegaverseFetcher(
  env.CANDIDATE_ID,
  env.API_URL,
  env.RETRY_INTERVAL,
  env.RETRY_AMOUNT
);

export const megaverseEditor = new MegaverseEditor(
  fetcher,
  env.BATCH_SIZE,
  env.RETRY_INTERVAL
);
