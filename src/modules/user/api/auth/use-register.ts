import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { toast } from "sonner";

import { apiClient } from "@app/shared/api/api-client";

import type { RegisterInput } from "../../model";

type RegisterResponse = {
  id: string;
  email: string;
  name: string | null;
};

export function useRegister() {
  const router = useRouter();

  return useMutation({
    mutationFn: async (input: RegisterInput) => {
      const response = await apiClient<RegisterResponse>("/api/auth/register", {
        method: "POST",
        body: JSON.stringify(input),
      });

      if (response.error) {
        throw new Error(response.error.message);
      }

      return response.data;
    },
    onSuccess: async (_, variables) => {
      toast.success("Account created successfully!");

      const signInResult = await signIn("credentials", {
        email: variables.email,
        password: variables.password,
        redirect: false,
      });

      if (signInResult?.ok) {
        router.refresh();
      } else {
        toast.error("Account created but login failed. Please try logging in.");
      }
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}
