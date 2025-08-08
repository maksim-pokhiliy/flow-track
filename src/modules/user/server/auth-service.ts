import { prisma } from "@app/shared/lib";

import { hashPassword, verifyPassword } from "./password-service";

export async function registerWithEmail(email: string, password: string) {
  const existing = await prisma.user.findUnique({ where: { email } });

  if (existing) throw new Error("Email already in use");

  const passwordHash = await hashPassword(password);

  return prisma.user.create({
    data: { email, passwordHash },
  });
}

export async function validateUserCredentials(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user?.passwordHash) return null;

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
