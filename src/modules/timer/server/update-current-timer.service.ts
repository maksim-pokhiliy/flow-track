import { assertProjectAccess } from "@app/modules/projects/server/assert-project-access.service";
import { assertTaskAccess } from "@app/modules/tasks/server/assert-task-access.service";
import { AppError, ERROR_CODES } from "@app/shared/api";
import { prisma } from "@app/shared/lib/prisma";

import { TimeEntryDTO, UpdateTimerInput } from "../model";

function getRelationUpdate(id: string | null | undefined) {
  if (id === null) {
    return { disconnect: true };
  }

  if (id) {
    return { connect: { id } };
  }

  return undefined;
}

export async function updateCurrentTimer(
  userId: string,
  input: UpdateTimerInput,
): Promise<TimeEntryDTO> {
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

  if (input.projectId) {
    await assertProjectAccess(userId, input.projectId);
  }

  if (input.taskId) {
    await assertTaskAccess(userId, input.taskId);
  }

  const updated = await prisma.timeEntry.update({
    where: { id: timeEntry.id },
    data: {
      workspace: getRelationUpdate(input.workspaceId),
      project: getRelationUpdate(input.projectId),
      task: getRelationUpdate(input.taskId),
    },
    include: {
      workspace: { select: { id: true, name: true } },
      project: { select: { id: true, name: true } },
      task: { select: { id: true, name: true } },
    },
  });

  return updated;
}
