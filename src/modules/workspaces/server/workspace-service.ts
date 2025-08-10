import { Role } from "@prisma/client";

import { ForbiddenError } from "@app/shared/api/errors";
import { prisma } from "@app/shared/lib";

async function getUserRole(userId: string, workspaceId: string): Promise<Role | null> {
  const m = await prisma.membership.findUnique({
    where: { userId_workspaceId: { userId, workspaceId } },
    select: { role: true },
  });

  return m?.role ?? null;
}

export async function listWorkspacesForUser(userId: string) {
  const memberships = await prisma.membership.findMany({
    where: { userId },
    select: { role: true, workspace: { select: { id: true, name: true, createdAt: true } } },
    orderBy: { workspace: { createdAt: "asc" } },
  });

  return memberships.map((m) => ({
    id: m.workspace.id,
    name: m.workspace.name,
    role: m.role,
    createdAt: m.workspace.createdAt,
  }));
}

export async function createWorkspace(userId: string, name: string) {
  const ws = await prisma.workspace.create({ data: { name } });

  await prisma.membership.create({
    data: { userId, workspaceId: ws.id, role: "OWNER" },
  });

  await prisma.project.create({
    data: { workspaceId: ws.id, name: "General", isArchived: false },
  });

  return ws;
}

export async function updateWorkspace(userId: string, workspaceId: string, name: string) {
  const role = await getUserRole(userId, workspaceId);

  if (!role || (role !== "OWNER" && role !== "ADMIN")) {
    throw new ForbiddenError("Only OWNER or ADMIN can update workspace");
  }

  return prisma.workspace.update({ where: { id: workspaceId }, data: { name } });
}

export async function deleteWorkspace(userId: string, workspaceId: string) {
  const role = await getUserRole(userId, workspaceId);

  if (role !== "OWNER") {
    throw new ForbiddenError("Only OWNER can delete workspace");
  }

  return prisma.workspace.delete({ where: { id: workspaceId } });
}
