"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { apiClient } from "@app/shared/api";
import { qk } from "@app/shared/query-keys";

type CreatedWorkspace = {
  id: string;
  name: string;
  createdAt: string;
};

type CreateResponse = { data: CreatedWorkspace; invalidate?: readonly string[] };

export function useCreateWorkspace() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (input: { name: string }) => {
      const res = await apiClient<CreateResponse>("/api/workspaces", {
        method: "POST",
        body: JSON.stringify(input),
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
      toast.success("Workspace created");
    },
    onError: (err: Error) => toast.error(err.message),
  });
}
