import { NextResponse } from "next/server";

import { requireUserId } from "@app/modules/auth/server";
import { deleteTimeEntry } from "@app/modules/timer/server/delete-time-entry.service";
import { toApiResponse } from "@app/shared/api";
import { QueryKeys } from "@app/shared/query-keys";

export async function DELETE(_req: Request, ctx: { params: Promise<{ entryId: string }> }) {
  try {
    const userId = await requireUserId();
    const { entryId } = await ctx.params;

    await deleteTimeEntry(userId, entryId);

    return NextResponse.json({
      data: { success: true },
      invalidate: [QueryKeys.TIME_ENTRIES],
    });
  } catch (e) {
    return toApiResponse(e);
  }
}
