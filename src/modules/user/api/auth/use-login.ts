"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

type LoginInput = {
  email: string;
  password: string;
};

export function useLogin() {
  const router = useRouter();

  return useMutation({
    mutationFn: async ({ email, password }: LoginInput) => {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        throw new Error("Invalid email or password");
      }

      return result;
    },
    onSuccess: () => {
      router.refresh();
    },
  });
}
