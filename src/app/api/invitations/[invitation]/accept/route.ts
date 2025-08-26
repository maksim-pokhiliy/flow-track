import { NextResponse } from "next/server";

import { requireUserId } from "@app/modules/auth/server";
import { acceptInvitation } from "@app/modules/invitations/server/accept-invitation.service";
import { toApiResponse } from "@app/shared/api";
import { QueryKeys } from "@app/shared/query-keys";

export async function POST(_req: Request, ctx: { params: Promise<{ invitation: string }> }) {
  try {
    const userId = await requireUserId();
    const { invitation } = await ctx.params;
    const result = await acceptInvitation(invitation, userId);

    return NextResponse.json({
      data: result,
      invalidate: [QueryKeys.INVITATIONS, QueryKeys.WORKSPACES],
    });
  } catch (e: unknown) {
    return toApiResponse(e);
  }
}
