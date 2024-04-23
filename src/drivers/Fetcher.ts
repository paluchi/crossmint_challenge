import { FetchOptions, RequestOptions } from "../core/domain/request";

class Fetcher {
  private baseUrl: string;
  private commonHeaders: Record<string, string>;
  private retryInterval: number;
  private retryAmount: number;

  constructor(
    url: string,
    commonHeaders: Record<string, string> = {},
    retryInterval: number = 0,
    retryAmount: number = 1
  ) {
    this.baseUrl = url;
    this.commonHeaders = commonHeaders;
    this.retryInterval = retryInterval;
    this.retryAmount = retryAmount;
  }

  private async fetchWithRetry(
    url: string,
    fetchOptions: FetchOptions,
    retryCount: number = this.retryAmount
  ): Promise<Response> {
    const tryCount = this.retryAmount - retryCount + 1;
    const tryCountString = `Try: ${tryCount}/${this.retryAmount}`;
    const response = await fetch(url, fetchOptions);
    if (!response.ok && response.status === 429 && retryCount > 0) {
      console.log(
        `${tryCountString} | 429 error: ${fetchOptions.method} '${url}'. "Retrying..."`
      );

      await new Promise((resolve) => setTimeout(resolve, this.retryInterval));
      return this.fetchWithRetry(url, fetchOptions, retryCount - 1);
    } else if (!response.ok) {
      throw response;
    }

    console.log(`${tryCountString} | Success: ${fetchOptions.method} '${url}'`);
    return response;
  }

  public async fetch(
    path: string,
    method: string,
    options: Omit<RequestOptions, "path">
  ): Promise<Response> {
    const { body, headers, params } = options;

    // Build the URL and include query parameters
    const url = this.buildUrl(path, params);

    const fetchOptions: FetchOptions = {
      method,
      headers: { ...this.commonHeaders, ...headers },
      body: method !== "GET" && method !== "HEAD" ? JSON.stringify(body) : null,
    };

    return this.fetchWithRetry(url, fetchOptions);
  }

  // Helper method to build the URL with query parameters
  private buildUrl(path: string, params?: Record<string, string>): string {
    let url = `${this.baseUrl}${path}`.replace("//", "/");
    if (params && Object.keys(params).length > 0) {
      const queryString = Object.entries(params)
        .map(
          ([key, value]) =>
            `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
        )
        .join("&");
      url += (url.includes("?") ? "&" : "?") + queryString;
    }
    return url;
  }

  public get(options: RequestOptions): Promise<Response> {
    return this.fetch(options.path, "GET", options);
  }

  public post(options: RequestOptions): Promise<Response> {
    return this.fetch(options.path, "POST", options);
  }

  public put(options: RequestOptions): Promise<Response> {
    return this.fetch(options.path, "PUT", options);
  }

  public delete(options: RequestOptions): Promise<Response> {
    return this.fetch(options.path, "DELETE", options);
  }
}

export default Fetcher;
