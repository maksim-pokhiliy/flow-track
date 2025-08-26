import { NextResponse } from "next/server";

import { requireUserId } from "@app/modules/auth/server";
import { createProjectSchema } from "@app/modules/projects/model";
import { createProject, listProjects } from "@app/modules/projects/server";
import { toApiResponse } from "@app/shared/api";
import { QueryKeys } from "@app/shared/query-keys";

type Context = {
  params: Promise<{ workspaceId: string }>;
};

export async function GET(_: Request, ctx: Context) {
  try {
    const userId = await requireUserId();
    const { workspaceId } = await ctx.params;

    const projects = await listProjects(userId, workspaceId);

    return NextResponse.json({ data: projects });
  } catch (e: unknown) {
    return toApiResponse(e);
  }
}

export async function POST(req: Request, ctx: Context) {
  try {
    const userId = await requireUserId();
    const { workspaceId } = await ctx.params;

    const body = await req.json();
    const input = createProjectSchema.parse(body);

    const project = await createProject(userId, workspaceId, input);

    return NextResponse.json({ data: project, invalidate: [QueryKeys.PROJECTS] }, { status: 201 });
  } catch (e: unknown) {
    return toApiResponse(e);
  }
}
