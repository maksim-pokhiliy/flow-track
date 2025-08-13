"use client";

import { useQuery } from "@tanstack/react-query";

import { apiClient, unwrap } from "@app/shared/api";
import { qk } from "@app/shared/query-keys";

type Role = "OWNER" | "ADMIN" | "MEMBER";

export type WorkspaceListItem = {
  id: string;
  name: string;
  createdAt: string;
  role: Role;
};

export function useWorkspaces() {
  return useQuery({
    queryKey: qk.workspaces(),
    queryFn: async () => {
      const res = await apiClient<WorkspaceListItem[]>("/api/workspaces", { method: "GET" });

      return unwrap(res);
    },
  });
}
