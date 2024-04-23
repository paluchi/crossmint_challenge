async function executeInBatches<Result>(
  callbacks: (() => Promise<Result>)[],
  batchSize: number,
  delay: number
): Promise<Result[]> {
  const results: Result[] = [];

  for (let i = 0; i < callbacks.length; i += batchSize) {
    const batch = callbacks.slice(i, i + batchSize);
    const batchResults = await Promise.all(batch.map((callback) => callback()));
    results.push(...batchResults);
    if (i + batchSize < callbacks.length) {
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  return results;
}

export default executeInBatches;
