import { prisma } from "@app/shared/lib/server";

import type { TaskDTO, UpdateTaskInput } from "../model";

import { assertTaskAccess } from "./assert-task-access.service";

export async function updateTask(
  userId: string,
  taskId: string,
  input: UpdateTaskInput,
): Promise<TaskDTO> {
  await assertTaskAccess(userId, taskId);

  const updateData = {
    ...input,
    ...(input.isCompleted !== undefined && {
      completedAt: input.isCompleted ? new Date() : null,
    }),
  };

  const task = await prisma.task.update({
    where: { id: taskId },
    data: updateData,
  });

  return {
    ...task,
    createdAt: task.createdAt.toISOString(),
    completedAt: task.completedAt?.toISOString() ?? null,
  };
}
