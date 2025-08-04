import type { User } from "@prisma/client";

import { BaseRepository } from "./base.repository";
import type { UserCreate, UserPublicData } from "./user.types";

export class UserRepository extends BaseRepository {
  findByEmail(email: string): Promise<User | null> {
    return this.execute("findByEmail", () =>
      this.db.user.findUnique({
        where: { email: email.toLowerCase() },
      }),
    );
  }

  findById(id: string): Promise<User | null> {
    return this.execute("findById", () =>
      this.db.user.findUnique({
        where: { id },
      }),
    );
  }

  create(data: Required<UserCreate>): Promise<UserPublicData> {
    return this.execute("create", () =>
      this.db.user.create({
        data: {
          name: data.name,
          email: data.email.toLowerCase(),
          password: data.password,
          defaultHourlyRate: data.defaultHourlyRate,
          currency: data.currency,
        },
        select: {
          id: true,
          name: true,
          email: true,
          defaultHourlyRate: true,
          currency: true,
          createdAt: true,
        },
      }),
    );
  }

  update(id: string, data: Partial<UserCreate>): Promise<UserPublicData> {
    return this.execute("update", () =>
      this.db.user.update({
        where: { id },
        data,
        select: {
          id: true,
          name: true,
          email: true,
          defaultHourlyRate: true,
          currency: true,
          createdAt: true,
        },
      }),
    );
  }

  async delete(id: string): Promise<void> {
    await this.execute("delete", () =>
      this.db.user.delete({
        where: { id },
      }),
    );
  }

  existsByEmail(email: string): Promise<boolean> {
    return this.execute("existsByEmail", async () => {
      const user = await this.db.user.findUnique({
        where: { email: email.toLowerCase() },
        select: { id: true },
      });

      return !!user;
    });
  }
}
