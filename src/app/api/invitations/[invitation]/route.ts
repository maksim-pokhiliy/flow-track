import { NextResponse } from "next/server";

import { getPendingInvitationOrThrow } from "@app/modules/invitations/server/get-invitation-by-token.service";
import { toApiResponse } from "@app/shared/api";

export async function GET(_req: Request, ctx: { params: Promise<{ invitation: string }> }) {
  try {
    const { invitation } = await ctx.params;
    const data = await getPendingInvitationOrThrow(invitation);

    return NextResponse.json({ data });
  } catch (e: unknown) {
    return toApiResponse(e);
  }
}
