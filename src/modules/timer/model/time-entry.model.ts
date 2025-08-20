import { z } from "zod";

export const startTimerSchema = z.object({
  projectId: z.string(),
  taskId: z.string().optional(),
  note: z.string().max(500).optional(),
});

export const stopTimerSchema = z.object({
  note: z.string().max(500).optional(),
});

export const createManualEntrySchema = z.object({
  projectId: z.string(),
  taskId: z.string().optional(),
  note: z.string().max(500).optional(),
  startTime: z.iso.datetime(),
  endTime: z.iso.datetime(),
});

export type StartTimerInput = z.infer<typeof startTimerSchema>;
export type StopTimerInput = z.infer<typeof stopTimerSchema>;
export type CreateManualEntryInput = z.infer<typeof createManualEntrySchema>;

export type TimeEntryDTO = {
  id: string;
  userId: string;
  workspaceId: string;
  projectId: string;
  taskId: string | null;
  note: string | null;
  startTime: string;
  endTime: string | null;
  durationSec: number | null;
  project?: {
    id: string;
    name: string;
  };
  task?: {
    id: string;
    name: string;
  } | null;
};
