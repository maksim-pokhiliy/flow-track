import crypto from "node:crypto";

import { Role } from "@prisma/client";

import { requireUserId } from "@app/modules/auth/server";
import { ForbiddenError, NotFoundError, ValidationError } from "@app/shared/api";
import { prisma } from "@app/shared/lib";

const INVITE_TTL_DAYS = 7;

async function assertAdminOrOwner(userId: string, workspaceId: string) {
  const membership = await prisma.membership.findFirst({
    where: { userId, workspaceId },
    select: { role: true },
  });

  if (!membership || (membership.role !== "OWNER" && membership.role !== "ADMIN")) {
    throw new ForbiddenError("Only OWNER or ADMIN can manage invitations");
  }
}

export async function createInvitation(workspaceId: string, email: string, role: Role) {
  const actorId = await requireUserId();

  await assertAdminOrOwner(actorId, workspaceId);

  const existingMember = await prisma.membership.findFirst({
    where: { workspaceId, user: { email } },
    select: { id: true },
  });

  if (existingMember) {
    throw new ValidationError("User with this email is already a member");
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

export async function listInvitations(workspaceId: string) {
  const actorId = await requireUserId();

  await assertAdminOrOwner(actorId, workspaceId);

  return prisma.invitation.findMany({
    where: { workspaceId },
    orderBy: { createdAt: "desc" },
  });
}

export async function revokeInvitation(invitationId: string) {
  const actorId = await requireUserId();

  const invitation = await prisma.invitation.findUnique({
    where: { id: invitationId },
    select: { id: true, status: true, workspaceId: true },
  });

  if (!invitation) {
    throw new NotFoundError("Invitation not found");
  }

  await assertAdminOrOwner(actorId, invitation.workspaceId);

  if (invitation.status !== "PENDING") {
    throw new ValidationError("Only pending invitations can be revoked");
  }

  return prisma.invitation.update({
    where: { id: invitationId },
    data: { status: "REVOKED", revokedAt: new Date() },
  });
}

export async function acceptInvitation(token: string) {
  const userId = await requireUserId();

  const invitation = await prisma.invitation.findFirst({
    where: { token },
  });

  if (!invitation) {
    throw new NotFoundError("Invitation not found");
  }

  if (invitation.status !== "PENDING") {
    throw new ValidationError("Invitation is not active");
  }

  if (invitation.expiresAt.getTime() < Date.now()) {
    await prisma.invitation.update({
      where: { id: invitation.id },
      data: { status: "EXPIRED" },
    });
    throw new ValidationError("Invitation expired");
  }

  const membership = await prisma.membership.findFirst({
    where: { userId, workspaceId: invitation.workspaceId },
    select: { id: true },
  });

  if (!membership) {
    await prisma.membership.create({
      data: {
        userId,
        workspaceId: invitation.workspaceId,
        role: invitation.role,
      },
    });
  }

  await prisma.invitation.update({
    where: { id: invitation.id },
    data: { status: "ACCEPTED", acceptedAt: new Date() },
  });

  return { workspaceId: invitation.workspaceId };
}
