"use client";

import { Button, Stack, Typography } from "@app/components/ui";

import type { WorkspaceListItem } from "../api/use-workspaces";

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
      <div>
        <Typography className="font-medium">{workspace.name}</Typography>

        <Typography variant="caption" className="text-muted-foreground">
          Role: {workspace.role}
        </Typography>
      </div>

      <Stack spacing={2} align="center">
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
