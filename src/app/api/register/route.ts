import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { APP_CONFIG } from "@app/lib/config";
import { UserRepository } from "@app/lib/repositories";
import { AuthService } from "@app/lib/services";

const registerSchema = z.object({
  name: z
    .string()
    .min(
      APP_CONFIG.validation.name.minLength,
      `Name must be at least ${APP_CONFIG.validation.name.minLength} characters`,
    ),
  email: z.email("Invalid email format"),
  password: z
    .string()
    .min(
      APP_CONFIG.validation.password.minLength,
      `Password must be at least ${APP_CONFIG.validation.password.minLength} characters`,
    ),
  defaultHourlyRate: z.number().min(APP_CONFIG.validation.hourlyRate.min).optional(),
  currency: z.string().optional(),
});

const authService = new AuthService(new UserRepository());

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = registerSchema.parse(body);

    const user = await authService.createUser(validatedData);

    return NextResponse.json(
      {
        message: "User created successfully",
        user,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Registration error:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid input", details: error.issues }, { status: 400 });
    }

    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
