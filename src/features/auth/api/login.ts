import { signIn } from "next-auth/react";

import { LoginData } from "../types/auth.types";

export async function loginUser(data: LoginData) {
  const result = await signIn("credentials", {
    email: data.email,
    password: data.password,
    redirect: false,
  });

  if (!result || result.error) {
    return { success: false, error: "Invalid email or password" };
  }

  return { success: true };
}
