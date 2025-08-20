import { prisma } from "@app/shared/lib/server";

import type { TimeEntryDTO } from "../model";

export async function getActiveTimer(
  userId: string,
  workspaceId: string,
): Promise<TimeEntryDTO | null> {
  const activeEntry = await prisma.timeEntry.findFirst({
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
    orderBy: { startTime: "desc" },
  });

  if (!activeEntry) {
    return null;
  }

  return {
    ...activeEntry,
    endTime: null,
    durationSec: null,
    startTime: activeEntry.startTime.toISOString(),
  };
}
