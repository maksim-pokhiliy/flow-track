import { prisma } from "@app/shared/lib/server";

import type { ProjectDTO } from "../model";

import { assertWorkspaceMember } from "./assert-project-access.service";

export async function listProjects(userId: string, workspaceId: string): Promise<ProjectDTO[]> {
  await assertWorkspaceMember(userId, workspaceId);

  const projects = await prisma.project.findMany({
    where: { workspaceId },
    include: {
      _count: {
        select: {
          tasks: true,
          timeEntries: true,
        },
      },
    },
    orderBy: [{ isArchived: "asc" }, { createdAt: "desc" }],
  });

  return projects.map((project) => ({
    ...project,
    createdAt: project.createdAt.toISOString(),
  }));
}
