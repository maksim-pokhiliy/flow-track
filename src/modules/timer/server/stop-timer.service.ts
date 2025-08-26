import { AppError, ERROR_CODES } from "@app/shared/api";
import { prisma } from "@app/shared/lib/prisma";

import type { TimeEntryDTO } from "../model";

export async function stopTimer(userId: string): Promise<TimeEntryDTO> {
  const timeEntry = await prisma.timeEntry.findFirst({
    where: { userId, endTime: null },
    include: {
      workspace: { select: { id: true, name: true } },
      project: { select: { id: true, name: true } },
      task: { select: { id: true, name: true } },
    },
  });

  if (!timeEntry) {
    throw new AppError(ERROR_CODES.NOT_FOUND, "No active timer found");
  }

  const now = new Date();
  const duration = Math.floor((now.getTime() - timeEntry.startedAt.getTime()) / 1000);

  const updated = await prisma.timeEntry.update({
    where: { id: timeEntry.id },
    data: {
      endTime: now,
      duration,
    },
    include: {
      workspace: { select: { id: true, name: true } },
      project: { select: { id: true, name: true } },
      task: { select: { id: true, name: true } },
    },
  });

  return updated;
}
