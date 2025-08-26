"use client";

import { useEffect } from "react";

import { useWorkspaces } from "@app/modules/workspaces/api";
import { useWorkspaceStore } from "@app/shared/store";

import { QueryWrapper } from "../layout";

export function WorkspaceProvider({ children }: { children: React.ReactNode }) {
  const { data: workspaces, error, isLoading: isWorkspacesLoading } = useWorkspaces();
  const { currentWorkspaceId, setCurrentWorkspace } = useWorkspaceStore();

  useEffect(() => {
    if (workspaces?.length) {
      const firstWorkspace = workspaces[0];
      const isExists = workspaces.some((ws) => ws.id === currentWorkspaceId);

      if (firstWorkspace && (!currentWorkspaceId || !isExists)) {
        setCurrentWorkspace(firstWorkspace.id);
      }
    }
  }, [workspaces, currentWorkspaceId, setCurrentWorkspace]);

  return (
    <QueryWrapper
      isLoading={isWorkspacesLoading}
      data
      error={error}
      loadingText="Loading workspaces..."
    >
      {() => children}
    </QueryWrapper>
  );
}
