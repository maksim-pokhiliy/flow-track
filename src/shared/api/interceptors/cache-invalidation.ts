"use client";

import type { QueryClient, QueryKey } from "@tanstack/react-query";

let _qc: QueryClient | null = null;

export function setQueryClientForInvalidation(client: QueryClient) {
  _qc = client;
}

function matchesTag(queryKey: QueryKey, tag: string) {
  return Array.isArray(queryKey) && String(queryKey[0]) === tag;
}

export function runCacheInvalidation(tags?: readonly string[]) {
  if (!_qc || !tags?.length) {
    return;
  }

  for (const tag of tags) {
    _qc.invalidateQueries({
      predicate: (q) => matchesTag(q.queryKey, tag),
    });
  }
}
