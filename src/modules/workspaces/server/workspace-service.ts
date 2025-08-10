import { Role } from "@prisma/client";

import { ForbiddenError, InvalidInputError, NotFoundError } from "@app/shared/api/errors";
import { prisma } from "@app/shared/lib";

export async function listWorkspacesForUser(userId: string) {
  const memberships = await prisma.membership.findMany({
    where: { userId },
    include: {
      workspace: true,
    },
    orderBy: { workspace: { createdAt: "desc" } },
  });

  return memberships.map((m) => ({
    id: m.workspace.id,
    name: m.workspace.name,
    createdAt: m.workspace.createdAt.toISOString(),
    role: m.role,
  }));
}

export async function createWorkspace(userId: string, name: string) {
  if (!name.trim()) {
    throw new InvalidInputError("Name is required");
  }

  const ws = await prisma.$transaction(async (tx) => {
    const workspace = await tx.workspace.create({
      data: { name },
    });

    await tx.membership.create({
      data: { userId, workspaceId: workspace.id, role: Role.OWNER },
    });

    await tx.project.create({
      data: { workspaceId: workspace.id, name: "General" },
    });

    return workspace;
  });

  return {
    id: ws.id,
    name: ws.name,
    createdAt: ws.createdAt.toISOString(),
  };
}

export async function updateWorkspace(userId: string, workspaceId: string, name: string) {
  if (!name.trim()) {
    throw new InvalidInputError("Name is required");
  }

  await assertOwner(userId, workspaceId);

  const ws = await prisma.workspace.update({
    where: { id: workspaceId },
    data: { name },
  });

  return {
    id: ws.id,
    name: ws.name,
    createdAt: ws.createdAt.toISOString(),
  };
}

export async function deleteWorkspace(userId: string, workspaceId: string) {
  await assertOwner(userId, workspaceId);

  try {
    const ws = await prisma.workspace.delete({ where: { id: workspaceId } });

    return { id: ws.id };
  } catch {
    throw new NotFoundError("Workspace not found");
  }
}

async function assertOwner(userId: string, workspaceId: string) {
  const m = await prisma.membership.findUnique({
    where: { userId_workspaceId: { userId, workspaceId } },
    select: { role: true },
  });

  if (!m) {
    throw new ForbiddenError("Not a workspace member");
  }

  if (m.role !== Role.OWNER) {
    throw new ForbiddenError("Only OWNER can perform this action");
  }
}
