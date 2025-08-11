"use client";

import { Role } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { apiClient } from "@app/shared/api";
import { qk } from "@app/shared/query-keys";

import { InvitationListItem } from "./use-invitations";

type CreateInvitationInput = {
  email: string;
  role: Role;
};

type CreateInvitationResponse = {
  data: InvitationListItem;
  invalidate?: readonly string[];
};

export function useCreateInvitation(workspaceId: string) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (input: CreateInvitationInput) => {
      const res = await apiClient<CreateInvitationResponse>(
        `/api/workspaces/${workspaceId}/invitations`,
        {
          method: "POST",
          body: JSON.stringify(input),
        },
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
      toast.success("Invitation sent");
    },
    onError: (err: Error) => toast.error(err.message),
  });
}
