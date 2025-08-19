import { requireUserId } from "@app/modules/auth/server";
import { prisma } from "@app/shared/lib/server";

import { assertAdminOrOwner } from "./assert-admin-or-owner.service";

export async function listInvitations(workspaceId: string) {
  const actorId = await requireUserId();

  await assertAdminOrOwner(actorId, workspaceId);

  const invitations = await prisma.invitation.findMany({
    where: { workspaceId },
    orderBy: { createdAt: "desc" },
  });

  return invitations;
}
