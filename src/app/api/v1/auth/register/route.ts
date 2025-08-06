import { container } from "@app/infrastructure/container";
import { registerSchema } from "@app/modules/auth/schemas/auth.schema";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const validationResult = registerSchema.safeParse(body);

    if (!validationResult.success) {
      return Response.json(
        {
          error: "Validation failed",
          details: validationResult.error.flatten(),
        },
        { status: 400 },
      );
    }

    const userResult = await container.useCases.registerUser.execute(validationResult.data);

    if (!userResult.success) {
      return Response.json({ error: userResult.error.message }, { status: 400 });
    }

    const workspaceResult = await container.useCases.createWorkspace.execute({
      userId: userResult.data.userId,
      name: `${validationResult.data.name ?? validationResult.data.email.split("@")[0]}'s Workspace`,
    });

    if (!workspaceResult.success) {
      console.error("Failed to create workspace:", workspaceResult.error);
    }

    return Response.json({
      success: true,
      data: {
        userId: userResult.data.userId,
        email: userResult.data.email,
        workspaceId: workspaceResult.success ? workspaceResult.data.id : null,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);

    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
