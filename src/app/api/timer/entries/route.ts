import { NextResponse } from "next/server";

import { requireUserId } from "@app/modules/auth/server";
import { listTimeEntries } from "@app/modules/timer/server";
import { AppError, ERROR_CODES, toApiResponse } from "@app/shared/api";

export async function GET(req: Request) {
  try {
    const userId = await requireUserId();
    const { searchParams } = new URL(req.url);

    const workspaceId = searchParams.get("workspaceId");
    const projectId = searchParams.get("projectId") ?? undefined;
    const limit = parseInt(searchParams.get("limit") ?? "50", 10);

    if (!workspaceId) {
      throw new AppError(ERROR_CODES.INVALID_INPUT, "Workspace ID is required");
    }

    const entries = await listTimeEntries(userId, workspaceId, {
      projectId,
      limit,
    });

    return NextResponse.json({ data: entries });
  } catch (e: unknown) {
    return toApiResponse(e);
  }
}
