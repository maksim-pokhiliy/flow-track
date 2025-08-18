import { z } from "zod";

export const createProjectSchema = z.object({
  name: z.string().min(1).max(100).trim(),
});

export const updateProjectSchema = z.object({
  name: z.string().min(1).max(100).trim().optional(),
  isArchived: z.boolean().optional(),
});

export type CreateProjectInput = z.infer<typeof createProjectSchema>;
export type UpdateProjectInput = z.infer<typeof updateProjectSchema>;

export type ProjectDTO = {
  id: string;
  workspaceId: string;
  name: string;
  isArchived: boolean;
  createdAt: string;
  _count?: {
    tasks: number;
    timeEntries: number;
  };
};

export const PROJECT_TABS = {
  TASKS: "tasks",
  SETTINGS: "settings",
} as const;

export type ProjectTab = (typeof PROJECT_TABS)[keyof typeof PROJECT_TABS];

export const DEFAULT_PROJECT_TAB = PROJECT_TABS.TASKS;
