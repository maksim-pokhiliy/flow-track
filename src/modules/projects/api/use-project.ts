"use client";

import { useQuery } from "@tanstack/react-query";

import { apiClient, unwrap } from "@app/shared/api";
import { qk } from "@app/shared/query-keys";

import type { ProjectDTO } from "../model";

export function useProject(workspaceId: string, projectId: string) {
  return useQuery({
    queryKey: qk.project(workspaceId, projectId),
    enabled: Boolean(workspaceId && projectId),
    queryFn: async () => {
      const res = await apiClient<ProjectDTO>(
        `/api/workspaces/${encodeURIComponent(workspaceId)}/projects/${encodeURIComponent(
          projectId,
        )}`,
        { method: "GET" },
      );

      return unwrap(res);
    },
  });
}
