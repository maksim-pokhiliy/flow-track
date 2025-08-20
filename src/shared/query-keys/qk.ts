"use client";

export const qk = {
  workspaces: (wsId?: string) => (wsId ? ["workspaces", wsId] : ["workspaces"]),
  invitations: (wsId?: string) => (wsId ? ["invitations", wsId] : ["invitations"]),
  invitation: (token: string) => ["invitation", token],
  projects: (workspaceId: string) => ["projects", workspaceId],
  project: (workspaceId: string, projectId: string) => ["project", workspaceId, projectId],
  tasks: (projectId: string) => ["tasks", projectId],
  task: (taskId: string) => ["task", taskId],
  activeTimer: (workspaceId: string | null) => {
    if (!workspaceId) {
      return ["timer", "active", "no-workspace"];
    }

    return ["timer", "active", workspaceId];
  },
  timeEntries: (workspaceId: string | null, projectId?: string) => {
    if (!workspaceId) {
      return ["time-entries", "no-workspace"];
    }

    if (projectId) {
      return ["time-entries", workspaceId, projectId];
    }

    return ["time-entries", workspaceId];
  },
};
