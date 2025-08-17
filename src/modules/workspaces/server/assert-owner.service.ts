import { Role } from "@prisma/client";

import { AppError, ERROR_CODES } from "@app/shared/api";
import { prisma } from "@app/shared/lib/server";

export async function assertOwner(userId: string, workspaceId: string) {
  const m = await prisma.membership.findUnique({
    where: { userId_workspaceId: { userId, workspaceId } },
    select: { role: true },
  });

  if (!m) {
    throw new AppError(ERROR_CODES.FORBIDDEN, "Not a workspace member");
  }

  if (m.role !== Role.OWNER) {
    throw new AppError(ERROR_CODES.FORBIDDEN, "Only OWNER can perform this action");
  }
}
