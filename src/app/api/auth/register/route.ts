import { NextResponse } from "next/server";

import { registerSchema } from "@app/modules/auth/model";
import { registerWithEmail } from "@app/modules/auth/server";
import { toApiResponse } from "@app/shared/api";
import { QueryKeys } from "@app/shared/query-keys";

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
      invalidate: [QueryKeys.WORKSPACES],
    });
  } catch (error) {
    return toApiResponse(error);
  }
}
