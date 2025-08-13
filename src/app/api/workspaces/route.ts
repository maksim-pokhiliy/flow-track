import { NextResponse } from "next/server";

import { requireUserId } from "@app/modules/auth/server";
import { createWorkspaceSchema } from "@app/modules/workspaces/model";
import { createWorkspace, listWorkspaces } from "@app/modules/workspaces/server";
import { toApiResponse } from "@app/shared/api";

export async function GET() {
  try {
    const userId = await requireUserId();
    const data = await listWorkspaces(userId);

    return NextResponse.json({ data });
  } catch (e: unknown) {
    return toApiResponse(e);
  }
}

export async function POST(req: Request) {
  try {
    const userId = await requireUserId();
    const body = await req.json();
    const { name } = createWorkspaceSchema.parse(body);
    const ws = await createWorkspace(userId, name);

    return NextResponse.json({ data: ws, invalidate: ["workspaces"] }, { status: 201 });
  } catch (e: unknown) {
    return toApiResponse(e);
  }
}
