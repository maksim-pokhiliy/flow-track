"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { apiClient } from "@app/shared/api";
import { qk } from "@app/shared/query-keys";

type RevokeResponse = { data: { id: string }; invalidate?: readonly string[] };

export function useRevokeInvitation(workspaceId: string) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (invitationId: string) => {
      const res = await apiClient<RevokeResponse>(
        `/api/invitations/${encodeURIComponent(invitationId)}/revoke`,
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
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: qk.invitations(workspaceId) });
      toast.success("Invitation revoked");
    },
    onError: (err: Error) => toast.error(err.message),
  });
}
