import { NextRequest, NextResponse } from "next/server";

import { requireUserId } from "@app/modules/auth/server";
import { startTimerSchema } from "@app/modules/timer/model";
import { startTimer } from "@app/modules/timer/server/start-timer.service";
import { toApiResponse } from "@app/shared/api";
import { QueryKeys } from "@app/shared/query-keys";

export async function POST(req: NextRequest) {
  try {
    const userId = await requireUserId();
    const body = await req.json();
    const input = startTimerSchema.parse(body);
    const timer = await startTimer(userId, input);

    return NextResponse.json({
      data: timer,
      invalidate: [QueryKeys.TIMER_ACTIVE, QueryKeys.TIME_ENTRIES, QueryKeys.PROJECT],
    });
  } catch (e) {
    return toApiResponse(e);
  }
}
