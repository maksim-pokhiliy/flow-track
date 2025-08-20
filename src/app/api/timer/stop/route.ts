import { NextResponse } from "next/server";

import { requireUserId } from "@app/modules/auth/server";
import { stopTimerSchema } from "@app/modules/timer/model";
import { stopTimer } from "@app/modules/timer/server";
import { AppError, ERROR_CODES, toApiResponse } from "@app/shared/api";

export async function POST(req: Request) {
  try {
    const userId = await requireUserId();
    const body = await req.json();

    const input = body.note ? stopTimerSchema.parse(body) : undefined;
    const { workspaceId } = body;

    if (!workspaceId) {
      throw new AppError(ERROR_CODES.INVALID_INPUT, "Workspace ID is required");
    }

    const timer = await stopTimer(userId, workspaceId, input);

    return NextResponse.json({ data: timer, invalidate: ["timer", "time-entries"] });
  } catch (e: unknown) {
    return toApiResponse(e);
  }
}
