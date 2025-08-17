import { Role } from "@prisma/client";

import { AppError, ERROR_CODES } from "@app/shared/api";
import { prisma } from "@app/shared/lib/server";

import { assertProjectAccess } from "./assert-project-access.service";

export async function deleteProject(userId: string, projectId: string): Promise<{ id: string }> {
  const { role } = await assertProjectAccess(userId, projectId);

  if (role !== Role.OWNER) {
    throw new AppError(ERROR_CODES.FORBIDDEN, "Only workspace OWNER can delete projects");
  }

  await prisma.project.delete({
    where: { id: projectId },
  });

  return { id: projectId };
}
