"use client";

import { Plus } from "lucide-react";

import { EmptyState, Stack } from "@app/components/layout";
import { Button } from "@app/components/ui";

type Props = {
  projectId: string;
  workspaceId: string;
};

export function ProjectTasksTab(_: Props) {
  return (
    <Stack spacing={4}>
      <Stack direction="row" align="center" justify="between">
        <Button size="sm">
          <Plus className="h-4 w-4" />
          Add task
        </Button>
      </Stack>

      <EmptyState
        title="No tasks yet"
        description="Create your first task to start organizing work"
      />
    </Stack>
  );
}
