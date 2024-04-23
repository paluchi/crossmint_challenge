export interface RequestOptions {
  path: string;
  params?: Record<string, string>;
  body?: any;
  headers?: Record<string, string>;
}

export interface FetchOptions {
  method: string;
  headers: Record<string, string>;
  body?: string | null;
}
