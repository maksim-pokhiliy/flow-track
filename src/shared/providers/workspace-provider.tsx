"use client";

import { useEffect } from "react";

import { useWorkspaces } from "@app/modules/workspaces/api";
import { useWorkspaceStore } from "@app/shared/store";

export function WorkspaceProvider({ children }: { children: React.ReactNode }) {
  const { data: workspaces } = useWorkspaces();
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

  return <>{children}</>;
}
