"use client";

import { EmptyState, QueryWrapper } from "@app/components/layout";

import type { TimeEntryDTO } from "../../model";

import { DayGroup } from "./day-group";

interface TimeEntriesListProps {
  entries: TimeEntryDTO[];
  isLoading: boolean;
}

export function TimeEntriesList({ entries, isLoading }: TimeEntriesListProps) {
  const entriesByDay = entries.reduce(
    (acc, entry) => {
      const date = new Date(entry.startedAt).toDateString();

      acc[date] ??= [];
      acc[date]?.push(entry);

      return acc;
    },
    {} as Record<string, TimeEntryDTO[]>,
  );

  const sortedDays = Object.keys(entriesByDay).sort((a, b) => {
    return new Date(b).getTime() - new Date(a).getTime();
  });

  return (
    <QueryWrapper
      isLoading={isLoading}
      isEmpty={() => entries.length === 0}
      data={sortedDays}
      renderEmpty={
        <EmptyState
          title="No time entries yet"
          description="Start tracking time with the timer in the header"
        />
      }
    >
      {(days) =>
        days.map((dateString) => (
          <DayGroup
            key={dateString}
            date={new Date(dateString)}
            entries={entriesByDay[dateString] ?? []}
          />
        ))
      }
    </QueryWrapper>
  );
}
