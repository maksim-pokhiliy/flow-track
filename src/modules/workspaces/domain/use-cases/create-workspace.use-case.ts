import { prisma } from "@app/infrastructure/database/prisma";

export interface CreateWorkspaceDto {
  userId: string;
  name: string;
}

export interface WorkspaceResult {
  id: string;
  name: string;
  slug: string;
}

export type Result<T> = { success: true; data: T } | { success: false; error: Error };

export class CreateWorkspaceUseCase {
  async execute(data: CreateWorkspaceDto): Promise<Result<WorkspaceResult>> {
    try {
      const slug = this.generateSlug(data.name);

      const workspace = await prisma.workspace.create({
        data: {
          name: data.name,
          slug,
          ownerId: data.userId,
          members: {
            create: {
              userId: data.userId,
              role: "OWNER",
            },
          },
        },
      });

      return {
        success: true,
        data: {
          id: workspace.id,
          name: workspace.name,
          slug: workspace.slug,
        },
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error : new Error("Failed to create workspace"),
      };
    }
  }

  private generateSlug(name: string): string {
    const randomId = Math.random().toString(36).substring(2, 8);
    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");

    return `${slug}-${randomId}`;
  }
}
