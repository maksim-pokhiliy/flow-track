import { prisma } from "@app/shared/lib/server";

import { assertTaskAccess } from "./assert-task-access.service";

export async function deleteTask(userId: string, taskId: string): Promise<{ id: string }> {
  await assertTaskAccess(userId, taskId);

  await prisma.task.delete({
    where: { id: taskId },
  });

  return { id: taskId };
}
