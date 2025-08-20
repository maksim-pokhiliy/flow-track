"use client";

import { Role } from "@prisma/client";
import { MoreHorizontal } from "lucide-react";

import { Stack } from "@app/components/layout";
import { Button, Typography } from "@app/components/ui";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@app/components/ui/dropdown-menu";

import type { WorkspaceListItem } from "../api";

type Props = {
  workspace: WorkspaceListItem;
  onRename: () => void;
  onInvite: () => void;
  onDelete: () => void;
  isUpdating: boolean;
  isDeleting: boolean;
};

export function WorkspaceItemRow({
  workspace,
  onRename,
  onInvite,
  onDelete,
  isUpdating,
  isDeleting,
}: Props) {
  const isOwner = workspace.role === Role.OWNER;

  return (
    <Stack direction="row" align="center" justify="between" className="p-4">
      <Stack spacing={2}>
        <Typography variant="h4">{workspace.name}</Typography>

        <Typography variant="caption" className="text-muted-foreground">
          Role: {workspace.role}
        </Typography>
      </Stack>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Actions"
            disabled={isUpdating && !isOwner}
          >
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" sideOffset={6}>
          <DropdownMenuItem onSelect={onRename}>Rename</DropdownMenuItem>
          <DropdownMenuItem onSelect={onInvite}>Invite member</DropdownMenuItem>

          <DropdownMenuItem
            variant="destructive"
            onSelect={() => {
              if (isOwner) {
                onDelete();
              }
            }}
            disabled={isDeleting || !isOwner}
            aria-disabled={isDeleting || !isOwner}
            title={!isOwner ? "Only OWNER can delete workspace" : undefined}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </Stack>
  );
}
