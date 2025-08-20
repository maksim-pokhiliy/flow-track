"use client";

import { Role } from "@prisma/client";
import { Archive, MoreHorizontal, Trash2 } from "lucide-react";
import Link from "next/link";

import { Stack } from "@app/components/layout";
import { Badge, Button, Typography } from "@app/components/ui";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@app/components/ui/dropdown-menu";

import type { ProjectDTO } from "../../model";

type Props = {
  project: ProjectDTO;
  userRole: Role;
  onRename: () => void;
  onArchive: () => void;
  onDelete: () => void;
};

export function ProjectItemRow({ project, userRole, onRename, onArchive, onDelete }: Props) {
  const canEdit = userRole === Role.OWNER || userRole === Role.ADMIN;
  const canDelete = userRole === Role.OWNER;

  return (
    <Stack direction="row" align="center" justify="between" className="p-4">
      <Stack spacing={2}>
        <Stack direction="row" align="center" spacing={2}>
          <Link href={`/projects/${project.id}`} className="hover:underline">
            <Typography variant="h4">{project.name}</Typography>
          </Link>

          {project.isArchived && <Badge variant="secondary">Archived</Badge>}
        </Stack>

        <Stack direction="row" spacing={4}>
          <Typography variant="caption" className="text-muted-foreground">
            {project._count?.tasks ?? 0} tasks
          </Typography>

          <Typography variant="caption" className="text-muted-foreground">
            {project._count?.timeEntries ?? 0} time entries
          </Typography>
        </Stack>
      </Stack>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" aria-label="Actions">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" sideOffset={6}>
          <DropdownMenuItem onSelect={onRename} disabled={!canEdit}>
            Rename
          </DropdownMenuItem>

          <DropdownMenuItem onSelect={onArchive} disabled={!canEdit}>
            <Archive className="h-4 w-4 mr-2" />
            {project.isArchived ? "Restore" : "Archive"}
          </DropdownMenuItem>

          {canDelete && (
            <>
              <DropdownMenuSeparator />

              <DropdownMenuItem variant="destructive" onSelect={onDelete} disabled={!canDelete}>
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </Stack>
  );
}
