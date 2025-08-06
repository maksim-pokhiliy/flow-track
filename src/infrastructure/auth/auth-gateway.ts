import bcrypt from "bcryptjs";

import { prisma } from "@app/infrastructure/database/prisma";

interface UserCredentials {
  id: string;
  email: string;
  name: string | null;
  image: string | null;
}

class AuthGateway {
  async validateCredentials(email: string, password: string): Promise<UserCredentials | null> {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user?.password) {
      return null;
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return null;
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      image: user.image,
    };
  }

  async onUserCreated(userId: string, email: string): Promise<void> {
    const name = email.split("@")[0];

    await prisma.workspace.create({
      data: {
        name: `${name}'s Workspace`,
        slug: this.generateSlug(name ?? "workspace"),
        ownerId: userId,
        members: {
          create: {
            userId,
            role: "OWNER",
          },
        },
      },
    });
  }

  private generateSlug(name: string): string {
    const randomId = Math.random().toString(36).substring(2, 8);
    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");

    return `${slug}-${randomId}`;
  }
}

export const authGateway = new AuthGateway();
