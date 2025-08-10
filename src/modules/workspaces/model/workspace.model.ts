import { z } from "zod";

export const createWorkspaceSchema = z.object({
  name: z.string().min(2).max(64),
});

export const updateWorkspaceSchema = z.object({
  name: z.string().min(2).max(64),
});

export type CreateWorkspaceInput = z.infer<typeof createWorkspaceSchema>;
export type UpdateWorkspaceInput = z.infer<typeof updateWorkspaceSchema>;
