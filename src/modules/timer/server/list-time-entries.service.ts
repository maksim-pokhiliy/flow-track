import { prisma } from "@app/shared/lib/prisma";

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
        startedAt: { gte: options.startDate },
      }),
      ...(options?.endDate && {
        startedAt: { lte: options.endDate },
      }),
    },
    include: {
      project: { select: { id: true, name: true } },
      task: { select: { id: true, name: true } },
    },
    orderBy: { startedAt: "desc" },
    take: options?.limit ?? 100,
  });

  return entries;
}
