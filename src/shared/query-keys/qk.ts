import { QueryKeys as QK } from "./keys.enum";

export const qk = {
  // Workspaces
  workspaces: () => [QK.WORKSPACES] as const,
  workspace: (id: string) => [QK.WORKSPACE, id] as const,

  // Projects
  projects: (workspaceId: string) => [QK.PROJECTS, workspaceId] as const,
  project: (workspaceId: string, projectId: string) =>
    [QK.PROJECT, workspaceId, projectId] as const,

  // Tasks
  tasks: (workspaceId: string, projectId: string) => [QK.TASKS, workspaceId, projectId] as const,
  task: (workspaceId: string, projectId: string, taskId: string) =>
    [QK.TASK, workspaceId, projectId, taskId] as const,

  // Timer
  activeTimer: () => [QK.TIMER_ACTIVE] as const,
  timeEntries: (workspaceId: string | null, projectId?: string) => {
    if (!workspaceId) {
      return [QK.TIME_ENTRIES, "no-workspace"] as const;
    }

    if (projectId) {
      return [QK.TIME_ENTRIES, workspaceId, projectId] as const;
    }

    return [QK.TIME_ENTRIES, workspaceId] as const;
  },
  timeEntry: (workspaceId: string, entryId: string) =>
    [QK.TIME_ENTRY, workspaceId, entryId] as const,

  // Invitations
  invitations: (workspaceId: string) => [QK.INVITATIONS, workspaceId] as const,
  invitation: (token: string) => [QK.INVITATION, token] as const,

  // Members
  members: (workspaceId: string) => [QK.MEMBERS, workspaceId] as const,
  member: (workspaceId: string, userId: string) => [QK.MEMBER, workspaceId, userId] as const,
} as const;
