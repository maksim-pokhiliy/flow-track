import { Role } from "@prisma/client";

import { AppError, ERROR_CODES } from "@app/shared/api";
import { prisma } from "@app/shared/lib";

export async function createWorkspace(userId: string, name: string) {
  if (!name.trim()) {
    throw new AppError(ERROR_CODES.INVALID_INPUT, "Name is required");
  }

  const ws = await prisma.$transaction(async (tx) => {
    const workspace = await tx.workspace.create({
      data: { name },
    });

    await tx.membership.create({
      data: { userId, workspaceId: workspace.id, role: Role.OWNER },
    });

    await tx.project.create({
      data: { workspaceId: workspace.id, name: "General" },
    });

    return workspace;
  });

  return {
    id: ws.id,
    name: ws.name,
    createdAt: ws.createdAt.toISOString(),
  };
}
