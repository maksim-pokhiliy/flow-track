import type { User } from "@prisma/client";
import bcrypt from "bcryptjs";

import { APP_CONFIG } from "@app/lib/config";
import { type CreateUserInput, type UserPublicData } from "@app/lib/repositories";

export interface CreateUserData {
  name: string;
  email: string;
  password: string;
  defaultHourlyRate?: number;
  currency?: string;
}

export interface AuthenticateUserData {
  email: string;
  password: string;
}

export interface IUserRepository {
  existsByEmail(email: string): Promise<boolean>;
  create(data: CreateUserInput): Promise<UserPublicData>;
  findByEmail(email: string): Promise<User | null>;
}

export class AuthService {
  constructor(private readonly userRepository: IUserRepository) {}

  async createUser(data: CreateUserData) {
    const { name, email, password, defaultHourlyRate, currency } = data;

    const userExists = await this.userRepository.existsByEmail(email);

    if (userExists) {
      throw new Error("User with this email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const userData: CreateUserInput = {
      name,
      email,
      password: hashedPassword,
      defaultHourlyRate: defaultHourlyRate ?? APP_CONFIG.defaults.hourlyRate,
      currency: currency ?? APP_CONFIG.defaults.currency,
    };

    return this.userRepository.create(userData);
  }

  async authenticateUser(data: AuthenticateUserData) {
    const { email, password } = data;

    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new Error("Invalid email or password");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error("Invalid email or password");
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      defaultHourlyRate: user.defaultHourlyRate,
      currency: user.currency,
    };
  }

  findUserByEmail(email: string) {
    return this.userRepository.findByEmail(email);
  }
}
