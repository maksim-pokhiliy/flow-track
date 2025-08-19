import { Role } from "@prisma/client";

import { AppError, ERROR_CODES } from "@app/shared/api";
import { prisma } from "@app/shared/lib/server";

export async function assertAdminOrOwner(userId: string, workspaceId: string) {
  const membership = await prisma.membership.findFirst({
    where: { userId, workspaceId },
    select: { role: true },
  });

  if (!membership || (membership.role !== Role.OWNER && membership.role !== Role.ADMIN)) {
    throw new AppError(
      ERROR_CODES.FORBIDDEN,
      `Only ${Role.OWNER} or ${Role.ADMIN} can manage invitations`,
    );
  }
}
