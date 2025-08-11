"use client";

import { Stack } from "@app/components/layout";
import { Button, Typography } from "@app/components/ui";

import { WorkspaceListItem } from "../api";

type Props = {
  workspace: WorkspaceListItem;
  onRename: () => void;
  onDelete: () => void;
  isUpdating: boolean;
  isDeleting: boolean;
};

export function WorkspaceItemRow({ workspace, onRename, onDelete, isUpdating, isDeleting }: Props) {
  const isOwner = workspace.role === "OWNER";

  return (
    <li className="flex items-center justify-between p-4">
      <Stack spacing={2}>
        <Typography variant="h4">{workspace.name}</Typography>

        <Typography variant="caption" className="text-muted-foreground">
          Role: {workspace.role}
        </Typography>
      </Stack>

      <Stack spacing={4} align="center" direction="row">
        <Button variant="outline" size="sm" onClick={onRename} disabled={isUpdating}>
          Rename
        </Button>

        <Button
          variant="destructive"
          size="sm"
          onClick={onDelete}
          disabled={isDeleting || !isOwner}
          aria-invalid={!isOwner}
          title={!isOwner ? "Only OWNER can delete workspace" : undefined}
        >
          Delete
        </Button>
      </Stack>
    </li>
  );
}
