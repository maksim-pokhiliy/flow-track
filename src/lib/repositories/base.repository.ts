import { PrismaClient } from "@prisma/client";

import { prisma } from "@app/lib/prisma";

export abstract class BaseRepository {
  protected db: PrismaClient;

  constructor() {
    this.db = prisma;
  }

  protected async execute<T>(operation: string, fn: () => Promise<T>): Promise<T> {
    try {
      return await fn();
    } catch (error) {
      this.handleError(error, operation);
    }
  }

  protected handleError(error: unknown, operation: string): never {
    console.error(`Database error in ${operation}:`, error);

    if (error instanceof Error) {
      throw new Error(`${operation} failed: ${error.message}`);
    }

    throw new Error(`${operation} failed: Unknown error`);
  }
}
