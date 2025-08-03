"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { loginUser, registerUser } from "../api";

export function useRegister() {
  const router = useRouter();

  return useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      toast.success("Account created successfully!");
      router.push("/dashboard");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}

export function useLogin() {
  const router = useRouter();

  return useMutation({
    mutationFn: loginUser,
    onSuccess: () => {
      toast.success("Welcome back!");
      router.push("/dashboard");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}
