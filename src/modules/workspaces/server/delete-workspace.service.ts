import { AppError, ERROR_CODES } from "@app/shared/api";
import { prisma } from "@app/shared/lib/server";

import { assertOwner } from "./assert-owner.service";

export async function deleteWorkspace(userId: string, workspaceId: string) {
  await assertOwner(userId, workspaceId);

  try {
    const ws = await prisma.workspace.delete({ where: { id: workspaceId } });

    return ws;
  } catch {
    throw new AppError(ERROR_CODES.NOT_FOUND, "Workspace not found");
  }
}
