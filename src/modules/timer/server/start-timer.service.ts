import { Prisma } from "@prisma/client";

import { assertProjectAccess } from "@app/modules/projects/server/assert-project-access.service";
import { assertTaskAccess } from "@app/modules/tasks/server/assert-task-access.service";
import { prisma } from "@app/shared/lib/prisma";

import { TimeEntryDTO } from "../model";

type StartTimerParams = {
  workspaceId?: string;
  project?: TimeEntryDTO["project"];
  task?: TimeEntryDTO["task"];
};

export async function startTimer(userId: string, input: StartTimerParams): Promise<TimeEntryDTO> {
  if (input?.project?.id) {
    await assertProjectAccess(userId, input.project.id);
  }

  if (input?.task?.id) {
    await assertTaskAccess(userId, input.task.id);
  }

  const data: Prisma.TimeEntryCreateInput = {
    user: { connect: { id: userId } },
    workspace: input.workspaceId ? { connect: { id: input.workspaceId } } : undefined,
    project: input?.project?.id ? { connect: { id: input.project.id } } : undefined,
    task: input?.task?.id ? { connect: { id: input.task.id } } : undefined,
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
