import { runCacheInvalidation } from "./interceptors/cache-invalidation";
import { AppError, ERROR_CODES, type ErrorCode } from "./errors";

type FetchOptions = Omit<RequestInit, "headers"> & {
  headers?: Record<string, string>;
};

export type ApiError = {
  code: ErrorCode;
  message: string;
  details?: unknown;
};

export type ApiResponse<T> = {
  data?: T;
  error?: ApiError;
  invalidate?: readonly string[];
};

export async function apiClient<T>(input: string, init?: FetchOptions): Promise<ApiResponse<T>> {
  try {
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
            code: ERROR_CODES.INTERNAL_ERROR,
            message: `Request failed with ${res.status}`,
          } as ApiError),
      };
    }

    runCacheInvalidation(json.invalidate);

    return json;
  } catch (e) {
    if (e instanceof TypeError) {
      return {
        error: {
          code: ERROR_CODES.NETWORK_ERROR,
          message: "Network error. Please check your connection.",
        },
      };
    }

    return {
      error: {
        code: ERROR_CODES.INTERNAL_ERROR,
        message: "An unexpected error occurred",
      },
    };
  }
}

export function unwrap<T>(res: ApiResponse<T>): T {
  if (res.error) {
    throw new AppError(res.error.code, res.error.message, res.error.details);
  }

  if (!res.data) {
    throw new AppError(ERROR_CODES.INTERNAL_ERROR, "Empty response");
  }

  return res.data;
}

export function unwrapNullable<T>(res: ApiResponse<T | null>): T | null {
  if (res.error) {
    throw new AppError(res.error.code, res.error.message, res.error.details);
  }

  return res.data ?? null;
}
