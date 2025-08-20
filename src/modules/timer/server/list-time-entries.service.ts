import { prisma } from "@app/shared/lib/server";

import type { TimeEntryDTO } from "../model";

type ListOptions = {
  projectId?: string;
  taskId?: string;
  startDate?: Date;
  endDate?: Date;
  limit?: number;
};

export async function listTimeEntries(
  userId: string,
  workspaceId: string,
  options?: ListOptions,
): Promise<TimeEntryDTO[]> {
  const entries = await prisma.timeEntry.findMany({
    where: {
      userId,
      workspaceId,
      ...(options?.projectId && { projectId: options.projectId }),
      ...(options?.taskId && { taskId: options.taskId }),
      ...(options?.startDate && {
        startTime: { gte: options.startDate },
      }),
      ...(options?.endDate && {
        startTime: { lte: options.endDate },
      }),
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
    take: options?.limit ?? 100,
  });

  return entries.map((entry) => ({
    ...entry,
    startTime: entry.startTime.toISOString(),
    endTime: entry.endTime?.toISOString() ?? null,
  }));
}
