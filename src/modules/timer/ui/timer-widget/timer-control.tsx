"use client";

import { Pause, Play } from "lucide-react";

import { Button } from "@app/components/ui";
import { useTimerStore, useWorkspaceStore } from "@app/shared/store";

import { useActiveTimer, useStartTimer, useStopTimer } from "../../api";

export function TimerControl() {
  const { context } = useTimerStore();
  const { currentWorkspaceId } = useWorkspaceStore();

  const { data: activeTimer } = useActiveTimer();
  const { mutate: startTimer, isPending: isStarting } = useStartTimer();
  const { mutate: stopTimer, isPending: isStopping } = useStopTimer();

  const isRunning = Boolean(activeTimer);
  const isPending = isStarting || isStopping;

  const handleToggle = () => {
    if (isRunning) {
      stopTimer();
    } else {
      startTimer({ workspaceId: currentWorkspaceId, project: context.project, task: context.task });
    }
  };

  return (
    <Button
      size="icon"
      variant={isRunning ? "destructive" : "default"}
      onClick={handleToggle}
      disabled={isPending}
      loading={isPending}
      loadingText=""
      aria-label={isRunning ? "Stop timer" : "Start timer"}
    >
      {isRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
    </Button>
  );
}
