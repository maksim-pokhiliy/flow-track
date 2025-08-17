import { prisma } from "@app/shared/lib/server";

import type { ProjectDTO } from "../model";

export async function getProject(userId: string, projectId: string): Promise<ProjectDTO> {
  const fullProject = await prisma.project.findUniqueOrThrow({
    where: { id: projectId },
    include: {
      _count: {
        select: {
          tasks: true,
          timeEntries: true,
        },
      },
    },
  });

  return {
    ...fullProject,
    createdAt: fullProject.createdAt.toISOString(),
  };
}
