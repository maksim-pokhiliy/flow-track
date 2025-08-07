import { container } from "@app/infrastructure/container";
import { registerSchema } from "@app/modules/auth/schemas/auth.schema";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const validationResult = registerSchema.safeParse(body);

    if (!validationResult.success) {
      const firstError = validationResult.error.issues[0];
      const errorMessage = firstError
        ? `${firstError.path.join(".")}: ${firstError.message}`
        : "Please check your input and try again";

      const fieldErrors: Record<string, string[]> = {};

      validationResult.error.issues.forEach((issue) => {
        const field = issue.path.join(".");

        fieldErrors[field] ??= [];
        fieldErrors[field].push(issue.message);
      });

      return Response.json(
        {
          error: errorMessage,
          details: fieldErrors,
        },
        { status: 400 },
      );
    }

    const userResult = await container.useCases.registerUser.execute(validationResult.data);

    if (!userResult.success) {
      let errorMessage = userResult.error.message;

      if (errorMessage.includes("already exists")) {
        errorMessage = "An account with this email already exists. Please sign in instead.";
      } else if (errorMessage.includes("Failed to create user")) {
        errorMessage = "Unable to create your account. Please try again.";
      }

      return Response.json({ error: errorMessage }, { status: 400 });
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

    return Response.json(
      { error: "Something went wrong. Please try again later." },
      { status: 500 },
    );
  }
}
