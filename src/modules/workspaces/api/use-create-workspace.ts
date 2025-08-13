"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { apiClient, unwrap } from "@app/shared/api";

type WorkspaceDTO = {
  id: string;
  name: string;
  createdAt: string;
};

export function useCreateWorkspace() {
  return useMutation({
    mutationKey: ["workspace:create"],
    mutationFn: async (input: { name: string }) => {
      const res = await apiClient<WorkspaceDTO>("/api/workspaces", {
        method: "POST",
        body: JSON.stringify(input),
      });

      return unwrap(res);
    },
    onSuccess: () => {
      toast.success("Workspace created");
    },
    onError: (err: Error) => {
      toast.error(err.message);
    },
  });
}
