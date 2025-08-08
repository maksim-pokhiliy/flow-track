"use client";

import { prisma } from "@app/shared/lib";

import { hashPassword, verifyPassword } from "./password-service";

export async function registerWithEmail(email: string, password: string, name: string) {
  const existing = await prisma.user.findUnique({ where: { email } });

  if (existing) {
    throw new Error("Email already in use");
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
        role: "OWNER",
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

export async function validateUserCredentials(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user?.passwordHash) {
    return null;
  }

  const isValid = await verifyPassword(password, user.passwordHash);

  return isValid
    ? {
        id: user.id,
        email: user.email,
        name: user.name,
        image: user.image,
      }
    : null;
}
