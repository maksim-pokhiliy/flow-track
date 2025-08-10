import { NextResponse } from "next/server";

import { revokeInvitation } from "@app/modules/workspaces";
import { toApiResponse } from "@app/shared/api/errors";

export async function POST(_req: Request, ctx: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await ctx.params;
    const data = await revokeInvitation(id);

    return NextResponse.json({ data, invalidate: ["invitations"] });
  } catch (e: unknown) {
    return toApiResponse(e);
  }
}
