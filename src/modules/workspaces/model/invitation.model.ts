import { Role } from "@prisma/client";
import { z } from "zod";

export const invitationRoleSchema = z.enum(Role);
export type InvitationRole = z.infer<typeof invitationRoleSchema>;

export const inviteFormSchema = z.object({
  email: z.email(),
  role: z.enum([Role.MEMBER, Role.ADMIN]),
});

export const inviteCreateSchema = z.object({
  email: z.email(),
  role: z.enum([Role.MEMBER, Role.ADMIN]),
});

export type InviteFormValues = z.infer<typeof inviteFormSchema>;
export type InviteCreateInput = z.infer<typeof inviteCreateSchema>;
