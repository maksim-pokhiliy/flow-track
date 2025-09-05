"use client";

import { format } from "date-fns";

import { Stack } from "@app/components/layout";
import { Typography } from "@app/components/ui";

import type { TimeEntryDTO } from "../../model";

import { TimeEntryCard } from "./time-entry-card";

interface DayGroupProps {
  date: Date;
  entries: TimeEntryDTO[];
}

export function DayGroup({ date, entries }: DayGroupProps) {
  const totalDuration = entries.reduce((acc, entry) => acc + (entry.duration ?? 0), 0);

  const formatDuration = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);

    return `${hours}h ${minutes.toString().padStart(2, "0")}m`;
  };

  const formatDate = (date: Date) => {
    const today = new Date().toDateString();
    const yesterday = new Date(Date.now() - 86400000).toDateString();

    if (date.toDateString() === today) {
      return "Today";
    } else if (date.toDateString() === yesterday) {
      return "Yesterday";
    } else {
      return format(date, "EEEE, MMM d");
    }
  };

  return (
    <Stack spacing={2}>
      <Stack direction="row" align="center" justify="between">
        <Typography variant="h3">{formatDate(date)}</Typography>

        <Typography variant="body2" className="text-muted-foreground">
          {formatDuration(totalDuration)}
        </Typography>
      </Stack>

      <Stack spacing={2}>
        {entries.map((entry) => (
          <TimeEntryCard key={entry.id} entry={entry} />
        ))}
      </Stack>
    </Stack>
  );
}
