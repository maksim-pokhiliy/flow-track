"use client";

import { z } from "zod";

const ClientEnvSchema = z.object({
  NEXT_PUBLIC_STACK_PROJECT_ID: z.string(),
  NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY: z.string(),
});

const parsed = ClientEnvSchema.safeParse({
  NEXT_PUBLIC_STACK_PROJECT_ID: process.env["NEXT_PUBLIC_STACK_PROJECT_ID"],
  NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY: process.env["NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY"],
});

if (!parsed.success) {
  console.error("❌ Invalid public env", z.treeifyError(parsed.error));
  throw new Error("Invalid public environment variables");
}

export const envClient = parsed.data;
