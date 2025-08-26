"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { apiClient, unwrap } from "@app/shared/api";
import { MutationKeys, qk } from "@app/shared/query-keys";

import type { StartTimerInput, TimeEntryDTO } from "../model";

type StartTimerParams = {
  workspaceId?: string | null;
  input: StartTimerInput;
};

export function useStartTimer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [MutationKeys.TIMER_START],
    mutationFn: async ({ workspaceId, input }: StartTimerParams) => {
      const res = await apiClient<TimeEntryDTO>("/api/timer/start", {
        method: "POST",
        body: JSON.stringify({ ...input, workspaceId }),
      });

      return unwrap(res);
    },
    onMutate: async ({ workspaceId, input }) => {
      await queryClient.cancelQueries({ queryKey: qk.activeTimer() });

      const optimisticTimer: TimeEntryDTO = {
        id: `temp-${Date.now()}`,
        workspaceId: workspaceId ?? null,
        projectId: input.projectId ?? null,
        taskId: input.taskId ?? null,
        userId: "temp",
        startedAt: new Date(),
        endTime: null,
        duration: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const previousTimer = queryClient.getQueryData(qk.activeTimer());

      queryClient.setQueryData(qk.activeTimer(), optimisticTimer);

      return { previousTimer };
    },
    onSuccess: (data) => {
      queryClient.setQueryData(qk.activeTimer(), data);
      toast.success(`Timer started${data.project?.name ? ` for ${data.project.name}` : ""}`);
    },
    onError: (err: Error, _, context) => {
      if (context?.previousTimer !== undefined) {
        queryClient.setQueryData(qk.activeTimer(), context.previousTimer);
      }

      toast.error(err.message);
    },
  });
}
