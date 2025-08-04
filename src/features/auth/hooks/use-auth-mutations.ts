"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { loginUser, registerUser } from "../api";

export function useRegister() {
  const router = useRouter();

  return useMutation({
    mutationFn: registerUser,
    onSuccess: (result) => {
      if (!result.success) {
        toast.error(result.error);

        return;
      }

      toast.success("Account created successfully!");
      router.push("/dashboard");
    },
  });
}

export function useLogin() {
  const router = useRouter();

  return useMutation({
    mutationFn: loginUser,
    onSuccess: (result) => {
      if (!result.success) {
        toast.error(result.error);

        return;
      }

      toast.success("Welcome back!");
      router.push("/dashboard");
    },
  });
}
