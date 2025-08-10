import { NextResponse } from "next/server";

import { inviteCreateSchema } from "@app/modules/workspaces/model";
import { createInvitation, listInvitations } from "@app/modules/workspaces/server";
import { toApiResponse } from "@app/shared/api/errors";

export async function GET(_req: Request, ctx: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await ctx.params;
    const data = await listInvitations(id);

    return NextResponse.json({ data });
  } catch (e: unknown) {
    return toApiResponse(e);
  }
}

export async function POST(req: Request, ctx: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await ctx.params;
    const body = await req.json();
    const { email, role } = inviteCreateSchema.parse(body);
    const invite = await createInvitation(id, email, role);

    return NextResponse.json({ data: invite, invalidate: ["invitations"] }, { status: 201 });
  } catch (e: unknown) {
    return toApiResponse(e);
  }
}
