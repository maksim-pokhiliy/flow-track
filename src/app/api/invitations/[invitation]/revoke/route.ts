import { NextResponse } from "next/server";

import { revokeInvitation } from "@app/modules/workspaces/server";
import { toApiResponse } from "@app/shared/api/errors";

export async function POST(_req: Request, ctx: { params: Promise<{ invitation: string }> }) {
  try {
    const { invitation } = await ctx.params;
    const data = await revokeInvitation(invitation);

    return NextResponse.json({ data, invalidate: ["invitations"] });
  } catch (e: unknown) {
    return toApiResponse(e);
  }
}
