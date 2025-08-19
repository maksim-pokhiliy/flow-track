"use client";

import { MoreHorizontal, Trash2 } from "lucide-react";

import { Stack } from "@app/components/layout";
import { Button, CheckboxWithLabel, Typography } from "@app/components/ui";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@app/components/ui/dropdown-menu";
import { cn } from "@app/shared/lib";

import type { TaskDTO } from "../model";

type Props = {
  task: TaskDTO;
  onToggle: () => void;
  onEdit: () => void;
  onDelete: () => void;
  isUpdating?: boolean;
};

export function TaskItem({ task, onToggle, onEdit, onDelete, isUpdating }: Props) {
  return (
    <Stack direction="row" align="center" justify="between" className="p-3 group">
      <Stack spacing={2} justify="center" className="flex-1">
        <CheckboxWithLabel
          label={task.name}
          labelClassName={cn(task.isCompleted && "line-through text-muted-foreground")}
          checked={task.isCompleted}
          onCheckedChange={onToggle}
          disabled={isUpdating}
        />

        {task.description && (
          <Typography variant="caption" className="text-muted-foreground">
            {task.description}
          </Typography>
        )}
      </Stack>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" aria-label="Actions" disabled={isUpdating}>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuItem onSelect={onEdit}>Edit</DropdownMenuItem>

          <DropdownMenuItem onSelect={onDelete} variant="destructive">
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </Stack>
  );
}
