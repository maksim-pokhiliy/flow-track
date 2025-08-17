import type { Prisma } from "@prisma/client";

export type InvitationWithWorkspace = Prisma.InvitationGetPayload<{
  include: { workspace: true };
}>;
