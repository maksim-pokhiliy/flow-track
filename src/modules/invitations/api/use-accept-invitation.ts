"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { apiClient, unwrap } from "@app/shared/api";
import { MutationKeys } from "@app/shared/query-keys";

type AcceptResponse = { workspaceId: string };

export function useAcceptInvitation() {
  return useMutation({
    mutationKey: [MutationKeys.INVITATION_ACCEPT],
    mutationFn: async (token: string) => {
      const res = await apiClient<AcceptResponse>(
        `/api/invitations/${encodeURIComponent(token)}/accept`,
        { method: "POST" },
      );

      return unwrap(res);
    },
    onSuccess: () => {
      toast.success("Invitation accepted");
    },
    onError: (err: Error) => {
      toast.error(err.message);
    },
  });
}
