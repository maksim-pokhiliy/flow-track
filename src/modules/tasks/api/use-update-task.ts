"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { apiClient, unwrap } from "@app/shared/api";
import { MutationKeys } from "@app/shared/query-keys";

import type { TaskDTO, UpdateTaskInput } from "../model";

type UpdateTaskParams = {
  workspaceId: string;
  projectId: string;
  taskId: string;
  input: UpdateTaskInput;
};

export function useUpdateTask() {
  return useMutation({
    mutationKey: [MutationKeys.TASK_UPDATE],
    mutationFn: async ({ workspaceId, projectId, taskId, input }: UpdateTaskParams) => {
      const res = await apiClient<TaskDTO>(
        `/api/workspaces/${encodeURIComponent(workspaceId)}/projects/${encodeURIComponent(
          projectId,
        )}/tasks/${encodeURIComponent(taskId)}`,
        {
          method: "PATCH",
          body: JSON.stringify(input),
        },
      );

      return unwrap(res);
    },
    onSuccess: (_, { input }) => {
      if (input.isCompleted !== undefined) {
        toast.success(input.isCompleted ? "Task completed" : "Task reopened");
      } else {
        toast.success("Task updated");
      }
    },
    onError: (err: Error) => {
      toast.error(err.message);
    },
  });
}
