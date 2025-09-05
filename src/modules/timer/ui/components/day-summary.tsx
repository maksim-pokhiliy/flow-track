"use client";

import { Typography } from "@app/components/ui";

import type { TimeEntryDTO } from "../../model";

interface DaySummaryProps {
  entries: TimeEntryDTO[];
}

export function DaySummary({ entries }: DaySummaryProps) {
  const today = new Date().toDateString();
  const weekStart = new Date();

  weekStart.setDate(weekStart.getDate() - weekStart.getDay());

  const todayTotal = entries
    .filter((entry) => new Date(entry.startedAt).toDateString() === today)
    .reduce((acc, entry) => acc + (entry.duration ?? 0), 0);

  const weekTotal = entries
    .filter((entry) => new Date(entry.startedAt) >= weekStart)
    .reduce((acc, entry) => acc + (entry.duration ?? 0), 0);

  const formatDuration = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);

    return `${hours}h ${minutes}m`;
  };

  return (
    <Typography variant="body1" className="text-muted-foreground">
      Today: {formatDuration(todayTotal)} | This week: {formatDuration(weekTotal)}
    </Typography>
  );
}
