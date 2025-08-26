"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { apiClient, unwrap } from "@app/shared/api";
import { MutationKeys } from "@app/shared/query-keys";

import type { TimeEntryDTO, UpdateTimerInput } from "../model";

type UpdateTimerParams = {
  workspaceId?: string | null;
  input: UpdateTimerInput;
};

export function useUpdateCurrentTimer() {
  return useMutation({
    mutationKey: [MutationKeys.TIMER_UPDATE],
    mutationFn: async ({ workspaceId, input }: UpdateTimerParams) => {
      const res = await apiClient<TimeEntryDTO>("/api/timer/current", {
        method: "PATCH",
        body: JSON.stringify({ ...input, workspaceId }),
      });

      return unwrap(res);
    },
    onSuccess: (data) => {
      if (data.projectId === null && data.taskId === null) {
        toast.success("Timer context cleared");
      } else {
        toast.success(
          `Timer context updated${data.project?.name ? ` to ${data.project.name}` : ""}`,
        );
      }
    },
    onError: (err: Error) => {
      toast.error(err.message);
    },
  });
}
