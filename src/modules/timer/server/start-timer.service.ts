import { AppError, ERROR_CODES } from "@app/shared/api";
import { prisma } from "@app/shared/lib/server";

import type { StartTimerInput, TimeEntryDTO } from "../model";

export async function startTimer(
  userId: string,
  workspaceId: string,
  input: StartTimerInput,
): Promise<TimeEntryDTO> {
  const project = await prisma.project.findFirst({
    where: {
      id: input.projectId,
      workspaceId,
      workspace: {
        memberships: {
          some: { userId },
        },
      },
    },
  });

  if (!project) {
    throw new AppError(ERROR_CODES.NOT_FOUND, "Project not found or access denied");
  }

  const activeTimer = await prisma.timeEntry.findFirst({
    where: {
      userId,
      workspaceId,
      endTime: null,
    },
  });

  if (
    activeTimer &&
    activeTimer.projectId === input.projectId &&
    activeTimer.taskId === input.taskId
  ) {
    return {
      ...activeTimer,
      endTime: null,
      durationSec: null,
      startTime: activeTimer.startTime.toISOString(),
    };
  }

  const newTimer = await prisma.$transaction(async (tx) => {
    if (activeTimer) {
      const now = new Date();
      const durationMs = now.getTime() - activeTimer.startTime.getTime();
      const durationSec = Math.floor(durationMs / 1000);

      await tx.timeEntry.update({
        where: { id: activeTimer.id },
        data: {
          endTime: now,
          durationSec,
        },
      });
    }

    const newEntry = await tx.timeEntry.create({
      data: {
        userId,
        workspaceId,
        projectId: input.projectId,
        taskId: input.taskId,
        note: input.note,
        startTime: new Date(),
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

    return newEntry;
  });

  return {
    ...newTimer,
    endTime: null,
    durationSec: null,
    startTime: newTimer.startTime.toISOString(),
  };
}
