import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { type NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { authGateway } from "@app/infrastructure/auth/auth-gateway";
import { prisma } from "@app/infrastructure/database/prisma";

export const authConfig: NextAuthConfig = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await authGateway.validateCredentials(
          credentials.email as string,
          credentials.password as string,
        );

        if (!user) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  pages: {
    signIn: "/login",
    signOut: "/",
    error: "/login",
    newUser: "/dashboard",
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "credentials") {
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email ?? "" },
          select: { id: true, createdAt: true },
        });

        if (existingUser && Date.now() - existingUser.createdAt.getTime() < 10000) {
          if (user.email) {
            await authGateway.onUserCreated(existingUser.id, user.email);
          }
        }
      }

      return true;
    },
    jwt({ token, user }) {
      if (user) {
        token["id"] = user.id;
      }

      return token;
    },
    session({ session, token }) {
      if (token && session.user) {
        session.user.id = token["id"] as string;
      }

      return session;
    },
  },
  debug: process.env.NODE_ENV === "development",
};

export const { handlers, signIn, signOut, auth } = NextAuth(authConfig);
