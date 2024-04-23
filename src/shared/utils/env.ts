import * as dotenv from "dotenv";

// Configure dotenv to load the .env file
dotenv.config();

const env = {
  API_URL: process.env.API_URL || "",
  RETRY_AMOUNT: parseInt(process.env.RETRY_AMOUNT || "5"),
  RETRY_INTERVAL: parseInt(process.env.RETRY_INTERVAL || "1000"),
  BATCH_SIZE: parseInt(process.env.BATCH_SIZE || "3"),
  BATCH_DELAY: parseInt(process.env.BATCH_DELAY || "3000"),
  CANDIDATE_ID: process.env.CANDIDATE_ID || "",
};

// If is undefined, empty string, or NaN log a warning
Object.entries(env).forEach(([key, value]) => {
  if (!value && value !== 0) {
    // Check for `0` as it is a falsy value but valid for numeric environments
    console.warn(`Warning: Key '${key}' has value '${value}'`);
  }
});

export default env;
