import { prisma } from "@app/shared/lib/server";

import type { TaskDTO } from "../model";

import { assertProjectAccessForTasks } from "./assert-task-access.service";

export async function listTasks(userId: string, projectId: string): Promise<TaskDTO[]> {
  await assertProjectAccessForTasks(userId, projectId);

  const tasks = await prisma.task.findMany({
    where: { projectId },
    orderBy: [{ isCompleted: "asc" }, { createdAt: "desc" }],
  });

  return tasks.map((task) => ({
    ...task,
    createdAt: task.createdAt.toISOString(),
    completedAt: task.completedAt?.toISOString() ?? null,
  }));
}
