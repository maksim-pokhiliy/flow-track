import { NextResponse } from "next/server";

import { requireUserId } from "@app/modules/auth/server";
import { createTaskSchema } from "@app/modules/tasks/model";
import { createTask, listTasks } from "@app/modules/tasks/server";
import { toApiResponse } from "@app/shared/api";
import { QueryKeys } from "@app/shared/query-keys";

type Context = {
  params: Promise<{
    workspaceId: string;
    projectId: string;
  }>;
};

export async function GET(_req: Request, ctx: Context) {
  try {
    const userId = await requireUserId();
    const { projectId } = await ctx.params;

    const tasks = await listTasks(userId, projectId);

    return NextResponse.json({ data: tasks });
  } catch (e: unknown) {
    return toApiResponse(e);
  }
}

export async function POST(req: Request, ctx: Context) {
  try {
    const userId = await requireUserId();
    const { projectId } = await ctx.params;

    const body = await req.json();
    const input = createTaskSchema.parse(body);

    const task = await createTask(userId, projectId, input);

    return NextResponse.json(
      { data: task, invalidate: [QueryKeys.TASKS, QueryKeys.PROJECT] },
      { status: 201 },
    );
  } catch (e: unknown) {
    return toApiResponse(e);
  }
}
