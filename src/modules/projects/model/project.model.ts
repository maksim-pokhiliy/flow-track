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
