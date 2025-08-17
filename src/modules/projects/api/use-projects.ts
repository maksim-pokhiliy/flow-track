"use client";

import { useQuery } from "@tanstack/react-query";

import { apiClient, unwrap } from "@app/shared/api";
import { qk } from "@app/shared/query-keys";

import type { ProjectDTO } from "../model";

export function useProjects(workspaceId: string) {
  return useQuery({
    queryKey: qk.projects(workspaceId),
    enabled: Boolean(workspaceId),
    queryFn: async () => {
      const res = await apiClient<ProjectDTO[]>(
        `/api/workspaces/${encodeURIComponent(workspaceId)}/projects`,
        { method: "GET" },
      );

      return unwrap(res);
    },
  });
}
