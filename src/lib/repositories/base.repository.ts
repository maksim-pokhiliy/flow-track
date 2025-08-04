import { PrismaClient } from "@prisma/client";

import { prisma } from "@app/lib/prisma";

export abstract class BaseRepository {
  protected db: PrismaClient;

  constructor() {
    this.db = prisma;
  }

  protected handleError(error: unknown, operation: string): never {
    console.error(`Database error in ${operation}:`, error);

    if (error instanceof Error) {
      throw new Error(`${operation} failed: ${error.message}`);
    }

    throw new Error(`${operation} failed: Unknown error`);
  }
}
