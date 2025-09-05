"use client";

import { format } from "date-fns";
import { ChevronDown, Clock } from "lucide-react";
import { useState } from "react";

import { Stack } from "@app/components/layout";
import {
  Badge,
  Button,
  Card,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  Typography,
} from "@app/components/ui";
import { cn } from "@app/shared/lib";

import type { TimeEntryDTO } from "../../model";

import { TimeEntryCard } from "./time-entry-card";

interface DayGroupProps {
  date: Date;
  entries: TimeEntryDTO[];
}

interface GroupedEntries {
  project: TimeEntryDTO["project"];
  task: TimeEntryDTO["task"];
  entries: TimeEntryDTO[];
  totalDuration: number;
}

export function DayGroup({ date, entries }: DayGroupProps) {
  const [openGroups, setOpenGroups] = useState<Set<string>>(new Set());

  const grouped: GroupedEntries[] = [];
  let currentGroup: TimeEntryDTO[] = [];
  let lastProject: string | null = null;
  let lastTask: string | null = null;

  entries.forEach((entry, index) => {
    const currentProject = entry.project?.id ?? null;
    const currentTask = entry.task?.id ?? null;

    if (currentProject !== lastProject || currentTask !== lastTask) {
      if (currentGroup.length > 0) {
        grouped.push({
          project: currentGroup[0]?.project ?? null,
          task: currentGroup[0]?.task ?? null,
          entries: currentGroup,
          totalDuration: currentGroup.reduce((acc, e) => acc + (e.duration ?? 0), 0),
        });
      }

      currentGroup = [entry];
      lastProject = currentProject;
      lastTask = currentTask;
    } else {
      currentGroup.push(entry);
    }

    if (index === entries.length - 1 && currentGroup.length > 0) {
      grouped.push({
        project: currentGroup[0]?.project ?? null,
        task: currentGroup[0]?.task ?? null,
        entries: currentGroup,
        totalDuration: currentGroup.reduce((acc, e) => acc + (e.duration ?? 0), 0),
      });
    }
  });

  const totalDuration = entries.reduce((acc, entry) => acc + (entry.duration ?? 0), 0);
  const groupedCount = grouped.filter((g) => g.entries.length > 1).length;
  const singleCount = grouped.filter((g) => g.entries.length === 1).length;

  const formatDate = (date: Date) => {
    const today = new Date();
    const yesterday = new Date(today);

    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return "Today";
    }

    if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    }

    return format(date, "EEEE, MMMM d");
  };

  const formatDuration = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);

    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }

    return `${minutes}m`;
  };

  const getGroupKey = (group: GroupedEntries, index: number): string => {
    return `${group.project?.id ?? "no-project"}-${group.task?.id ?? "no-task"}-${index}`;
  };

  const handleOpenChange = (groupKey: string, isOpen: boolean) => {
    setOpenGroups((prev) => {
      const next = new Set(prev);

      if (isOpen) {
        next.add(groupKey);
      } else {
        next.delete(groupKey);
      }

      return next;
    });
  };

  return (
    <Stack spacing={4}>
      <Stack spacing={2} className="pb-3 border-b border-primary/10">
        <Stack direction="row" align="center" justify="between">
          <Stack direction="row" align="end" spacing={2}>
            <Typography variant="h3" className="font-bold">
              {formatDate(date)}
            </Typography>

            {singleCount > 0 && <Badge variant="outline">{singleCount} single</Badge>}

            {groupedCount > 0 && <Badge variant="outline">{groupedCount} grouped</Badge>}
          </Stack>

          <Stack direction="row" align="center" spacing={2}>
            <Clock className="h-4 w-4 text-muted-foreground" />

            <Typography variant="h3" className="font-mono tabular-nums">
              {formatDuration(totalDuration)}
            </Typography>
          </Stack>
        </Stack>
      </Stack>

      <Stack spacing={4}>
        {grouped.map((group, index) => {
          const hasMultiple = group.entries.length > 1;
          const entry = group.entries[0];

          if (!hasMultiple && entry) {
            return <TimeEntryCard key={entry.id} entry={entry} />;
          }

          const groupKey = getGroupKey(group, index);
          const isOpen = openGroups.has(groupKey);
          const isRunning = group.entries.some((e) => e.endTime === null);

          return (
            <Collapsible
              key={groupKey}
              open={isOpen}
              onOpenChange={(open) => handleOpenChange(groupKey, open)}
              className="group"
            >
              <Card className="p-0 overflow-hidden" variant="bordered">
                <Stack>
                  <CollapsibleTrigger asChild>
                    <Button
                      variant="ghost"
                      className="w-full justify-start p-0 h-auto rounded-none"
                    >
                      <Stack
                        direction="row"
                        align="center"
                        justify="between"
                        className="w-full p-4"
                      >
                        <Stack direction="row" align="center" spacing={3}>
                          <Stack
                            align="center"
                            justify="center"
                            className="w-10 h-10 rounded-lg transition-colors bg-muted text-muted-foreground"
                          >
                            <Typography variant="caption" className="text-muted-foreground">
                              {group.entries.length}
                            </Typography>
                          </Stack>

                          <Stack direction="row" align="center" spacing={2}>
                            <Typography
                              variant="subtitle1"
                              className={!group.project ? "text-muted-foreground" : ""}
                            >
                              {group.project?.name ?? "No project"}
                            </Typography>

                            {group.task && (
                              <Typography variant="body2" className="text-muted-foreground">
                                •
                              </Typography>
                            )}

                            {group.task && (
                              <Typography variant="body2" className="text-muted-foreground">
                                {group.task.name}
                              </Typography>
                            )}

                            {isRunning && (
                              <Typography variant="body2" className="text-muted-foreground">
                                •
                              </Typography>
                            )}

                            {isRunning && <Badge variant="default">Running</Badge>}
                          </Stack>
                        </Stack>

                        <Stack direction="row" align="center" spacing={3}>
                          <Typography variant="h5" className="font-mono tabular-nums">
                            {formatDuration(group.totalDuration)}
                          </Typography>

                          <ChevronDown
                            className={cn(
                              "h-5 w-5 text-muted-foreground transition-transform",
                              !isOpen && "-rotate-90",
                            )}
                          />
                        </Stack>
                      </Stack>
                    </Button>
                  </CollapsibleTrigger>

                  <CollapsibleContent>
                    <Stack spacing={4} className="p-4 bg-background/50 border-t border-border">
                      {group.entries.map((entry) => (
                        <Stack key={entry.id} direction="row" spacing={3}>
                          <TimeEntryCard entry={entry} />
                        </Stack>
                      ))}
                    </Stack>
                  </CollapsibleContent>
                </Stack>
              </Card>
            </Collapsible>
          );
        })}
      </Stack>
    </Stack>
  );
}
