"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { apiClient, unwrap } from "@app/shared/api";
import { MutationKeys } from "@app/shared/query-keys";

type WorkspaceDTO = {
  id: string;
  name: string;
  createdAt: string;
};

type UpdateInput = {
  id: string;
  name: string;
};

export function useUpdateWorkspace() {
  return useMutation({
    mutationKey: [MutationKeys.WORKSPACE_UPDATE],
    mutationFn: async ({ id, name }: UpdateInput) => {
      const res = await apiClient<WorkspaceDTO>(`/api/workspaces/${encodeURIComponent(id)}`, {
        method: "PATCH",
        body: JSON.stringify({ name }),
      });

      return unwrap(res);
    },
    onSuccess: () => {
      toast.success("Workspace renamed");
    },
    onError: (err: Error) => {
      toast.error(err.message);
    },
  });
}
