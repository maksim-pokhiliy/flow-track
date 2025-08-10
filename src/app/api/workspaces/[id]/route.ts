import { NextResponse } from "next/server";

import { requireUserId } from "@app/modules/auth/server/auth";
import { updateWorkspaceSchema } from "@app/modules/workspaces/model/workspace.model";
import { deleteWorkspace, updateWorkspace } from "@app/modules/workspaces/server/workspace-service";
import { toApiResponse } from "@app/shared/api/errors";

type Ctx = { params: { id: string } };

export async function PATCH(req: Request, { params }: Ctx) {
  try {
    const userId = await requireUserId();
    const body = await req.json();
    const { name } = updateWorkspaceSchema.parse(body);
    const ws = await updateWorkspace(userId, params.id, name);

    return NextResponse.json({ data: ws, invalidate: ["workspaces"] as const });
  } catch (e: unknown) {
    return toApiResponse(e);
  }
}

export async function DELETE(_req: Request, { params }: Ctx) {
  try {
    const userId = await requireUserId();
    const ws = await deleteWorkspace(userId, params.id);

    return NextResponse.json({ data: { id: ws.id }, invalidate: ["workspaces"] as const });
  } catch (e: unknown) {
    return toApiResponse(e);
  }
}
