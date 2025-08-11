"use client";

import { InvitationStatus, Role } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

import { apiClient } from "@app/shared/api";
import { qk } from "@app/shared/query-keys";

export type InvitationListItem = {
  id: string;
  email: string;
  role: Role;
  status: InvitationStatus;
  token: string;
  createdAt: string;
};

export function useInvitations(workspaceId: string) {
  return useQuery({
    queryKey: qk.invitations(workspaceId),
    queryFn: async () => {
      const res = await apiClient<InvitationListItem[]>(
        `/api/invitations?workspaceId=${encodeURIComponent(workspaceId)}`,
        { method: "GET" },
      );

      if (res.error) {
        throw new Error(res.error.message);
      }

      return res.data ?? [];
    },
    enabled: Boolean(workspaceId),
  });
}
