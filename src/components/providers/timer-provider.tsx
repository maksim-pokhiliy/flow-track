"use client";

import { useEffect } from "react";

import { useActiveTimer } from "@app/modules/timer/api";
import { useTimerStore, useWorkspaceStore } from "@app/shared/store";

import { QueryWrapper } from "../layout";

export function TimerProvider({ children }: { children: React.ReactNode }) {
  const { data: activeTimer, error, isLoading } = useActiveTimer();
  const { currentWorkspaceId } = useWorkspaceStore();
  const { syncWithActiveTimer, clear } = useTimerStore();

  useEffect(() => {
    if (!isLoading) {
      if (activeTimer) {
        syncWithActiveTimer(activeTimer);
      } else {
        clear();
      }
    }
  }, [activeTimer, currentWorkspaceId, isLoading, syncWithActiveTimer, clear]);

  return (
    <QueryWrapper isLoading={isLoading} data error={error} loadingText="Loading timer...">
      {() => children}
    </QueryWrapper>
  );
}
