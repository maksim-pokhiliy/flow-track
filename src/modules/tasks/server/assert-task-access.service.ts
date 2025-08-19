import { AppError, ERROR_CODES } from "@app/shared/api";
import { prisma } from "@app/shared/lib/server";

export async function assertTaskAccess(
  userId: string,
  taskId: string,
): Promise<{
  task: { id: string; projectId: string; workspaceId: string };
  role: string;
}> {
  const task = await prisma.task.findUnique({
    where: { id: taskId },
    select: {
      id: true,
      projectId: true,
      project: {
        select: {
          workspaceId: true,
          workspace: {
            select: {
              memberships: {
                where: { userId },
                select: { role: true },
              },
            },
          },
        },
      },
    },
  });

  if (!task) {
    throw new AppError(ERROR_CODES.NOT_FOUND, "Task not found");
  }

  const membership = task.project.workspace.memberships[0];

  if (!membership) {
    throw new AppError(ERROR_CODES.FORBIDDEN, "Access denied to this task");
  }

  return {
    task: {
      id: task.id,
      projectId: task.projectId,
      workspaceId: task.project.workspaceId,
    },
    role: membership.role,
  };
}

export async function assertProjectAccessForTasks(
  userId: string,
  projectId: string,
): Promise<{ workspaceId: string; role: string }> {
  const project = await prisma.project.findUnique({
    where: { id: projectId },
    select: {
      workspaceId: true,
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
    throw new AppError(ERROR_CODES.FORBIDDEN, "Not a member of this workspace");
  }

  return {
    ...project,
    ...membership,
  };
}
