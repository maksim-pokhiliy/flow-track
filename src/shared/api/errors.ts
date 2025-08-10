import { NextResponse } from "next/server";
import { ZodError } from "zod";

export const ERROR_CODES = {
  UNAUTHORIZED: "UNAUTHORIZED",
  FORBIDDEN: "FORBIDDEN",
  NOT_FOUND: "NOT_FOUND",
  CONFLICT: "CONFLICT",
  INVALID_INPUT: "INVALID_INPUT",
  VALIDATION_ERROR: "VALIDATION_ERROR",
  INTERNAL_ERROR: "INTERNAL_ERROR",
  EMAIL_EXISTS: "EMAIL_EXISTS",
} as const;

export type ErrorCode = (typeof ERROR_CODES)[keyof typeof ERROR_CODES];

const statusByCode: Record<ErrorCode, number> = {
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INVALID_INPUT: 400,
  VALIDATION_ERROR: 400,
  INTERNAL_ERROR: 500,
  EMAIL_EXISTS: 409,
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

export class UnauthorizedError extends AppError {
  constructor(message = "Auth required") {
    super(ERROR_CODES.UNAUTHORIZED, message);
  }
}

export class ForbiddenError extends AppError {
  constructor(message = "Forbidden") {
    super(ERROR_CODES.FORBIDDEN, message);
  }
}

export class NotFoundError extends AppError {
  constructor(message = "Not found") {
    super(ERROR_CODES.NOT_FOUND, message);
  }
}

export class ConflictError extends AppError {
  constructor(message = "Conflict") {
    super(ERROR_CODES.CONFLICT, message);
  }
}

export class InvalidInputError extends AppError {
  constructor(message = "Invalid input", details?: unknown) {
    super(ERROR_CODES.INVALID_INPUT, message, details);
  }
}

export function toApiResponse(e: unknown): NextResponse {
  if (e instanceof ZodError) {
    return NextResponse.json(
      {
        error: { code: ERROR_CODES.VALIDATION_ERROR, message: "Invalid input", details: e.issues },
      },
      { status: statusByCode.VALIDATION_ERROR },
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
    { status: statusByCode.INTERNAL_ERROR },
  );
}
