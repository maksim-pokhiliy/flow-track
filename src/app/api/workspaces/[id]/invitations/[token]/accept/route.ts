import { NextResponse } from "next/server";

import { acceptInvitation } from "@app/modules/workspaces";
import { toApiResponse } from "@app/shared/api/errors";

export async function POST(_req: Request, ctx: { params: Promise<{ token: string }> }) {
  try {
    const { token } = await ctx.params;
    const result = await acceptInvitation(token);

    return NextResponse.json({ data: result, invalidate: ["invitations", "workspaces"] });
  } catch (e: unknown) {
    return toApiResponse(e);
  }
}
