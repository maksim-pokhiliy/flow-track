"use client";

import { Role } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { apiClient, unwrap } from "@app/shared/api";

type CreateInvitationInput = {
  email: string;
  role: Role;
};

type InvitationDTO = {
  id: string;
  email: string;
  role: Role;
  status: "PENDING" | "ACCEPTED" | "REVOKED" | "EXPIRED";
  token: string;
  createdAt: string;
};

export function useCreateInvitation(workspaceId: string) {
  return useMutation({
    mutationKey: ["invitation:create", workspaceId],
    mutationFn: async (input: CreateInvitationInput) => {
      const res = await apiClient<InvitationDTO>(
        `/api/workspaces/${encodeURIComponent(workspaceId)}/invitations`,
        {
          method: "POST",
          body: JSON.stringify(input),
        },
      );

      return unwrap(res);
    },
    onSuccess: () => {
      toast.success("Invitation sent");
    },
    onError: (err: Error) => {
      toast.error(err.message);
    },
  });
}
