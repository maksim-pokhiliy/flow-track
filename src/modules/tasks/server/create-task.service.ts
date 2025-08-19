import { prisma } from "@app/shared/lib/server";

import type { CreateTaskInput, TaskDTO } from "../model";

import { assertProjectAccessForTasks } from "./assert-task-access.service";

export async function createTask(
  userId: string,
  projectId: string,
  input: CreateTaskInput,
): Promise<TaskDTO> {
  await assertProjectAccessForTasks(userId, projectId);

  const task = await prisma.task.create({
    data: {
      projectId,
      ...input,
    },
  });

  return {
    ...task,
    createdAt: task.createdAt.toISOString(),
    completedAt: null,
  };
}
