"use client";

import { useState } from "react";

import { Stack } from "@app/components/layout";
import { Typography } from "@app/components/ui";

import { useDeleteTask, useUpdateTask } from "../api";
import type { TaskDTO } from "../model";

import { DeleteTaskDialog } from "./delete-task-dialog";
import { TaskItem } from "./task-item";
import { UpdateTaskDialog } from "./update-task-dialog";

type Props = {
  tasks: TaskDTO[];
  workspaceId: string;
  projectId: string;
};

export function TaskList({ tasks, workspaceId, projectId }: Props) {
  const { mutate: updateTask, isPending: isUpdating } = useUpdateTask();
  const { mutate: deleteTask, isPending: isDeleting } = useDeleteTask();

  const [updateOpen, setUpdateOpen] = useState(false);
  const [updateTarget, setUpdateTarget] = useState<TaskDTO | null>(null);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<TaskDTO | null>(null);

  const activeTasks = tasks.filter((t) => !t.isCompleted);
  const completedTasks = tasks.filter((t) => t.isCompleted);

  const handleToggle = (task: TaskDTO) => {
    updateTask({
      workspaceId,
      projectId,
      taskId: task.id,
      input: { isCompleted: !task.isCompleted },
    });
  };

  const handleEdit = (task: TaskDTO) => {
    setUpdateTarget(task);
    setUpdateOpen(true);
  };

  const handleDelete = (task: TaskDTO) => {
    setDeleteTarget(task);
    setDeleteOpen(true);
  };

  const closeDialogs = () => {
    setUpdateOpen(false);
    setDeleteOpen(false);
    setUpdateTarget(null);
    setDeleteTarget(null);
  };

  return (
    <>
      <Stack spacing={6}>
        {activeTasks.length > 0 && (
          <Stack spacing={2}>
            <Typography variant="h4">Active tasks</Typography>

            <ul className="divide-y rounded-lg border">
              {activeTasks.map((task) => (
                <li key={task.id}>
                  <TaskItem
                    task={task}
                    onToggle={() => handleToggle(task)}
                    onEdit={() => handleEdit(task)}
                    onDelete={() => handleDelete(task)}
                    isUpdating={isUpdating}
                  />
                </li>
              ))}
            </ul>
          </Stack>
        )}

        {completedTasks.length > 0 && (
          <Stack spacing={2}>
            <Typography variant="h4">Completed tasks</Typography>

            <ul className="divide-y rounded-lg border opacity-60">
              {completedTasks.map((task) => (
                <li key={task.id}>
                  <TaskItem
                    task={task}
                    onToggle={() => handleToggle(task)}
                    onEdit={() => handleEdit(task)}
                    onDelete={() => handleDelete(task)}
                    isUpdating={isUpdating}
                  />
                </li>
              ))}
            </ul>
          </Stack>
        )}
      </Stack>

      {updateTarget && (
        <UpdateTaskDialog
          open={updateOpen}
          onOpenChange={(open) => (open ? setUpdateOpen(true) : closeDialogs())}
          task={updateTarget}
          onSubmit={(input) => {
            updateTask(
              {
                workspaceId,
                projectId,
                taskId: updateTarget.id,
                input,
              },
              { onSuccess: closeDialogs },
            );
          }}
          isSubmitting={isUpdating}
        />
      )}

      {deleteTarget && (
        <DeleteTaskDialog
          open={deleteOpen}
          onOpenChange={(open) => (open ? setDeleteOpen(true) : closeDialogs())}
          taskName={deleteTarget.name}
          onConfirm={() => {
            deleteTask(
              { workspaceId, projectId, taskId: deleteTarget.id },
              { onSuccess: closeDialogs },
            );
          }}
          isDeleting={isDeleting}
        />
      )}
    </>
  );
}
