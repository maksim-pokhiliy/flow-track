"use client";

import { useQuery } from "@tanstack/react-query";

import { apiClient, unwrap } from "@app/shared/api";
import { qk } from "@app/shared/query-keys";

import type { TaskDTO } from "../model";

export function useTasks(workspaceId: string, projectId: string) {
  return useQuery({
    queryKey: qk.tasks(projectId),
    enabled: Boolean(workspaceId && projectId),
    queryFn: async () => {
      const res = await apiClient<TaskDTO[]>(
        `/api/workspaces/${encodeURIComponent(workspaceId)}/projects/${encodeURIComponent(
          projectId,
        )}/tasks`,
        { method: "GET" },
      );

      return unwrap(res);
    },
  });
}
