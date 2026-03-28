/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { cookies } from "next/headers";
import { cache } from "react";
import { APISchemaByMethod } from "./schema"; // your extracted types

/** Normalize HeadersInit to Record<string, string> */
function normalizeHeaders(headers?: HeadersInit): Record<string, string> {
  if (!headers) return {};
  if (headers instanceof Headers) {
    const result: Record<string, string> = {};
    headers.forEach((value, key) => (result[key] = value));
    return result;
  }
  if (Array.isArray(headers)) return Object.fromEntries(headers);
  return headers;
}

/** Cached auth token getter */
const getAuthToken = cache(async (): Promise<string | undefined> => {
  const cookieStore = await cookies();
  return cookieStore.get("auth_token")?.value;
});

/** Replace path parameters in endpoint */
function buildEndpoint(
  endpoint: string,
  pathParams?: Record<string, string | number>,
): string {
  if (!pathParams) return endpoint;
  return Object.entries(pathParams).reduce(
    (url, [key, value]) =>
      url.replace(
        new RegExp(`\\{${key}\\}`, "g"), // match {id}, {name}, etc.
        encodeURIComponent(String(value)),
      ),
    endpoint,
  );
}

/** API options type based on endpoint schema */
export type RequestOptions<T> = (T extends { request: infer R }
  ? (R extends { body: any } ? { body: R["body"] } : {}) &
      (R extends { pathParams: any } ? { pathParams: R["pathParams"] } : {}) &
      (R extends { queryParams: any }
        ? { queryParams: R["queryParams"] }
        : {}) & {
        headers?: R extends { headers: any }
          ? R["headers"]
          : Record<string, string>;
      }
  : { headers?: HeadersInit }) & { headers?: HeadersInit };

export type APIOptions<T> = Omit<RequestInit, "body" | "headers" | "method"> &
  RequestOptions<T>;

/** API Client */
export class APIClient<Schema extends APISchemaByMethod> {
  constructor(public baseURL: string) {}

  /** Build URL with query params */
  private buildURL(
    endpoint: string,
    params?: Record<string, string | number | boolean | null | undefined>,
  ): string {
    const url = new URL(endpoint, this.baseURL);
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null)
          url.searchParams.append(key, String(value));
      });
    }
    return url.toString();
  }

  /** Request interceptor */
  private async beforeRequest(
    url: string,
    options: RequestInit & { headers?: HeadersInit },
  ) {
    const token = await getAuthToken();
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...normalizeHeaders(options.headers),
    };
    if (token) headers["Authorization"] = `Bearer ${token}`;
    return { ...options, headers };
  }

  /** Response interceptor */
  private async afterResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const error = await response
        .json()
        .catch(() => ({ message: `HTTP ${response.status}` }));
      if (response.status === 401)
        console.error("Unauthorized - token expired?");
      throw new Error(error.message ?? "Request failed");
    }
    return response.json() as Promise<T>;
  }

  /** Unified request method */
  async request<
    MethodName extends keyof Schema & string,
    Endpoint extends keyof Schema[MethodName] & string,
  >(
    method: MethodName,
    endpoint: Endpoint,
    options?: APIOptions<Schema[MethodName][Endpoint]>,
  ): Promise<
    Schema[MethodName][Endpoint] extends { response: infer R } ? R : never
  > {
    const opts = options ?? {};
    const body = (opts as any).body;
    const pathParams = (opts as any).pathParams;
    const queryParams = (opts as any).queryParams;
    const headers = (opts as any).headers;

    const url = buildEndpoint(
      endpoint,
      pathParams as Record<string, string | number>,
    );
    const fullURL = this.buildURL(
      url,
      queryParams as Record<
        string,
        string | number | boolean | null | undefined
      >,
    );

    const fetchOptions: RequestInit = {
      method: method.toUpperCase() as string,
      body: body ? JSON.stringify(body) : undefined,
      headers,
    };

    const finalOptions = await this.beforeRequest(fullURL, fetchOptions);
    const response = await fetch(fullURL, finalOptions);

    // Narrow the type safely
    type EndpointSchema = Schema[MethodName][Endpoint];
    type ResponseType = EndpointSchema extends { response: infer R }
      ? R
      : never;

    return this.afterResponse<ResponseType>(response);
  }

  /** Shortcut methods */
  get<E extends keyof Schema["GET"] & string>(
    endpoint: E,
    options?: APIOptions<Schema["GET"][E]>,
  ) {
    return this.request("GET", endpoint, options);
  }

  post<E extends keyof Schema["POST"] & string>(
    endpoint: E,
    options?: APIOptions<Schema["POST"][E]>,
  ) {
    return this.request("POST", endpoint, options);
  }

  put<E extends keyof Schema["PUT"] & string>(
    endpoint: E,
    options?: APIOptions<Schema["PUT"][E]>,
  ) {
    return this.request("PUT", endpoint, options);
  }

  patch<E extends keyof Schema["PATCH"] & string>(
    endpoint: E,
    options?: APIOptions<Schema["PATCH"][E]>,
  ) {
    return this.request("PATCH", endpoint, options);
  }

  delete<E extends keyof Schema["DELETE"] & string>(
    endpoint: E,
    options?: APIOptions<Schema["DELETE"][E]>,
  ) {
    return this.request("DELETE", endpoint, options);
  }
}

/** Singleton instance */
export const api = new APIClient<APISchemaByMethod>(process.env.API_URL!);
