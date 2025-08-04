"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { loginUser, registerUser } from "../api";

function useAuthMutation<T>(
  mutationFn: (data: T) => Promise<{ success: boolean; error?: string }>,
  successMessage: string,
) {
  const router = useRouter();

  return useMutation({
    mutationFn,
    onSuccess: (result) => {
      if (!result.success) {
        toast.error(result.error);

        return;
      }

      toast.success(successMessage);
      router.push("/dashboard");
    },
  });
}

export function useRegister() {
  return useAuthMutation(registerUser, "Account created successfully!");
}

export function useLogin() {
  return useAuthMutation(loginUser, "Welcome back!");
}
