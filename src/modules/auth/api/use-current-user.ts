"use client";

import { useQuery } from "@tanstack/react-query";

import { QueryKeys } from "@app/shared/query-keys";

type SessionUser = {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
};

type SessionResponse = {
  user?: SessionUser;
  expires?: string;
} | null;

export function useCurrentUser() {
  return useQuery({
    queryKey: [QueryKeys.AUTH_SESSION],
    queryFn: async () => {
      const res = await fetch("/api/auth/session", { credentials: "same-origin" });

      if (!res.ok) {
        return null as SessionResponse;
      }

      const data = (await res.json()) as SessionResponse;

      return data;
    },
    staleTime: 60_000,
  });
}
