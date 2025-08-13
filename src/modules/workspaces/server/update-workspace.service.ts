import { AppError, ERROR_CODES } from "@app/shared/api";
import { prisma } from "@app/shared/lib";

import { assertOwner } from "./assert-owner.service";

export async function updateWorkspace(userId: string, workspaceId: string, name: string) {
  if (!name.trim()) {
    throw new AppError(ERROR_CODES.INVALID_INPUT, "Name is required");
  }

  await assertOwner(userId, workspaceId);

  const ws = await prisma.workspace.update({
    where: { id: workspaceId },
    data: { name },
  });

  return {
    id: ws.id,
    name: ws.name,
    createdAt: ws.createdAt.toISOString(),
  };
}
