"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { toast } from "sonner";

type LoginInput = {
  email: string;
  password: string;
};

export function useLogin() {
  const router = useRouter();

  return useMutation({
    mutationKey: ["auth:login"],
    mutationFn: async ({ email, password }: LoginInput) => {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (!res || res.error) {
        throw new Error(res?.error ?? "Invalid email or password");
      }

      return true;
    },
    onSuccess: () => {
      toast.success("Logged in");
      router.refresh();
    },
    onError: (err: Error) => {
      toast.error(err.message);
    },
  });
}
