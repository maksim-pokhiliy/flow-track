import { prisma } from "@app/shared/lib/server";

export async function listWorkspaces(userId: string) {
  const memberships = await prisma.membership.findMany({
    where: { userId },
    include: {
      workspace: true,
    },
    orderBy: { workspace: { createdAt: "desc" } },
  });

  return memberships.map((m) => ({
    ...m.workspace,
    role: m.role,
    createdAt: m.workspace.createdAt.toISOString(),
  }));
}
