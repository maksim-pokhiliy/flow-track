"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { apiClient, unwrap } from "@app/shared/api";
import { MutationKeys } from "@app/shared/query-keys";

import type { StartTimerInput, TimeEntryDTO } from "../model";

type StartTimerParams = {
  workspaceId?: string | null;
  input: StartTimerInput;
};

export function useStartTimer() {
  return useMutation({
    mutationKey: [MutationKeys.TIMER_START],
    mutationFn: async ({ workspaceId, input }: StartTimerParams) => {
      const res = await apiClient<TimeEntryDTO>("/api/timer/start", {
        method: "POST",
        body: JSON.stringify({ ...input, workspaceId }),
      });

      return unwrap(res);
    },
    onSuccess: (data) => {
      toast.success(`Timer started${data.project?.name ? ` for ${data.project.name}` : ""}`);
    },
    onError: (err: Error) => {
      toast.error(err.message);
    },
  });
}
