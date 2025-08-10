"use client";

import { useState } from "react";

import { Stack, Typography } from "@app/components/ui";
import { EmptyState } from "@app/components/ui/empty-state";
import { QueryWrapper } from "@app/components/ui/query-wrapper";

import { useDeleteWorkspace, useUpdateWorkspace, useWorkspaces } from "../api";

import { DeleteWorkspaceDialog } from "./delete-workspace-dialog";
import { RenameWorkspaceDialog } from "./rename-workspace-dialog";
import { WorkspaceItemRow } from "./workspace-item-row";

export function WorkspacesSection() {
  const { data, isLoading, isError, error } = useWorkspaces();
  const { mutate: updateWs, isPending: isUpdating } = useUpdateWorkspace();
  const { mutate: deleteWs, isPending: isDeleting } = useDeleteWorkspace();

  const [renameOpen, setRenameOpen] = useState(false);
  const [renameId, setRenameId] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState("");

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleteName, setDeleteName] = useState("");

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

  const closeDialogs = () => {
    setRenameOpen(false);
    setDeleteOpen(false);
    setRenameId(null);
    setDeleteId(null);
    setRenameValue("");
    setDeleteName("");
  };

  return (
    <>
      <QueryWrapper
        isLoading={isLoading}
        error={isError ? (error as Error) : null}
        data={data}
        isEmpty={(arr) => arr.length === 0}
        renderEmpty={
          <EmptyState
            title="No workspaces yet."
            description="Create your first workspace to get started."
          />
        }
      >
        {(items) => (
          <Stack direction="column" spacing={4}>
            <Typography variant="h4">Your workspaces</Typography>

            <ul className="divide-y rounded-lg border">
              {items.map((ws) => (
                <WorkspaceItemRow
                  key={ws.id}
                  workspace={ws}
                  onRename={() => openRename(ws.id, ws.name)}
                  onDelete={() => openDelete(ws.id, ws.name)}
                  isUpdating={isUpdating}
                  isDeleting={isDeleting}
                />
              ))}
            </ul>
          </Stack>
        )}
      </QueryWrapper>

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

          deleteWs({ id: deleteId }, { onSuccess: closeDialogs });
        }}
        loading={isDeleting}
      />
    </>
  );
}
