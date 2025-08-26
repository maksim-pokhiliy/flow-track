"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { apiClient, unwrap } from "@app/shared/api";
import { MutationKeys } from "@app/shared/query-keys";

import type { CreateProjectInput, ProjectDTO } from "../model";

type CreateProjectParams = {
  workspaceId: string;
  input: CreateProjectInput;
};

export function useCreateProject() {
  return useMutation({
    mutationKey: [MutationKeys.PROJECT_CREATE],
    mutationFn: async ({ workspaceId, input }: CreateProjectParams) => {
      const res = await apiClient<ProjectDTO>(
        `/api/workspaces/${encodeURIComponent(workspaceId)}/projects`,
        {
          method: "POST",
          body: JSON.stringify(input),
        },
      );

      return unwrap(res);
    },
    onSuccess: () => {
      toast.success("Project created");
    },
    onError: (err: Error) => {
      toast.error(err.message);
    },
  });
}
