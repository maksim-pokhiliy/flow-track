"use client";

import { ChevronDown, ChevronRight, Folder, Hash } from "lucide-react";
import { useState } from "react";

import { EmptyState, QueryWrapper, Stack } from "@app/components/layout";
import { Button, Popover, PopoverContent, PopoverTrigger, Typography } from "@app/components/ui";
import { useProjects } from "@app/modules/projects/api";
import { useTimerStore, useWorkspaceStore } from "@app/shared/store";

import { useActiveTimer, useUpdateCurrentTimer } from "../../api";
import { TimeEntryDTO } from "../../model";

import { ProjectList } from "./project-list";

export function ContextSelector() {
  const { context, setContext } = useTimerStore();
  const { currentWorkspaceId } = useWorkspaceStore();

  const { data: activeTimer } = useActiveTimer();
  const { mutate: updateTimer } = useUpdateCurrentTimer();

  const workspaceIdForProjects =
    context.workspace?.id ?? activeTimer?.workspaceId ?? currentWorkspaceId;

  const {
    data: projects = [],
    isLoading: projectsLoading,
    error: projectsError,
  } = useProjects(workspaceIdForProjects);

  const [open, setOpen] = useState(false);

  const handleProjectSelect = (project: TimeEntryDTO["project"]) => {
    setContext({ project, task: null });

    if (activeTimer) {
      updateTimer({
        workspaceId: activeTimer.workspaceId,
        input: { projectId: project?.id, taskId: null },
      });
    }

    setOpen(false);
  };

  const handleTaskSelect = (project: TimeEntryDTO["project"], task: TimeEntryDTO["task"]) => {
    setContext({ project, task });

    if (activeTimer) {
      updateTimer({
        workspaceId: activeTimer.workspaceId,
        input: { projectId: project?.id, taskId: task?.id },
      });
    }

    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="sm">
          <ContextTriggerContent project={context.project} task={context.task} />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-100 p-0" align="start">
        <QueryWrapper
          isLoading={projectsLoading}
          loadingText=""
          error={projectsError}
          data={projects}
          isEmpty={(data) => data.length === 0}
          size="sm"
          renderEmpty={<EmptyState variant="ghost" title="" description="No projects found" />}
        >
          {(projects) => (
            <ProjectList
              projects={projects}
              onProjectSelect={handleProjectSelect}
              onTaskSelect={handleTaskSelect}
              currentProject={context.project}
              currentTask={context.task}
            />
          )}
        </QueryWrapper>
      </PopoverContent>
    </Popover>
  );
}

function ContextTriggerContent({
  project,
  task,
}: {
  project: TimeEntryDTO["project"] | null;
  task: TimeEntryDTO["task"] | null;
}) {
  if (!project) {
    return (
      <Stack direction="row" spacing={2} align="center">
        <Folder className="h-4 w-4" />
        <Typography variant="body2">Select project</Typography>
        <ChevronDown className="h-4 w-4" />
      </Stack>
    );
  }

  return (
    <Stack direction="row" spacing={1} align="center">
      <Folder className="h-4 w-4" />

      <Typography variant="body2" className="truncate">
        {project.name}
      </Typography>

      {task && (
        <>
          <ChevronRight className="h-4 w-4" />
          <Hash className="h-4 w-4" />
          <Typography variant="body2" className="truncate">
            {task.name}
          </Typography>
        </>
      )}

      <ChevronDown className="h-4 w-4" />
    </Stack>
  );
}
