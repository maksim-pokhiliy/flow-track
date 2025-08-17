import { Role } from "@prisma/client";

import { AppError, ERROR_CODES } from "@app/shared/api";
import { prisma } from "@app/shared/lib/server";

import { hashPassword } from "./password.service";

export async function registerWithEmail(email: string, password: string, name: string) {
  const existing = await prisma.user.findUnique({ where: { email } });

  if (existing) {
    throw new AppError(ERROR_CODES.EMAIL_EXISTS, "Email already in use", { email });
  }

  const passwordHash = await hashPassword(password);

  const result = await prisma.$transaction(async (tx) => {
    const user = await tx.user.create({
      data: {
        email,
        passwordHash,
        name,
      },
    });

    const workspace = await tx.workspace.create({
      data: {
        name: `${user.name}'s Workspace`,
      },
    });

    await tx.membership.create({
      data: {
        userId: user.id,
        workspaceId: workspace.id,
        role: Role.OWNER,
      },
    });

    await tx.project.create({
      data: {
        workspaceId: workspace.id,
        name: "General",
        isArchived: false,
      },
    });

    return user;
  });

  return result;
}
