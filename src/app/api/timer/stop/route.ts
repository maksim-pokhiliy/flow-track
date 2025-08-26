import { NextResponse } from "next/server";

import { requireUserId } from "@app/modules/auth/server";
import { stopTimer } from "@app/modules/timer/server/stop-timer.service";
import { toApiResponse } from "@app/shared/api";
import { QueryKeys } from "@app/shared/query-keys";

export async function POST() {
  try {
    const userId = await requireUserId();
    const timer = await stopTimer(userId);

    return NextResponse.json({
      data: timer,
      invalidate: [QueryKeys.TIMER_ACTIVE, QueryKeys.TIME_ENTRIES, QueryKeys.PROJECT],
    });
  } catch (e) {
    return toApiResponse(e);
  }
}
