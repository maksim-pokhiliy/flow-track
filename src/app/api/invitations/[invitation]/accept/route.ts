import { NextResponse } from "next/server";

import { requireUserId } from "@app/modules/auth/server";
import { acceptInvitation } from "@app/modules/invitations/server/accept-invitation.service";
import { toApiResponse } from "@app/shared/api";

export async function POST(_req: Request, ctx: { params: Promise<{ invitation: string }> }) {
  try {
    const userId = await requireUserId();
    const { invitation } = await ctx.params;
    const result = await acceptInvitation(invitation, userId);

    return NextResponse.json({ data: result, invalidate: ["invitations", "workspaces"] });
  } catch (e: unknown) {
    return toApiResponse(e);
  }
}
