import { NextRequest, NextResponse } from "next/server";

import { requireUserId } from "@app/modules/auth/server";
import { updateTimerInputSchema } from "@app/modules/timer/model";
import { getActiveTimer, updateCurrentTimer } from "@app/modules/timer/server";
import { toApiResponse } from "@app/shared/api";
import { QueryKeys } from "@app/shared/query-keys";

export async function GET() {
  try {
    const userId = await requireUserId();
    const timeEntry = await getActiveTimer(userId);

    return NextResponse.json({ data: timeEntry ?? null });
  } catch (e) {
    return toApiResponse(e);
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const userId = await requireUserId();
    const body = await req.json();
    const input = updateTimerInputSchema.parse(body);
    const timeEntry = await updateCurrentTimer(userId, input);

    return NextResponse.json({
      data: timeEntry,
      invalidate: [QueryKeys.TIMER_ACTIVE, QueryKeys.TIME_ENTRIES],
    });
  } catch (e) {
    return toApiResponse(e);
  }
}
