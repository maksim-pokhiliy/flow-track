import type { User } from "@prisma/client";

import { BaseRepository } from "./base.repository";

export interface CreateUserInput {
  name: string;
  email: string;
  password: string;
  defaultHourlyRate: number;
  currency: string;
}

export interface UserPublicData {
  id: string;
  name: string;
  email: string;
  defaultHourlyRate: number;
  currency: string;
  createdAt: Date;
}

export class UserRepository extends BaseRepository {
  async findByEmail(email: string): Promise<User | null> {
    try {
      return await this.db.user.findUnique({
        where: { email: email.toLowerCase() },
      });
    } catch (error) {
      this.handleError(error, "findByEmail");
    }
  }

  async findById(id: string): Promise<User | null> {
    try {
      return await this.db.user.findUnique({
        where: { id },
      });
    } catch (error) {
      this.handleError(error, "findById");
    }
  }

  async create(data: CreateUserInput): Promise<UserPublicData> {
    try {
      return await this.db.user.create({
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
      });
    } catch (error) {
      this.handleError(error, "create");
    }
  }

  async update(id: string, data: Partial<CreateUserInput>): Promise<UserPublicData> {
    try {
      return await this.db.user.update({
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
      });
    } catch (error) {
      this.handleError(error, "update");
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.db.user.delete({
        where: { id },
      });
    } catch (error) {
      this.handleError(error, "delete");
    }
  }

  async existsByEmail(email: string): Promise<boolean> {
    try {
      const user = await this.db.user.findUnique({
        where: { email: email.toLowerCase() },
        select: { id: true },
      });

      return !!user;
    } catch (error) {
      this.handleError(error, "existsByEmail");
    }
  }
}
