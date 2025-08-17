import { PrismaClient } from "@prisma/client";

import { isDev } from "./env.server";

declare global {
  var prisma: PrismaClient | undefined;
}

export const prisma =
  global.prisma ??
  new PrismaClient({
    log: isDev ? ["query", "warn", "error"] : ["error"],
  });

if (isDev) {
  global.prisma = prisma;
}
