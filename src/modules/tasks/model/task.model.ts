import { z } from "zod";

export const createTaskSchema = z.object({
  name: z.string().min(1).max(200).trim(),
  description: z.string().max(1000).optional(),
});

export const updateTaskSchema = z.object({
  name: z.string().min(1).max(200).trim().optional(),
  description: z.string().max(1000).nullable().optional(),
  isCompleted: z.boolean().optional(),
});

export type CreateTaskInput = z.infer<typeof createTaskSchema>;
export type UpdateTaskInput = z.infer<typeof updateTaskSchema>;

export type TaskDTO = {
  id: string;
  projectId: string;
  name: string;
  description: string | null;
  isCompleted: boolean;
  createdAt: string;
  completedAt: string | null;
};
