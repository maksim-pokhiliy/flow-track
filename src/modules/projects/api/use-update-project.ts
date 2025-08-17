"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { apiClient, unwrap } from "@app/shared/api";

import type { ProjectDTO, UpdateProjectInput } from "../model";

type UpdateProjectParams = {
  workspaceId: string;
  projectId: string;
  input: UpdateProjectInput;
};

export function useUpdateProject() {
  return useMutation({
    mutationKey: ["project:update"],
    mutationFn: async ({ workspaceId, projectId, input }: UpdateProjectParams) => {
      const res = await apiClient<ProjectDTO>(
        `/api/workspaces/${encodeURIComponent(workspaceId)}/projects/${encodeURIComponent(
          projectId,
        )}`,
        {
          method: "PATCH",
          body: JSON.stringify(input),
        },
      );

      return unwrap(res);
    },
    onSuccess: (_, { input }) => {
      if (input.isArchived !== undefined) {
        toast.success(input.isArchived ? "Project archived" : "Project restored");
      } else {
        toast.success("Project updated");
      }
    },
    onError: (err: Error) => {
      toast.error(err.message);
    },
  });
}
