import { prisma } from "@app/shared/lib/server";

import { verifyPassword } from "./password.service";

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
