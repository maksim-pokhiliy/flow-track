"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { apiClient, unwrapNullable } from "@app/shared/api";
import { MutationKeys, qk } from "@app/shared/query-keys";

import type { TimeEntryDTO } from "../model";

export function useStopTimer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [MutationKeys.TIMER_STOP],
    mutationFn: async () => {
      const res = await apiClient<TimeEntryDTO | null>("/api/timer/stop", {
        method: "POST",
      });

      return unwrapNullable(res);
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: qk.activeTimer() });

      const previousTimer = queryClient.getQueryData(qk.activeTimer());

      queryClient.setQueryData(qk.activeTimer(), null);

      return { previousTimer };
    },
    onSuccess: (data) => {
      if (data) {
        const seconds = data.duration ?? 0;
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);

        let duration = "";

        if (hours > 0) {
          duration = `${hours}h ${minutes % 60}m`;
        } else if (minutes > 0) {
          duration = `${minutes}m`;
        } else {
          duration = `${seconds}s`;
        }

        toast.success(`Timer stopped: ${duration}`);
      }
    },
    onError: (err, _, context) => {
      if (context?.previousTimer !== undefined) {
        queryClient.setQueryData(qk.activeTimer(), context.previousTimer);
      }

      toast.error(err.message);
    },
  });
}
