import { AppError, ERROR_CODES } from "@app/shared/api";
import { prisma } from "@app/shared/lib/server";

export async function revokeInvitation(token: string) {
  const inv = await prisma.invitation.findUnique({ where: { token } });

  if (!inv) {
    throw new AppError(ERROR_CODES.NOT_FOUND, "Invitation not found");
  }

  if (inv.status !== "PENDING") {
    throw new AppError(ERROR_CODES.CONFLICT, "Only pending invitations can be revoked");
  }

  const updated = await prisma.invitation.update({
    where: { id: inv.id },
    data: { status: "REVOKED", revokedAt: new Date() },
  });

  return updated;
}
