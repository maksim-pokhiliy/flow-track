import { prisma } from "@app/shared/lib";

import { getPendingInvitationOrThrow } from "./get-invitation-by-token.service";

export async function acceptInvitation(token: string, userId: string) {
  const inv = await getPendingInvitationOrThrow(token);

  await prisma.$transaction(async (tx) => {
    await tx.membership.upsert({
      where: {
        userId_workspaceId: {
          userId,
          workspaceId: inv.workspaceId,
        },
      },
      create: {
        userId,
        workspaceId: inv.workspaceId,
        role: inv.role,
      },
      update: {
        role: inv.role,
      },
    });

    await tx.invitation.update({
      where: { id: inv.id },
      data: { status: "ACCEPTED", acceptedAt: new Date() },
    });
  });

  return { workspaceId: inv.workspaceId };
}
