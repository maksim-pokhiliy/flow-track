import { NextResponse } from "next/server";
import { z } from "zod";

import { registerSchema, registerWithEmail } from "@app/modules/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = registerSchema.parse(body);

    const user = await registerWithEmail(data.email, data.password, data.name);

    return NextResponse.json({
      data: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: {
            code: "VALIDATION_ERROR",
            message: "Invalid input",
            details: error.issues,
          },
        },
        { status: 400 },
      );
    }

    if (error instanceof Error && error.message === "Email already in use") {
      return NextResponse.json(
        {
          error: {
            code: "EMAIL_EXISTS",
            message: "Email already in use",
          },
        },
        { status: 409 },
      );
    }

    console.error("Registration error:", error);

    return NextResponse.json(
      {
        error: {
          code: "INTERNAL_ERROR",
          message: "Registration failed",
        },
      },
      { status: 500 },
    );
  }
}
