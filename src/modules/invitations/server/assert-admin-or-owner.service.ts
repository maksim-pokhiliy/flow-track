import { AppError, ERROR_CODES } from "@app/shared/api";
import { prisma } from "@app/shared/lib/server";

export async function assertAdminOrOwner(userId: string, workspaceId: string) {
  const membership = await prisma.membership.findFirst({
    where: { userId, workspaceId },
    select: { role: true },
  });

  if (!membership || (membership.role !== "OWNER" && membership.role !== "ADMIN")) {
    throw new AppError(ERROR_CODES.FORBIDDEN, "Only OWNER or ADMIN can manage invitations");
  }
}
