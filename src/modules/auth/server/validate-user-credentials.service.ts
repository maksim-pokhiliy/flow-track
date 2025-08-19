import { prisma } from "@app/shared/lib/server";

import { verifyPassword } from "./password.service";

export async function validateUserCredentials(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user?.passwordHash) {
    return null;
  }

  const isValid = await verifyPassword(password, user.passwordHash);
  const output = isValid ? user : null;

  return output;
}
