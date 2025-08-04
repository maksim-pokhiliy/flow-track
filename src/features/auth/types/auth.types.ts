import type { User as PrismaUser } from "@prisma/client";

export type User = PrismaUser;

export type UserPublic = Omit<User, "password">;

export type UserSession = Pick<User, "id" | "email" | "name" | "defaultHourlyRate" | "currency">;

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  defaultHourlyRate: number;
}

export interface AuthSession {
  user: UserSession;
}
