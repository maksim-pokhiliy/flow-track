"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { apiClient, unwrap } from "@app/shared/api";
import { MutationKeys } from "@app/shared/query-keys";

type DeleteResponse = { id: string };

export function useDeleteWorkspace() {
  return useMutation({
    mutationKey: [MutationKeys.WORKSPACE_DELETE],
    mutationFn: async (id: string) => {
      const res = await apiClient<DeleteResponse>(`/api/workspaces/${encodeURIComponent(id)}`, {
        method: "DELETE",
      });

      return unwrap(res);
    },
    onSuccess: () => {
      toast.success("Workspace deleted");
    },
    onError: (err: Error) => {
      toast.error(err.message);
    },
  });
}
