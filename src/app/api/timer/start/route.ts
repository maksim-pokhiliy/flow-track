import { NextResponse } from "next/server";

import { requireUserId } from "@app/modules/auth/server";
import { startTimerSchema } from "@app/modules/timer/model";
import { startTimer } from "@app/modules/timer/server";
import { AppError, ERROR_CODES, toApiResponse } from "@app/shared/api";

export async function POST(req: Request) {
  try {
    const userId = await requireUserId();
    const body = await req.json();

    const input = startTimerSchema.parse(body);
    const { workspaceId } = body;

    if (!workspaceId) {
      throw new AppError(ERROR_CODES.INVALID_INPUT, "Workspace ID is required");
    }

    const timer = await startTimer(userId, workspaceId, input);

    return NextResponse.json(
      { data: timer, invalidate: ["timer", "time-entries"] },
      { status: 200 },
    );
  } catch (e: unknown) {
    return toApiResponse(e);
  }
}
