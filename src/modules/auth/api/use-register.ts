"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { toast } from "sonner";

import { apiClient, unwrap } from "@app/shared/api";
import { MutationKeys } from "@app/shared/query-keys";

type RegisterInput = { name: string; email: string; password: string };
type RegisteredUser = { id: string; name: string; email: string };

export function useRegister() {
  const router = useRouter();

  return useMutation({
    mutationKey: [MutationKeys.AUTH_REGISTER],
    mutationFn: async (input: RegisterInput) => {
      const res = await apiClient<RegisteredUser>("/api/auth/register", {
        method: "POST",
        body: JSON.stringify(input),
      });

      return unwrap(res);
    },
    onSuccess: async (_user, { email, password }) => {
      await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      toast.success("Account created");
      router.refresh();
    },
    onError: (err: Error) => toast.error(err.message),
  });
}
