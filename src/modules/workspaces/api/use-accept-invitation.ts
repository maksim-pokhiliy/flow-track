"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { apiClient } from "@app/shared/api";

type AcceptResponse = { data: { workspaceId: string }; invalidate?: readonly string[] };

export function useAcceptInvitation() {
  return useMutation({
    mutationFn: async (token: string) => {
      const res = await apiClient<AcceptResponse>(
        `/api/invitations/${encodeURIComponent(token)}/accept`,
        { method: "POST" },
      );

      if (res.error) {
        throw new Error(res.error.message);
      }

      if (!res.data) {
        throw new Error("Empty response");
      }

      return res.data.data;
    },
    onSuccess: () => {
      toast.success("Invitation accepted");
    },
    onError: (err: Error) => toast.error(err.message),
  });
}
