"use client";

import { useQuery } from "@tanstack/react-query";

import { apiClient, unwrap } from "@app/shared/api";
import { qk } from "@app/shared/query-keys";

import type { TimeEntryDTO } from "../model";

type UseTimeEntriesOptions = {
  workspaceId: string | null;
  projectId?: string;
  limit?: number;
};

export function useTimeEntries({ workspaceId, projectId, limit = 50 }: UseTimeEntriesOptions) {
  return useQuery({
    queryKey: qk.timeEntries(workspaceId ?? "", projectId),
    enabled: Boolean(workspaceId),
    queryFn: async () => {
      if (!workspaceId) {
        return [];
      }

      const params = new URLSearchParams({
        workspaceId,
        ...(projectId && { projectId }),
        limit: limit.toString(),
      });

      const res = await apiClient<TimeEntryDTO[]>(`/api/timer/entries?${params.toString()}`, {
        method: "GET",
      });

      return unwrap(res);
    },
  });
}
