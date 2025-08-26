"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { apiClient, unwrap } from "@app/shared/api";
import { MutationKeys } from "@app/shared/query-keys";

type DeleteTaskParams = {
  workspaceId: string;
  projectId: string;
  taskId: string;
};

type DeleteResponse = { id: string };

export function useDeleteTask() {
  return useMutation({
    mutationKey: [MutationKeys.TASK_DELETE],
    mutationFn: async ({ workspaceId, projectId, taskId }: DeleteTaskParams) => {
      const res = await apiClient<DeleteResponse>(
        `/api/workspaces/${encodeURIComponent(workspaceId)}/projects/${encodeURIComponent(
          projectId,
        )}/tasks/${encodeURIComponent(taskId)}`,
        {
          method: "DELETE",
        },
      );

      return unwrap(res);
    },
    onSuccess: () => {
      toast.success("Task deleted");
    },
    onError: (err: Error) => {
      toast.error(err.message);
    },
  });
}
