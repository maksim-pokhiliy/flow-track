import { NextResponse } from "next/server";
import { z } from "zod";

import { registerSchema } from "@app/modules/auth/model";
import { registerWithEmail } from "@app/modules/auth/server";
import { AppError, ERROR_CODES, toApiResponse } from "@app/shared/api";

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
      return toApiResponse(error);
    }

    if (error instanceof Error && error.message === "Email already in use") {
      return toApiResponse(new AppError(ERROR_CODES.EMAIL_EXISTS, "Email already in use"));
    }

    return toApiResponse(error);
  }
}
