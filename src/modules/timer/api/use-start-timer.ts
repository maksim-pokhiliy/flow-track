"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { apiClient, unwrap } from "@app/shared/api";

import type { StartTimerInput, TimeEntryDTO } from "../model";

type StartTimerParams = {
  workspaceId: string;
  input: StartTimerInput;
};

export function useStartTimer() {
  return useMutation({
    mutationKey: ["timer:start"],
    mutationFn: async ({ workspaceId, input }: StartTimerParams) => {
      const res = await apiClient<TimeEntryDTO>("/api/timer/start", {
        method: "POST",
        body: JSON.stringify({ ...input, workspaceId }),
      });

      return unwrap(res);
    },
    onSuccess: (data) => {
      toast.success(`Timer started for ${data.project?.name}`);
    },
    onError: (err: Error) => {
      toast.error(err.message);
    },
  });
}
