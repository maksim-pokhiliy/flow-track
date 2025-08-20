"use client";

import { ChevronsUpDown } from "lucide-react";

import { Button, Typography } from "@app/components/ui";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@app/components/ui/dropdown-menu";

type Workspace = {
  id: string;
  name: string;
};

type Props = {
  workspaces: Workspace[];
  currentWorkspaceId: string | null;
  onWorkspaceChange: (workspaceId: string) => void;
};

export function WorkspaceSelector({ workspaces, currentWorkspaceId, onWorkspaceChange }: Props) {
  const currentWorkspace = workspaces.find((ws) => ws.id === currentWorkspaceId);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm">
          <Typography variant="body2">{currentWorkspace?.name ?? "No workspace"}</Typography>

          <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuRadioGroup value={currentWorkspaceId ?? ""} onValueChange={onWorkspaceChange}>
          {workspaces.map((workspace) => (
            <DropdownMenuRadioItem key={workspace.id} value={workspace.id}>
              <Typography variant="body2">{workspace.name}</Typography>
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
