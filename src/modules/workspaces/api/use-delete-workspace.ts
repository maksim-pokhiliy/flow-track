"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { apiClient } from "@app/shared/api";
import { qk } from "@app/shared/query-keys";

type DeleteResponse = { data: { id: string }; invalidate?: readonly string[] };

export function useDeleteWorkspace() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (input: { id: string }) => {
      const res = await apiClient<DeleteResponse>(`/api/workspaces/${input.id}`, {
        method: "DELETE",
      });

      if (res.error) {
        throw new Error(res.error.message);
      }

      if (!res.data) {
        throw new Error("Empty response");
      }

      return res.data.data;
    },
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: qk.workspaces() });
      toast.success("Workspace deleted");
    },
    onError: (err: Error) => toast.error(err.message),
  });
}
