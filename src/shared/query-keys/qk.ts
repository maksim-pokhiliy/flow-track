"use client";

export const qk = {
  workspaces: (wsId?: string) => (wsId ? ["workspaces", wsId] : ["workspaces"]),
  invitations: (wsId?: string) => (wsId ? ["invitations", wsId] : ["invitations"]),
  invitation: (token: string) => ["invitation", token],
  projects: (workspaceId: string) => ["projects", workspaceId],
  project: (workspaceId: string, projectId: string) => ["project", workspaceId, projectId],
  tasks: (projectId: string) => ["tasks", projectId],
  task: (taskId: string) => ["task", taskId],
  activeTimer: (workspaceId: string) => ["timer", "active", workspaceId],
  timeEntries: (workspaceId: string, projectId?: string) =>
    projectId ? ["time-entries", workspaceId, projectId] : ["time-entries", workspaceId],
};
