import { NextResponse } from "next/server";

import { revokeInvitation } from "@app/modules/invitations/server/revoke-invitation.service";
import { toApiResponse } from "@app/shared/api";
import { QueryKeys } from "@app/shared/query-keys";

export async function POST(_req: Request, ctx: { params: Promise<{ invitation: string }> }) {
  try {
    const { invitation } = await ctx.params;
    const data = await revokeInvitation(invitation);

    return NextResponse.json({ data, invalidate: [QueryKeys.INVITATIONS] });
  } catch (e: unknown) {
    return toApiResponse(e);
  }
}
