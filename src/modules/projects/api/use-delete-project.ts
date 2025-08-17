"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { apiClient, unwrap } from "@app/shared/api";

type DeleteProjectParams = {
  workspaceId: string;
  projectId: string;
};

type DeleteResponse = { id: string };

export function useDeleteProject() {
  return useMutation({
    mutationKey: ["project:delete"],
    mutationFn: async ({ workspaceId, projectId }: DeleteProjectParams) => {
      const res = await apiClient<DeleteResponse>(
        `/api/workspaces/${encodeURIComponent(workspaceId)}/projects/${encodeURIComponent(
          projectId,
        )}`,
        {
          method: "DELETE",
        },
      );

      return unwrap(res);
    },
    onSuccess: () => {
      toast.success("Project deleted");
    },
    onError: (err: Error) => {
      toast.error(err.message);
    },
  });
}
