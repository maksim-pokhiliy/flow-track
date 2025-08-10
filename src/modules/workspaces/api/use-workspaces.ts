"use client";

import { Role } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

import { apiClient } from "@app/shared/api";
import { qk } from "@app/shared/query-keys";

export type WorkspaceListItem = {
  id: string;
  name: string;
  createdAt: string;
  role: Role;
};

type ListResponse = { data: WorkspaceListItem[] };

export function useWorkspaces() {
  return useQuery({
    queryKey: qk.workspaces(),
    queryFn: async () => {
      const res = await apiClient<ListResponse>("/api/workspaces", { method: "GET" });

      if (res.error) {
        throw new Error(res.error.message);
      }

      if (!res.data) {
        throw new Error("Empty response");
      }

      return res.data.data;
    },
  });
}
