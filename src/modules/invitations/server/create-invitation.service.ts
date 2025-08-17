import crypto from "node:crypto";

import { Role } from "@prisma/client";

import { requireUserId } from "@app/modules/auth/server";
import { AppError, ERROR_CODES } from "@app/shared/api";
import { prisma } from "@app/shared/lib/server";

import { assertAdminOrOwner } from "./assert-admin-or-owner.service";

const INVITE_TTL_DAYS = 7;

export async function createInvitation(workspaceId: string, email: string, role: Role) {
  const actorId = await requireUserId();

  await assertAdminOrOwner(actorId, workspaceId);

  const existingMember = await prisma.membership.findFirst({
    where: { workspaceId, user: { email } },
    select: { id: true },
  });

  if (existingMember) {
    throw new AppError(ERROR_CODES.CONFLICT, "User with this email is already a member");
  }

  const token = crypto.randomBytes(24).toString("base64url");
  const expiresAt = new Date(Date.now() + INVITE_TTL_DAYS * 24 * 60 * 60 * 1000);

  const invitation = await prisma.invitation.create({
    data: {
      workspaceId,
      email,
      role,
      token,
      invitedBy: actorId,
      expiresAt,
      status: "PENDING",
    },
  });

  return invitation;
}
