import { NextResponse } from "next/server";

import { requireUserId } from "@app/modules/auth/server";
import { getActiveTimer } from "@app/modules/timer/server";
import { AppError, ERROR_CODES, toApiResponse } from "@app/shared/api";

export async function GET(req: Request) {
  try {
    const userId = await requireUserId();
    const { searchParams } = new URL(req.url);
    const workspaceId = searchParams.get("workspaceId");

    if (!workspaceId) {
      throw new AppError(ERROR_CODES.INVALID_INPUT, "Workspace ID is required");
    }

    const timer = await getActiveTimer(userId, workspaceId);

    return NextResponse.json({ data: timer });
  } catch (e: unknown) {
    return toApiResponse(e);
  }
}
