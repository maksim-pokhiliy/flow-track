"use client";

import { useQuery } from "@tanstack/react-query";

import { apiClient, unwrap } from "@app/shared/api";
import { qk } from "@app/shared/query-keys";

import type { TimeEntryDTO } from "../model";

export function useActiveTimer(workspaceId: string | null) {
  return useQuery({
    queryKey: qk.activeTimer(workspaceId ?? ""),
    enabled: Boolean(workspaceId),
    queryFn: async () => {
      if (!workspaceId) {
        return null;
      }

      const res = await apiClient<TimeEntryDTO | null>(
        `/api/timer/current?workspaceId=${encodeURIComponent(workspaceId)}`,
        { method: "GET" },
      );

      return unwrap(res);
    },
    refetchInterval: 60_000,
  });
}
