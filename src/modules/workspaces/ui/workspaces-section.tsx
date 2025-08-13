"use client";

import { useState } from "react";

import { Stack } from "@app/components/layout";
import { Typography } from "@app/components/ui";

import { useDeleteWorkspace, useUpdateWorkspace, WorkspaceListItem } from "../api";

import { DeleteWorkspaceDialog } from "./delete-workspace-dialog";
import { InviteWorkspaceDialog } from "./invite-workspace-dialog";
import { RenameWorkspaceDialog } from "./rename-workspace-dialog";
import { WorkspaceItemRow } from "./workspace-item-row";

type WorkspacesSectionProps = {
  workspaces: WorkspaceListItem[];
};

export function WorkspacesSection({ workspaces }: WorkspacesSectionProps) {
  const { mutate: updateWs, isPending: isUpdating } = useUpdateWorkspace();
  const { mutate: deleteWs, isPending: isDeleting } = useDeleteWorkspace();

  const [renameOpen, setRenameOpen] = useState(false);
  const [renameId, setRenameId] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState("");

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleteName, setDeleteName] = useState("");

  const [inviteOpen, setInviteOpen] = useState(false);
  const [inviteWsId, setInviteWsId] = useState<string | null>(null);

  const openRename = (id: string, current: string) => {
    setRenameId(id);
    setRenameValue(current);
    setRenameOpen(true);
  };

  const openDelete = (id: string, name: string) => {
    setDeleteId(id);
    setDeleteName(name);
    setDeleteOpen(true);
  };

  const openInvite = (id: string) => {
    setInviteWsId(id);
    setInviteOpen(true);
  };

  const closeDialogs = () => {
    setRenameOpen(false);
    setDeleteOpen(false);
    setInviteOpen(false);

    setRenameId(null);
    setDeleteId(null);
    setInviteWsId(null);

    setRenameValue("");
    setDeleteName("");
  };

  return (
    <>
      <Stack spacing={4}>
        <Typography variant="h3">Your workspaces</Typography>

        <ul className="divide-y rounded-lg border">
          {workspaces.map((ws) => (
            <li key={ws.id}>
              <WorkspaceItemRow
                workspace={ws}
                onRename={() => openRename(ws.id, ws.name)}
                onInvite={() => openInvite(ws.id)}
                onDelete={() => openDelete(ws.id, ws.name)}
                isUpdating={isUpdating}
                isDeleting={isDeleting}
              />
            </li>
          ))}
        </ul>
      </Stack>

      <RenameWorkspaceDialog
        open={renameOpen}
        value={renameValue}
        onValueChange={setRenameValue}
        onOpenChange={(v) => (v ? setRenameOpen(true) : closeDialogs())}
        onSubmit={() => {
          if (!renameId) {
            return;
          }

          const next = renameValue.trim();

          if (!next) {
            return;
          }

          updateWs({ id: renameId, name: next }, { onSuccess: closeDialogs });
        }}
        loading={isUpdating}
      />

      <DeleteWorkspaceDialog
        open={deleteOpen}
        name={deleteName}
        onOpenChange={(v) => (v ? setDeleteOpen(true) : closeDialogs())}
        onConfirm={() => {
          if (!deleteId) {
            return;
          }

          deleteWs(deleteId, { onSuccess: closeDialogs });
        }}
        loading={isDeleting}
      />

      {inviteWsId && (
        <InviteWorkspaceDialog
          open={inviteOpen}
          workspaceId={inviteWsId}
          onOpenChange={(v) => (v ? setInviteOpen(true) : closeDialogs())}
        />
      )}
    </>
  );
}
