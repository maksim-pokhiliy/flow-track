import { Prisma } from "@prisma/client";

import { assertProjectAccess } from "@app/modules/projects/server/assert-project-access.service";
import { assertTaskAccess } from "@app/modules/tasks/server/assert-task-access.service";
import { prisma } from "@app/shared/lib/prisma";

import { StartTimerInput, TimeEntryDTO } from "../model";

export async function startTimer(userId: string, input: StartTimerInput): Promise<TimeEntryDTO> {
  if (input.projectId) {
    await assertProjectAccess(userId, input.projectId);
  }

  if (input.taskId) {
    await assertTaskAccess(userId, input.taskId);
  }

  const data: Prisma.TimeEntryCreateInput = {
    user: { connect: { id: userId } },
    workspace: input.workspaceId ? { connect: { id: input.workspaceId } } : undefined,
    project: input.projectId ? { connect: { id: input.projectId } } : undefined,
    task: input.taskId ? { connect: { id: input.taskId } } : undefined,
    startedAt: new Date(),
  };

  const timeEntry = await prisma.timeEntry.create({
    data,
    include: {
      workspace: { select: { id: true, name: true } },
      project: { select: { id: true, name: true } },
      task: { select: { id: true, name: true } },
    },
  });

  return timeEntry;
}
