import { NextResponse } from "next/server";

import { requireUserId } from "@app/modules/auth/server";
import { updateTaskSchema } from "@app/modules/tasks/model";
import { deleteTask, updateTask } from "@app/modules/tasks/server";
import { toApiResponse } from "@app/shared/api";

type Context = {
  params: Promise<{
    workspaceId: string;
    projectId: string;
    taskId: string;
  }>;
};

export async function PATCH(req: Request, ctx: Context) {
  try {
    const userId = await requireUserId();
    const { taskId } = await ctx.params;

    const body = await req.json();
    const input = updateTaskSchema.parse(body);

    const task = await updateTask(userId, taskId, input);

    return NextResponse.json({ data: task, invalidate: ["tasks", "task", "project"] });
  } catch (e: unknown) {
    return toApiResponse(e);
  }
}

export async function DELETE(_req: Request, ctx: Context) {
  try {
    const userId = await requireUserId();
    const { taskId } = await ctx.params;

    const result = await deleteTask(userId, taskId);

    return NextResponse.json({ data: result, invalidate: ["tasks", "project"] });
  } catch (e: unknown) {
    return toApiResponse(e);
  }
}
