import { NextResponse } from "next/server";

import { requireUserId } from "@app/modules/auth/server";
import { updateWorkspaceSchema } from "@app/modules/workspaces/model";
import { deleteWorkspace, updateWorkspace } from "@app/modules/workspaces/server";
import { toApiResponse } from "@app/shared/api";

export async function PATCH(req: Request, ctx: { params: Promise<{ workspaceId: string }> }) {
  try {
    const userId = await requireUserId();
    const body = await req.json();
    const { name } = updateWorkspaceSchema.parse(body);

    const { workspaceId } = await ctx.params;

    const ws = await updateWorkspace(userId, workspaceId, name);

    return NextResponse.json({ data: ws, invalidate: ["workspaces"] as const });
  } catch (e: unknown) {
    return toApiResponse(e);
  }
}

export async function DELETE(_req: Request, ctx: { params: Promise<{ workspaceId: string }> }) {
  try {
    const userId = await requireUserId();

    const { workspaceId } = await ctx.params;

    const ws = await deleteWorkspace(userId, workspaceId);

    return NextResponse.json({ data: { id: ws.id }, invalidate: ["workspaces"] as const });
  } catch (e: unknown) {
    return toApiResponse(e);
  }
}
