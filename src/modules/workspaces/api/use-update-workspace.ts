"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { apiClient } from "@app/shared/api";
import { qk } from "@app/shared/query-keys";

type UpdatedWorkspace = {
  id: string;
  name: string;
  createdAt: string;
};

type UpdateResponse = { data: UpdatedWorkspace; invalidate?: readonly string[] };

export function useUpdateWorkspace() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (input: { id: string; name: string }) => {
      const res = await apiClient<UpdateResponse>(`/api/workspaces/${input.id}`, {
        method: "PATCH",
        body: JSON.stringify({ name: input.name }),
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
      toast.success("Workspace updated");
    },
    onError: (err: Error) => toast.error(err.message),
  });
}
