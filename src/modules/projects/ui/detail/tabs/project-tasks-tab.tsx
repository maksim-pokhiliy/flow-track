"use client";

import { QueryWrapper, Stack } from "@app/components/layout";
import { useTasks } from "@app/modules/tasks/api";
import { CreateTaskForm, TaskList } from "@app/modules/tasks/ui";

type Props = {
  projectId: string;
  workspaceId: string;
};

export function ProjectTasksTab({ projectId, workspaceId }: Props) {
  const { data: tasks, isLoading, error } = useTasks(workspaceId, projectId);

  return (
    <Stack spacing={6}>
      <CreateTaskForm workspaceId={workspaceId} projectId={projectId} />

      <QueryWrapper isLoading={isLoading} loadingText="Loading tasks..." error={error} data={tasks}>
        {(taskList) => (
          <TaskList tasks={taskList} workspaceId={workspaceId} projectId={projectId} />
        )}
      </QueryWrapper>
    </Stack>
  );
}
