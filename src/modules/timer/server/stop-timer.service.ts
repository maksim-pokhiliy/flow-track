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

  const endTime = stoppedTimer.endTime ?? now;
  const finalDurationSec = stoppedTimer.durationSec ?? durationSec;

  return {
    ...stoppedTimer,
    startTime: stoppedTimer.startTime.toISOString(),
    endTime: endTime.toISOString(),
    durationSec: finalDurationSec,
  };
}
