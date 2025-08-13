"use client";

import { Invitation } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

import { apiClient } from "@app/shared/api";
import { qk } from "@app/shared/query-keys";

type GetInvitationResponse = {
  data: Invitation;
};

export function useInvitation(token: string | null | undefined) {
  return useQuery({
    queryKey: qk.invitation(token ?? ""),
    enabled: Boolean(token),
    queryFn: async () => {
      const res = await apiClient<GetInvitationResponse>(`/api/invitations/${encodeURIComponent(token ?? "")}`, {
        method: "GET",
      });

      if (res.error) {
        throw new Error(res.error.message ?? "Failed to load invitation");
      }

      if (!res.data) {
        throw new Error("Empty response");
      }

      return unwrap(res);
    },
  });
}
