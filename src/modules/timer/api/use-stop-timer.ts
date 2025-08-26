"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { apiClient, unwrap } from "@app/shared/api";
import { MutationKeys } from "@app/shared/query-keys";

import type { TimeEntryDTO } from "../model";

export function useStopTimer() {
  return useMutation({
    mutationKey: [MutationKeys.TIMER_STOP],
    mutationFn: async () => {
      const res = await apiClient<TimeEntryDTO | null>("/api/timer/stop", {
        method: "POST",
      });

      return unwrap(res);
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
    onError: (err: Error) => {
      toast.error(err.message);
    },
  });
}
