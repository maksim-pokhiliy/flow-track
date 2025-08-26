import { NextResponse } from "next/server";

import { createInvitation, listInvitations } from "@app/modules/invitations/server";
import { inviteCreateSchema } from "@app/modules/workspaces/model";
import { toApiResponse } from "@app/shared/api";
import { QueryKeys } from "@app/shared/query-keys";

export async function GET(_req: Request, ctx: { params: Promise<{ workspaceId: string }> }) {
  try {
    const { workspaceId } = await ctx.params;
    const data = await listInvitations(workspaceId);

    return NextResponse.json({ data });
  } catch (e: unknown) {
    return toApiResponse(e);
  }
}

export async function POST(req: Request, ctx: { params: Promise<{ workspaceId: string }> }) {
  try {
    const { workspaceId } = await ctx.params;
    const body = await req.json();
    const { email, role } = inviteCreateSchema.parse(body);
    const invite = await createInvitation(workspaceId, email, role);

    return NextResponse.json(
      { data: invite, invalidate: [QueryKeys.INVITATIONS] },
      { status: 201 },
    );
  } catch (e: unknown) {
    return toApiResponse(e);
  }
}
