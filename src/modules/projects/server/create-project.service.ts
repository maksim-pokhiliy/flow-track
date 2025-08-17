import { AppError, ERROR_CODES } from "@app/shared/api";
import { prisma } from "@app/shared/lib/server";

import type { CreateProjectInput, ProjectDTO } from "../model";

import { assertWorkspaceMember } from "./assert-project-access.service";

export async function createProject(
  userId: string,
  workspaceId: string,
  input: CreateProjectInput,
): Promise<ProjectDTO> {
  await assertWorkspaceMember(userId, workspaceId);

  const trimmedName = input.name.trim();

  if (!trimmedName) {
    throw new AppError(ERROR_CODES.INVALID_INPUT, "Project name is required");
  }

  const project = await prisma.project.create({
    data: {
      workspaceId,
      name: trimmedName,
      isArchived: false,
    },
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
    ...project,
    createdAt: project.createdAt.toISOString(),
  };
}
