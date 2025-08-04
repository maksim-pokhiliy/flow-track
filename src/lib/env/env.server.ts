import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string("DATABASE_URL must be a valid URL"),
  NEXTAUTH_SECRET: z.string().min(1, "NEXTAUTH_SECRET is required"),
  NEXTAUTH_URL: z.url("NEXTAUTH_URL must be a valid URL").optional().or(z.literal("")),
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  VERCEL_URL: z.string().optional(),
  VERCEL_ENV: z.enum(["development", "preview", "production"]).optional(),
});

function validateEnv() {
  try {
    return envSchema.parse(process.env);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const missingVars = error.issues
        .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
        .join("\n");

      throw new Error(
        `❌ Invalid environment variables:\n${missingVars}\n\nPlease check your .env file.`,
      );
    }

    throw error;
  }
}

export const env = validateEnv();

export type Env = z.infer<typeof envSchema>;
