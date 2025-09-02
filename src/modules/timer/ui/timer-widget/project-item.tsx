"use client";

import { ChevronRight, Folder } from "lucide-react";

import { EmptyState, QueryWrapper, Stack } from "@app/components/layout";
import { Button, Typography } from "@app/components/ui";
import type { ProjectDTO } from "@app/modules/projects/model";
import { useTasks } from "@app/modules/tasks/api";
import { cn } from "@app/shared/lib";
import { useTimerStore, useWorkspaceStore } from "@app/shared/store";

import { useActiveTimer } from "../../api";
import { TimeEntryDTO } from "../../model";

import { TaskList } from "./task-list";

type ProjectItemProps = {
  project: ProjectDTO;
  isExpanded: boolean;
  isSelected: boolean;
  selectedTaskId?: string | null;
  onProjectSelect: () => void;
  onTaskSelect: (task: TimeEntryDTO["task"]) => void;
  onToggleExpand: () => void;
};

export function ProjectItem({
  project,
  isExpanded,
  isSelected,
  selectedTaskId,
  onProjectSelect,
  onTaskSelect,
  onToggleExpand,
}: ProjectItemProps) {
  const { context } = useTimerStore();
  const { currentWorkspaceId } = useWorkspaceStore();

  const { data: activeTimer } = useActiveTimer();

  const workspaceId = context.workspace?.id ?? activeTimer?.workspaceId ?? currentWorkspaceId;

  const { data: tasks = [], isLoading } = useTasks(workspaceId, project.id);

  const hasSelectedTask = isExpanded && tasks.some((t) => t.id === selectedTaskId);

  const handleToggleExpand = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onToggleExpand();
  };

  return (
    <Stack className="select-none" spacing={2}>
      <Stack direction="row" align="center" spacing={1}>
        <Button variant="ghost" size="sm" className="h-8 w-8" onClick={handleToggleExpand}>
          <ChevronRight className={cn("h-4 w-4 transition-transform", isExpanded && "rotate-90")} />
        </Button>

        <Button
          variant={isSelected && !hasSelectedTask ? "secondary" : "ghost"}
          size="sm"
          className="flex-1"
          onClick={onProjectSelect}
        >
          <Stack direction="row" align="center" className="w-full" spacing={2}>
            <Folder className="h-4 w-4" />

            <Typography variant="body2">{project.name}</Typography>

            <Typography variant="body2" className="ml-auto text-muted-foreground">
              {project?._count?.tasks ?? 0}
            </Typography>
          </Stack>
        </Button>
      </Stack>

      {isExpanded && (
        <QueryWrapper
          isLoading={isLoading}
          loadingText=""
          size="sm"
          data={tasks}
          isEmpty={(data) => data.length === 0}
          renderEmpty={<EmptyState variant="ghost" title="" description="No tasks found" />}
        >
          {(tasksList) => (
            <TaskList
              tasks={tasksList}
              selectedTaskId={selectedTaskId}
              onTaskSelect={onTaskSelect}
            />
          )}
        </QueryWrapper>
      )}
    </Stack>
  );
}
