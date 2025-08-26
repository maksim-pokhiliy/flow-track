"use client";

import { Pause, Play } from "lucide-react";
import { useEffect } from "react";

import { Stack } from "@app/components/layout";
import { Badge, Button, Typography } from "@app/components/ui";
import { useTimerStore, useWorkspaceStore } from "@app/shared/store";

import { useActiveTimer, useStartTimer, useStopTimer } from "../api";

export function TimerWidget() {
  const { elapsed, syncWithActiveTimer, clear } = useTimerStore();
  const { currentWorkspaceId } = useWorkspaceStore();

  const { data: activeTimer } = useActiveTimer();
  const { mutate: startTimer, isPending: isStarting } = useStartTimer();
  const { mutate: stopTimer, isPending: isStopping } = useStopTimer();

  useEffect(() => {
    if (activeTimer) {
      syncWithActiveTimer({
        startedAt: activeTimer.startedAt,
        workspaceId: activeTimer.workspaceId,
        projectId: activeTimer.projectId,
        taskId: activeTimer.taskId,
      });
    } else {
      clear();
    }
  }, [activeTimer, syncWithActiveTimer, clear]);

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleToggle = () => {
    if (activeTimer) {
      stopTimer();
    } else {
      startTimer({ workspaceId: currentWorkspaceId, input: {} });
    }
  };

  const isRunning = Boolean(activeTimer);
  const isPending = isStarting || isStopping;

  return (
    <Stack direction="row" spacing={2} align="center">
      {isRunning && activeTimer && (
        <>
          {activeTimer.workspaceId && activeTimer.workspace && (
            <Badge variant="secondary" className="text-muted-foreground">
              {activeTimer.workspace.name}
            </Badge>
          )}

          <Typography variant="body2" className="font-mono">
            {formatDuration(elapsed)}
          </Typography>
        </>
      )}

      <Button
        size="icon"
        variant={isRunning ? "destructive" : "default"}
        onClick={handleToggle}
        disabled={isPending}
        loading={isPending}
        loadingText=""
      >
        {isRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
      </Button>
    </Stack>
  );
}
