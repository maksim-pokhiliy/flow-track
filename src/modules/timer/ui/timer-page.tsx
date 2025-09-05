"use client";

import { useState } from "react";

import { ContentSection } from "@app/components/layout";
import { useWorkspaceStore } from "@app/shared/store";

import { useTimeEntries } from "../api";

import { DaySummary, TimeEntriesList, TimeFilters } from "./components";

export function TimerPage() {
  const { currentWorkspaceId } = useWorkspaceStore();
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: new Date(new Date().setDate(new Date().getDate() - 7)),
    to: new Date(),
  });
  const [projectFilter, setProjectFilter] = useState<string | null>(null);

  const { data: entries = [], isLoading } = useTimeEntries({
    workspaceId: currentWorkspaceId,
    projectId: projectFilter ?? undefined,
  });

  const filteredEntries = entries.filter((entry) => {
    const entryDate = new Date(entry.startedAt);

    return entryDate >= dateRange.from && entryDate <= dateRange.to;
  });

  return (
    <ContentSection
      maxWidth="2xl"
      title="Time Tracking"
      subtitle={<DaySummary entries={filteredEntries} />}
    >
      <TimeFilters
        dateRange={dateRange}
        onDateRangeChange={setDateRange}
        projectFilter={projectFilter}
        onProjectFilterChange={setProjectFilter}
      />

      <TimeEntriesList entries={filteredEntries} isLoading={isLoading} />
    </ContentSection>
  );
}
