"use client";

export const qk = {
  workspaces: (wsId?: string) => (wsId ? ["workspaces", wsId] : ["workspaces"]),
  projects: (wsId: string) => ["projects", wsId],
  projectTasks: (wsId: string, projectId: string) => ["projects", wsId, projectId, "tasks"],
  timer: (wsId: string) => ["timer", wsId],
  analytics: (wsId: string, scope?: string) =>
    scope ? ["analytics", wsId, scope] : ["analytics", wsId],
};
