import { Role } from "@prisma/client";
import { z } from "zod";

export const inviteCreateSchema = z.object({
  email: z.email(),
  role: z.enum(Role),
});
export type InviteCreateInput = z.infer<typeof inviteCreateSchema>;
