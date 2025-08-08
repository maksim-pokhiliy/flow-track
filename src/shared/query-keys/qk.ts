"use client";

export const qk = {
  workspaces: (wsId?: string) =>
    wsId ? (["workspaces", wsId] as const) : (["workspaces"] as const),
  projects: (wsId: string) => ["projects", wsId] as const,
  projectTasks: (wsId: string, projectId: string) =>
    ["projects", wsId, projectId, "tasks"] as const,
  timer: (wsId: string) => ["timer", wsId] as const,
  analytics: (wsId: string, scope?: string) =>
    scope ? (["analytics", wsId, scope] as const) : (["analytics", wsId] as const),
};
