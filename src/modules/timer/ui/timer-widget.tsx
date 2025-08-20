"use client";

import { Pause, Play } from "lucide-react";
import { useEffect, useState } from "react";

import { Button, Typography } from "@app/components/ui";
import { useWorkspaceStore } from "@app/shared/store";

import { useActiveTimer, useStartTimer, useStopTimer } from "../api";

export function TimerWidget() {
  const { currentWorkspaceId } = useWorkspaceStore();
  const { data: activeTimer } = useActiveTimer(currentWorkspaceId);
  const { isPending: isStarting } = useStartTimer();
  const { mutate: stopTimer, isPending: isStopping } = useStopTimer();

  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (!activeTimer?.startTime) {
      setDuration(0);

      return;
    }

    const updateDuration = () => {
      const start = new Date(activeTimer.startTime).getTime();
      const now = Date.now();
      const seconds = Math.floor((now - start) / 1000);

      setDuration(seconds);
    };

    updateDuration();

    const interval = setInterval(updateDuration, 1000);

    return () => clearInterval(interval);
  }, [activeTimer?.startTime]);

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    }

    return `${minutes}:${secs.toString().padStart(2, "0")}`;
  };

  const handleToggle = () => {
    if (!currentWorkspaceId) {
      return;
    }

    if (activeTimer) {
      stopTimer({ workspaceId: currentWorkspaceId });
    } else {
      window.location.href = "/timer";
    }
  };

  const isRunning = Boolean(activeTimer);
  const isPending = isStarting || isStopping;

  if (!currentWorkspaceId) {
    return null;
  }

  return (
    <div className="flex items-center gap-2">
      {isRunning && (
        <>
          <Typography variant="caption" className="text-muted-foreground">
            {activeTimer?.project?.name}
          </Typography>

          <Typography variant="body2" className="font-mono">
            {formatDuration(duration)}
          </Typography>
        </>
      )}

      <Button
        size="icon"
        variant={isRunning ? "destructive" : "default"}
        onClick={handleToggle}
        disabled={isPending}
      >
        {isRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
      </Button>
    </div>
  );
}
