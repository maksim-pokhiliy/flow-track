"use client";

type FetchOptions = Omit<RequestInit, "headers"> & {
  headers?: Record<string, string>;
};

type ApiResponse<T> = {
  data?: T;
  error?: { code: string; message: string; details?: unknown };
  invalidate?: string[];
};

export async function apiClient<T>(input: string, init?: FetchOptions): Promise<ApiResponse<T>> {
  const res = await fetch(input, {
    ...init,
    headers: { "Content-Type": "application/json", ...(init?.headers ?? {}) },
  });

  const json = (await res.json().catch(() => ({}))) as ApiResponse<T>;

  if (!res.ok) {
    return {
      error:
        json?.error ??
        ({
          code: "HTTP_ERROR",
          message: `Request failed with ${res.status}`,
        } as ApiResponse<T>["error"]),
    };
  }

  return json;
}
