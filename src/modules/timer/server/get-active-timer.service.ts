import { prisma } from "@app/shared/lib/prisma";

import type { TimeEntryDTO } from "../model";

export async function getActiveTimer(userId: string): Promise<TimeEntryDTO | null> {
  const timeEntry = await prisma.timeEntry.findFirst({
    where: {
      userId,
      endTime: null,
    },
    include: {
      workspace: { select: { id: true, name: true } },
      project: { select: { id: true, name: true } },
      task: { select: { id: true, name: true } },
    },
  });

  return timeEntry;
}
