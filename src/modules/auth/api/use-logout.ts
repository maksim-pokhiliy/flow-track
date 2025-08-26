"use client";

import { useMutation } from "@tanstack/react-query";
import { signOut } from "next-auth/react";
import { toast } from "sonner";

import { MutationKeys } from "@app/shared/query-keys";

export function useLogout() {
  return useMutation({
    mutationKey: [MutationKeys.AUTH_LOGOUT],
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
