"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { apiClient, unwrap } from "@app/shared/api";

import type { StopTimerInput, TimeEntryDTO } from "../model";

type StopTimerParams = {
  workspaceId: string;
  input?: StopTimerInput;
};

export function useStopTimer() {
  return useMutation({
    mutationKey: ["timer:stop"],
    mutationFn: async ({ workspaceId, input }: StopTimerParams) => {
      const res = await apiClient<TimeEntryDTO | null>("/api/timer/stop", {
        method: "POST",
        body: JSON.stringify({ ...input, workspaceId }),
      });

      return unwrap(res);
    },
    onSuccess: (data) => {
      if (data) {
        const seconds = data.durationSec ?? 0;
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
