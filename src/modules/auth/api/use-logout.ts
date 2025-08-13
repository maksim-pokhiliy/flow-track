"use client";

import { useMutation } from "@tanstack/react-query";
import { signOut } from "next-auth/react";
import { toast } from "sonner";

export function useLogout() {
  return useMutation({
    mutationKey: ["auth:logout"],
    mutationFn: async () => {
      await signOut();

      return true;
    },
    onSuccess: () => {
      toast.success("Logged out");
    },
    onError: (err: Error) => {
      toast.error(err.message);
    },
  });
}
