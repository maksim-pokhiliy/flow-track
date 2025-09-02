"use client";

import { Typography } from "@app/components/ui";
import { useTimerStore } from "@app/shared/store";

import { useActiveTimer } from "../../api";

export function TimerDisplay() {
  const { elapsed } = useTimerStore();
  const { data: activeTimer } = useActiveTimer();

  const formatDuration = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  if (!activeTimer) {
    return null;
  }

  return (
    <Typography variant="body2" className="font-mono tabular-nums">
      {formatDuration(elapsed)}
    </Typography>
  );
}
