import { AppError, ERROR_CODES } from "@app/shared/api";
import { prisma } from "@app/shared/lib/server";

export async function assertProjectAccess(
  userId: string,
  projectId: string,
): Promise<{ project: { id: string; workspaceId: string; name: string }; role: string }> {
  const project = await prisma.project.findUnique({
    where: { id: projectId },
    select: {
      id: true,
      workspaceId: true,
      name: true,
      workspace: {
        select: {
          memberships: {
            where: { userId },
            select: { role: true },
          },
        },
      },
    },
  });

  if (!project) {
    throw new AppError(ERROR_CODES.NOT_FOUND, "Project not found");
  }

  const membership = project.workspace.memberships[0];

  if (!membership) {
    throw new AppError(ERROR_CODES.FORBIDDEN, "Access denied to this project");
  }

  return {
    project,
    role: membership.role,
  };
}

export async function assertWorkspaceMember(
  userId: string,
  workspaceId: string,
): Promise<{ role: string }> {
  const membership = await prisma.membership.findUnique({
    where: {
      userId_workspaceId: {
        userId,
        workspaceId,
      },
    },
    select: { role: true },
  });

  if (!membership) {
    throw new AppError(ERROR_CODES.FORBIDDEN, "Not a workspace member");
  }

  return membership;
}
