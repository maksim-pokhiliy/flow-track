import { AppError, ERROR_CODES } from "@app/shared/api";
import { isExpired, prisma } from "@app/shared/lib";

export async function getPendingInvitationOrThrow(token: string) {
  const inv = await prisma.invitation.findUnique({
    where: { token },
    include: { workspace: true },
  });

  if (!inv) {
    throw new AppError(ERROR_CODES.NOT_FOUND, "Invitation not found");
  }

  if (inv.status !== "PENDING") {
    throw new AppError(ERROR_CODES.NOT_FOUND, "Invitation is no longer active");
  }

  if (isExpired(inv.expiresAt)) {
    await prisma.invitation.update({
      where: { id: inv.id },
      data: { status: "EXPIRED" },
    });

    throw new AppError(ERROR_CODES.TOKEN_EXPIRED, "Invitation link expired");
  }

  return inv;
}
