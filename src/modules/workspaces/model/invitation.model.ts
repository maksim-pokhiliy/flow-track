import { z } from "zod";

export const invitationRoleSchema = z.enum(["OWNER", "ADMIN", "MEMBER"]);
export type InvitationRole = z.infer<typeof invitationRoleSchema>;

export const inviteFormSchema = z.object({
  email: z.email(),
  role: z.enum(["MEMBER", "ADMIN"]),
});

export const inviteCreateSchema = z.object({
  email: z.email(),
  role: z.enum(["MEMBER", "ADMIN"]),
});

export type InviteFormValues = z.infer<typeof inviteFormSchema>;
export type InviteCreateInput = z.infer<typeof inviteCreateSchema>;
