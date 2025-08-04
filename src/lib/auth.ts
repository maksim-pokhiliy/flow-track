import { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { z } from "zod";

import { APP_CONFIG } from "@app/lib/config";
import { env } from "@app/lib/env/env.server";
import { logger } from "@app/lib/logger";
import { UserRepository } from "@app/lib/repositories";
import { AuthService } from "@app/lib/services";

const loginSchema = z.object({
  email: z.email("Invalid email format"),
  password: z
    .string()
    .min(
      APP_CONFIG.validation.password.minLength,
      `Password must be at least ${APP_CONFIG.validation.password.minLength} characters`,
    ),
});

const authService = new AuthService(new UserRepository());

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            throw new Error("Email and password are required");
          }

          const validatedCredentials = loginSchema.parse(credentials);
          const user = await authService.authenticateUser(validatedCredentials);

          return user;
        } catch (error) {
          logger.error({ err: error, operation: "authorize" }, "Authentication error");

          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: APP_CONFIG.auth.sessionMaxAge,
  },
  jwt: {
    maxAge: APP_CONFIG.auth.jwtMaxAge,
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.defaultHourlyRate = user.defaultHourlyRate;
        token.currency = user.currency;
      }

      return token;
    },
    session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.name = token.name;
        session.user.defaultHourlyRate = token.defaultHourlyRate;
        session.user.currency = token.currency;
      }

      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: env.NEXTAUTH_SECRET,
  debug: env.NODE_ENV === "development",
};
