import { AppError, ERROR_CODES } from "@app/shared/api";
import { prisma } from "@app/shared/lib/prisma";

export async function deleteTimeEntry(userId: string, entryId: string): Promise<void> {
  const entry = await prisma.timeEntry.findUnique({
    where: { id: entryId },
    select: { userId: true },
  });

  if (!entry) {
    throw new AppError(ERROR_CODES.NOT_FOUND, "Time entry not found");
  }

  if (entry.userId !== userId) {
    throw new AppError(ERROR_CODES.FORBIDDEN, "You can only delete your own time entries");
  }

  await prisma.timeEntry.delete({
    where: { id: entryId },
  });
}
