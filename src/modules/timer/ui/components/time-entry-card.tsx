"use client";

import { format } from "date-fns";
import { ChevronRight, MoreVertical, Play, Trash2 } from "lucide-react";
import { useState } from "react";

import { Stack } from "@app/components/layout";
import {
  Button,
  Card,
  CardContent,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Typography,
} from "@app/components/ui";
import {
  useActiveTimer,
  useDeleteTimeEntry,
  useStartTimer,
  useStopTimer,
} from "@app/modules/timer/api";
import { useWorkspaceStore } from "@app/shared/store";

import type { TimeEntryDTO } from "../../model";

interface TimeEntryCardProps {
  entry: TimeEntryDTO;
}

export function TimeEntryCard({ entry }: TimeEntryCardProps) {
  const { currentWorkspaceId } = useWorkspaceStore();
  const { data: activeTimer } = useActiveTimer();
  const { mutate: startTimer } = useStartTimer();
  const { mutate: stopTimer } = useStopTimer();
  const { mutate: deleteEntry } = useDeleteTimeEntry();
  const [isSwitching, setIsSwitching] = useState(false);

  const isRunning = entry.endTime === null;

  const formatTime = (date: Date | string) => {
    return format(new Date(date), "HH:mm");
  };

  const formatDuration = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
      return `${hours}h ${minutes.toString().padStart(2, "0")}m`;
    } else if (minutes > 0) {
      return `${minutes}m ${secs.toString().padStart(2, "0")}s`;
    } else {
      return `${secs}s`;
    }
  };

  const handleContinue = () => {
    setIsSwitching(true);

    if (activeTimer && !isRunning) {
      stopTimer(undefined, {
        onSuccess: () => {
          startTimer(
            {
              workspaceId: currentWorkspaceId,
              project: entry.project,
              task: entry.task,
            },
            {
              onSettled: () => setIsSwitching(false),
            },
          );
        },
        onError: () => setIsSwitching(false),
      });
    } else if (!activeTimer) {
      startTimer(
        {
          workspaceId: currentWorkspaceId,
          project: entry.project,
          task: entry.task,
        },
        {
          onSettled: () => setIsSwitching(false),
        },
      );
    }
  };

  const handleDelete = () => {
    deleteEntry(entry.id);
  };

  return (
    <Card className="py-2 flex-1" variant={isRunning ? "outline" : "bordered"}>
      <CardContent>
        <Stack direction="row" align="center" justify="between" spacing={2}>
          <Stack className="flex-1" align="center" justify="between" direction="row">
            <Stack direction="row" spacing={2} align="center">
              {isRunning && <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />}

              <Typography variant="body1" className="font-medium">
                {entry.project?.name ?? "No project"}
              </Typography>

              {entry.task && (
                <>
                  <ChevronRight className="h-3 w-3" />

                  <Typography variant="body2" className="text-muted-foreground">
                    {entry.task.name}
                  </Typography>
                </>
              )}
            </Stack>

            <Stack direction="row" spacing={4} align="center">
              <Typography variant="body2" className="text-muted-foreground">
                {formatTime(entry.startedAt)} -{" "}
                {entry.endTime ? formatTime(entry.endTime) : "running"}
              </Typography>

              <Typography variant="body2" className="font-mono tabular-nums">
                {entry.duration ? formatDuration(entry.duration) : "00:00"}
              </Typography>
            </Stack>
          </Stack>

          <Stack direction="row" spacing={1} align="center">
            {!isRunning && (
              <Button
                size="icon"
                variant="ghost"
                onClick={handleContinue}
                aria-label="Continue timer with same context"
                disabled={isSwitching}
                loading={isSwitching}
                loadingText=""
              >
                <Play className="h-4 w-4" />
              </Button>
            )}

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="icon" variant="ghost" aria-label="More actions">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleDelete}>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
