import { Project, Task, Workspace } from "@prisma/client";
import { z } from "zod";

export const timeEntrySchema = z.object({
  id: z.string(),
  workspaceId: z.string().nullable(),
  projectId: z.string().nullable(),
  taskId: z.string().nullable(),
  userId: z.string(),
  startedAt: z.date(),
  endTime: z.date().nullable(),
  duration: z.number().int().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const startTimerSchema = z.object({
  workspaceId: z.string().optional(),
  projectId: z.string().optional(),
  taskId: z.string().optional(),
});

export const updateTimerInputSchema = z.object({
  workspaceId: z.string().nullable().optional(),
  projectId: z.string().nullable().optional(),
  taskId: z.string().nullable().optional(),
});

export type TimeEntryDTO = z.infer<typeof timeEntrySchema> & {
  workspace?: Pick<Workspace, "id" | "name"> | null;
  project?: Pick<Project, "id" | "name"> | null;
  task?: Pick<Task, "id" | "name"> | null;
};

export type StartTimerInput = z.infer<typeof startTimerSchema>;
export type UpdateTimerInput = z.infer<typeof updateTimerInputSchema>;
