import { z } from "zod";

import { APP_CONFIG } from "@app/lib/config";

export const loginSchema = z.object({
  email: z.email("Invalid email address"),
  password: z
    .string()
    .min(
      APP_CONFIG.validation.password.minLength,
      `Password must be at least ${APP_CONFIG.validation.password.minLength} characters`,
    ),
});

export const registerSchema = z.object({
  name: z
    .string()
    .min(
      APP_CONFIG.validation.name.minLength,
      `Name must be at least ${APP_CONFIG.validation.name.minLength} characters`,
    ),
  email: z.email("Invalid email address"),
  password: z
    .string()
    .min(
      APP_CONFIG.validation.password.minLength,
      `Password must be at least ${APP_CONFIG.validation.password.minLength} characters`,
    ),
  defaultHourlyRate: z
    .number()
    .min(APP_CONFIG.validation.hourlyRate.min)
    .max(APP_CONFIG.validation.hourlyRate.max),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
