"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { apiClient, unwrap } from "@app/shared/api";
import { MutationKeys, qk } from "@app/shared/query-keys";

import type { TimeEntryDTO } from "../model";

type StartTimerParams = {
  workspaceId?: string;
  project?: TimeEntryDTO["project"];
  task?: TimeEntryDTO["task"];
};

export function useStartTimer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [MutationKeys.TIMER_START],
    mutationFn: async (timer: StartTimerParams) => {
      const res = await apiClient<TimeEntryDTO>("/api/timer/start", {
        method: "POST",
        body: JSON.stringify({ ...timer }),
      });

      return unwrap(res);
    },
    onMutate: async (timer) => {
      await queryClient.cancelQueries({ queryKey: qk.activeTimer() });

      const optimisticTimer: TimeEntryDTO = {
        id: `temp-${Date.now()}`,
        project: timer.project,
        task: timer.task,
        workspaceId: timer?.workspaceId ?? null,
        projectId: timer?.project?.id ?? null,
        taskId: timer?.task?.id ?? null,
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
