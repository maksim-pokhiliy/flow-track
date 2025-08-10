"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { toast } from "sonner";

import { LoginInput } from "../model";

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
      toast.success("Welcome back!");
      router.refresh();
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}
