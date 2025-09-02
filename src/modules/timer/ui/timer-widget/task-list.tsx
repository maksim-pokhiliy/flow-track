"use client";

import { Hash } from "lucide-react";

import { Button, Typography } from "@app/components/ui";
import type { TaskDTO } from "@app/modules/tasks/model";

import { TimeEntryDTO } from "../../model";

type TaskListProps = {
  tasks: TaskDTO[];
  selectedTaskId?: string | null;
  onTaskSelect: (task: TimeEntryDTO["task"]) => void;
};

export function TaskList({ tasks, selectedTaskId, onTaskSelect }: TaskListProps) {
  return tasks.map((task) => (
    <Button
      key={task.id}
      variant={task.id === selectedTaskId ? "secondary" : "ghost"}
      size="sm"
      className="justify-start"
      onClick={() => onTaskSelect(task)}
    >
      <Hash className="mr-2 h-3 w-3" />

      <Typography variant="body2" className="truncate">
        {task.name}
      </Typography>
    </Button>
  ));
}
