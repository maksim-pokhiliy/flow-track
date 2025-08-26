import { useQuery } from "@tanstack/react-query";

import { apiClient, unwrapNullable } from "@app/shared/api";
import { qk } from "@app/shared/query-keys";

import type { TimeEntryDTO } from "../model";

export function useActiveTimer() {
  return useQuery({
    queryKey: qk.activeTimer(),
    queryFn: async () => {
      const res = await apiClient<TimeEntryDTO>("/api/timer/current");

      return unwrapNullable(res);
    },
  });
}
