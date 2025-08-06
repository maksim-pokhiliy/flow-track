import bcrypt from "bcryptjs";

import { prisma } from "@app/infrastructure/database/prisma";

import type {
  CreateUserDto,
  IUserRepository,
  Result,
  UserDto,
} from "../domain/repositories/user.repository.interface";

export class UserRepository implements IUserRepository {
  async create(data: CreateUserDto): Promise<Result<UserDto>> {
    try {
      const existingUser = await this.existsByEmail(data.email);

      if (existingUser) {
        return {
          success: false,
          error: new Error("User with this email already exists"),
        };
      }

      const hashedPassword = await bcrypt.hash(data.password, 12);

      const user = await prisma.user.create({
        data: {
          email: data.email,
          password: hashedPassword,
          name: data.name,
        },
      });

      return {
        success: true,
        data: user,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error : new Error("Failed to create user"),
      };
    }
  }

  async findById(id: string): Promise<UserDto | null> {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    return user;
  }

  async findByEmail(email: string): Promise<UserDto | null> {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    return user;
  }

  async existsByEmail(email: string): Promise<boolean> {
    const count = await prisma.user.count({
      where: { email },
    });

    return count > 0;
  }
}
