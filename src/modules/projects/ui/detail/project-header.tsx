"use client";

import { Clock, ListTodo } from "lucide-react";

import { Stack } from "@app/components/layout";
import { Typography } from "@app/components/ui";

import type { ProjectDTO } from "../../model";

type Props = {
  project: ProjectDTO;
};

export function ProjectHeader({ project }: Props) {
  return (
    <Stack direction="row" spacing={8}>
      <Stack direction="row" align="center" spacing={2}>
        <ListTodo className="h-4 w-4 text-muted-foreground" />

        <Typography variant="body2" className="text-muted-foreground">
          {project._count?.tasks ?? 0} tasks
        </Typography>
      </Stack>

      <Stack direction="row" align="center" spacing={2}>
        <Clock className="h-4 w-4 text-muted-foreground" />

        <Typography variant="body2" className="text-muted-foreground">
          {project._count?.timeEntries ?? 0} time entries
        </Typography>
      </Stack>
    </Stack>
  );
}
