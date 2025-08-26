"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { apiClient, unwrap } from "@app/shared/api";
import { MutationKeys } from "@app/shared/query-keys";

type RevokeResponse = { id: string };

export function useRevokeInvitation() {
  return useMutation({
    mutationKey: [MutationKeys.INVITATION_REVOKE],
    mutationFn: async (token: string) => {
      const res = await apiClient<RevokeResponse>(
        `/api/invitations/${encodeURIComponent(token)}/revoke`,
        { method: "POST" },
      );

      return unwrap(res);
    },
    onSuccess: () => {
      toast.success("Invitation revoked");
    },
    onError: (err: Error) => {
      toast.error(err.message);
    },
  });
}
