"server-only";

import { z } from "zod";

const ServerEnvSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]),
  NEXTAUTH_URL: z.url(),
  NEXTAUTH_SECRET: z.string().min(32, "NEXTAUTH_SECRET must be at least 32 chars"),
  DATABASE_URL: z
    .string()
    .refine((v) => v.startsWith("postgres://") || v.startsWith("postgresql://"), {
      message: "DATABASE_URL must be a Postgres connection string",
    }),
  POSTGRES_PRISMA_URL: z
    .string()
    .optional()
    .refine(
      (v) => !v || v.startsWith("postgres://") || v.startsWith("postgresql://"),
      "POSTGRES_PRISMA_URL must be a Postgres connection string",
    ),
  STACK_SECRET_SERVER_KEY: z.string(),
});

const parsed = ServerEnvSchema.safeParse({
  NODE_ENV: process.env["NODE_ENV"],
  NEXTAUTH_URL: process.env["NEXTAUTH_URL"],
  NEXTAUTH_SECRET: process.env["NEXTAUTH_SECRET"],
  DATABASE_URL: process.env["DATABASE_URL"],
  POSTGRES_PRISMA_URL:
    process.env["POSTGRES_PRISMA_URL"] ??
    process.env["POSTGRES_URL"] ??
    process.env["POSTGRES_URL_NON_POOLING"],
  STACK_SECRET_SERVER_KEY: process.env["STACK_SECRET_SERVER_KEY"],
});

if (!parsed.success) {
  console.error("❌ Invalid server environment variables", z.treeifyError(parsed.error));
  throw new Error("Invalid server environment variables");
}

export const envServer = parsed.data;

export const prismaUrl = envServer.POSTGRES_PRISMA_URL ?? envServer.DATABASE_URL;
export const isProd = envServer.NODE_ENV === "production";
export const isDev = envServer.NODE_ENV === "development";
