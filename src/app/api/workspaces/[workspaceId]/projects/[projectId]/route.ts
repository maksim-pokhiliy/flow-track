import { NextResponse } from "next/server";

import { requireUserId } from "@app/modules/auth/server";
import { updateProjectSchema } from "@app/modules/projects/model";
import { deleteProject, getProject, updateProject } from "@app/modules/projects/server";
import { toApiResponse } from "@app/shared/api";

type Context = {
  params: Promise<{
    workspaceId: string;
    projectId: string;
  }>;
};

export async function GET(_: Request, ctx: Context) {
  try {
    const userId = await requireUserId();
    const { projectId } = await ctx.params;

    const project = await getProject(userId, projectId);

    return NextResponse.json({ data: project });
  } catch (e: unknown) {
    return toApiResponse(e);
  }
}

export async function PATCH(req: Request, ctx: Context) {
  try {
    const userId = await requireUserId();
    const { projectId } = await ctx.params;

    const body = await req.json();
    const input = updateProjectSchema.parse(body);

    const project = await updateProject(userId, projectId, input);

    return NextResponse.json({ data: project, invalidate: ["projects", "project"] });
  } catch (e: unknown) {
    return toApiResponse(e);
  }
}

export async function DELETE(_req: Request, ctx: Context) {
  try {
    const userId = await requireUserId();
    const { projectId } = await ctx.params;

    const result = await deleteProject(userId, projectId);

    return NextResponse.json({ data: result, invalidate: ["projects"] });
  } catch (e: unknown) {
    return toApiResponse(e);
  }
}
