import { NextResponse } from "next/server";

import { acceptInvitation } from "@app/modules/workspaces/server";
import { toApiResponse } from "@app/shared/api/errors";

export async function POST(_req: Request, ctx: { params: Promise<{ invitation: string }> }) {
  try {
    const { invitation } = await ctx.params;
    const result = await acceptInvitation(invitation);

    return NextResponse.json({ data: result, invalidate: ["invitations", "workspaces"] });
  } catch (e: unknown) {
    return toApiResponse(e);
  }
}
