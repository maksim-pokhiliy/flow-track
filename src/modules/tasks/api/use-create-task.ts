"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { apiClient, unwrap } from "@app/shared/api";

import type { CreateTaskInput, TaskDTO } from "../model";

type CreateTaskParams = {
  workspaceId: string;
  projectId: string;
  input: CreateTaskInput;
};

export function useCreateTask() {
  return useMutation({
    mutationKey: ["task:create"],
    mutationFn: async ({ workspaceId, projectId, input }: CreateTaskParams) => {
      const res = await apiClient<TaskDTO>(
        `/api/workspaces/${encodeURIComponent(workspaceId)}/projects/${encodeURIComponent(
          projectId,
        )}/tasks`,
        {
          method: "POST",
          body: JSON.stringify(input),
        },
      );

      return unwrap(res);
    },
    onSuccess: () => {
      toast.success("Task created");
    },
    onError: (err: Error) => {
      toast.error(err.message);
    },
  });
}
