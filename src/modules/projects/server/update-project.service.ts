import { Role } from "@prisma/client";

import { AppError, ERROR_CODES } from "@app/shared/api";
import { prisma } from "@app/shared/lib/server";

import type { ProjectDTO, UpdateProjectInput } from "../model";

import { assertProjectAccess } from "./assert-project-access.service";

export async function updateProject(
  userId: string,
  projectId: string,
  input: UpdateProjectInput,
): Promise<ProjectDTO> {
  const { role } = await assertProjectAccess(userId, projectId);

  if (role === Role.MEMBER) {
    throw new AppError(ERROR_CODES.FORBIDDEN, "Only ADMIN or OWNER can update projects");
  }

  const updateData: { name?: string; isArchived?: boolean } = {};

  if (input.name !== undefined) {
    const trimmedName = input.name.trim();

    if (!trimmedName) {
      throw new AppError(ERROR_CODES.INVALID_INPUT, "Project name cannot be empty");
    }

    updateData.name = trimmedName;
  }

  if (input.isArchived !== undefined) {
    updateData.isArchived = input.isArchived;
  }

  const project = await prisma.project.update({
    where: { id: projectId },
    data: updateData,
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
