import { AppError, ERROR_CODES } from "@app/shared/api";
import { prisma } from "@app/shared/lib/server";

import type { StopTimerInput, TimeEntryDTO } from "../model";

export async function stopTimer(
  userId: string,
  workspaceId: string,
  input?: StopTimerInput,
): Promise<TimeEntryDTO | null> {
  const activeTimer = await prisma.timeEntry.findFirst({
    where: {
      userId,
      workspaceId,
      endTime: null,
    },
    include: {
      project: {
        select: { id: true, name: true },
      },
      task: {
        select: { id: true, name: true },
      },
    },
  });

  if (!activeTimer) {
    return null;
  }

  const now = new Date();
  const durationMs = now.getTime() - activeTimer.startTime.getTime();
  const durationSec = Math.floor(durationMs / 1000);

  if (durationSec < 1) {
    throw new AppError(ERROR_CODES.INVALID_INPUT, "Timer duration too short");
  }

  const stoppedTimer = await prisma.timeEntry.update({
    where: { id: activeTimer.id },
    data: {
      endTime: now,
      durationSec,
      note: input?.note ?? activeTimer.note,
    },
    include: {
      project: {
        select: { id: true, name: true },
      },
      task: {
        select: { id: true, name: true },
      },
    },
  });

  return {
    ...stoppedTimer,
    startTime: stoppedTimer.startTime.toISOString(),
    endTime: stoppedTimer.endTime!.toISOString(),
    durationSec: stoppedTimer.durationSec!,
  };
}
