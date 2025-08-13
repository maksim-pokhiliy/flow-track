import { NextResponse } from "next/server";
import { ZodError } from "zod";

export const ERROR_CODES = {
  // Auth & Access
  UNAUTHORIZED: "UNAUTHORIZED",
  FORBIDDEN: "FORBIDDEN",
  TOKEN_EXPIRED: "TOKEN_EXPIRED",

  // Resources
  NOT_FOUND: "NOT_FOUND",
  CONFLICT: "CONFLICT",
  EMAIL_EXISTS: "EMAIL_EXISTS",

  // Validation
  INVALID_INPUT: "INVALID_INPUT",
  VALIDATION_ERROR: "VALIDATION_ERROR",

  // Business Logic
  QUOTA_EXCEEDED: "QUOTA_EXCEEDED",
  RATE_LIMITED: "RATE_LIMITED",
  PAYMENT_REQUIRED: "PAYMENT_REQUIRED",

  // System
  INTERNAL_ERROR: "INTERNAL_ERROR",
  NETWORK_ERROR: "NETWORK_ERROR",
} as const;

export type ErrorCode = (typeof ERROR_CODES)[keyof typeof ERROR_CODES];

const statusByCode: Record<ErrorCode, number> = {
  [ERROR_CODES.UNAUTHORIZED]: 401,
  [ERROR_CODES.FORBIDDEN]: 403,
  [ERROR_CODES.NOT_FOUND]: 404,
  [ERROR_CODES.CONFLICT]: 409,
  [ERROR_CODES.INVALID_INPUT]: 400,
  [ERROR_CODES.VALIDATION_ERROR]: 400,
  [ERROR_CODES.INTERNAL_ERROR]: 500,
  [ERROR_CODES.EMAIL_EXISTS]: 409,
  [ERROR_CODES.TOKEN_EXPIRED]: 410,
  [ERROR_CODES.QUOTA_EXCEEDED]: 402,
  [ERROR_CODES.RATE_LIMITED]: 429,
  [ERROR_CODES.PAYMENT_REQUIRED]: 402,
  [ERROR_CODES.NETWORK_ERROR]: 0,
};

export class AppError extends Error {
  public code: ErrorCode;
  public details?: unknown;

  constructor(code: ErrorCode, message?: string, details?: unknown) {
    super(message ?? code);
    this.code = code;
    this.details = details;
  }
}

export function toApiResponse(e: unknown): NextResponse {
  if (e instanceof ZodError) {
    return NextResponse.json(
      {
        error: {
          code: ERROR_CODES.VALIDATION_ERROR,
          message: "Invalid input",
          details: e.issues,
        },
      },
      { status: statusByCode[ERROR_CODES.VALIDATION_ERROR] },
    );
  }

  if (e instanceof AppError) {
    const status = statusByCode[e.code] ?? 500;

    return NextResponse.json(
      { error: { code: e.code, message: e.message, details: e.details } },
      { status },
    );
  }

  console.error("Unhandled error:", e);

  return NextResponse.json(
    { error: { code: ERROR_CODES.INTERNAL_ERROR, message: "Internal server error" } },
    { status: statusByCode[ERROR_CODES.INTERNAL_ERROR] },
  );
}
