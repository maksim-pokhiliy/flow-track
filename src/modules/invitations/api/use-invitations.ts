"use client";

import { InvitationStatus, Role } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

import { apiClient, unwrap } from "@app/shared/api";
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
    enabled: Boolean(workspaceId),
    queryFn: async () => {
      const res = await apiClient<InvitationListItem[]>(
        `/api/workspaces/${encodeURIComponent(workspaceId)}/invitations`,
        { method: "GET" },
      );

      return unwrap(res);
    },
  });
}
