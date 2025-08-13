import { AppError, ERROR_CODES } from "@app/shared/api";
import { prisma } from "@app/shared/lib";

export async function revokeInvitation(token: string) {
export async function revokeInvitation(params: { invitationId?: string; token?: string }) {
  let inv;
  if (params.token) {
    inv = await prisma.invitation.findUnique({ where: { token: params.token } });
  } else if (params.invitationId) {
    inv = await prisma.invitation.findUnique({ where: { id: params.invitationId } });
  } else {
    throw new AppError(ERROR_CODES.BAD_REQUEST, "Must provide either invitationId or token");
  }

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

  return { id: updated.id, status: updated.status };
}
