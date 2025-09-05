"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { apiClient, unwrap } from "@app/shared/api";
import { MutationKeys } from "@app/shared/query-keys";

export function useDeleteTimeEntry() {
  return useMutation({
    mutationKey: [MutationKeys.TIMER_DELETE],
    mutationFn: async (entryId: string) => {
      const res = await apiClient(`/api/timer/entries/${entryId}`, {
        method: "DELETE",
      });

      return unwrap(res);
    },
    onSuccess: () => {
      toast.success("Time entry deleted");
    },
    onError: (err: Error) => {
      toast.error(err.message);
    },
  });
}
