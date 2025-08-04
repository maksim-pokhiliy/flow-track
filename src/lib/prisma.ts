import { PrismaClient } from "@prisma/client";

import { env } from "./env/env.server";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    datasources: {
      db: {
        url: env.DATABASE_URL,
      },
    },
  });

if (!env.NODE_ENV || env.NODE_ENV === "development") {
  globalForPrisma.prisma = prisma;
}
