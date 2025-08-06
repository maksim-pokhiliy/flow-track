import { RegisterUserUseCase } from "@app/modules/auth/domain/use-cases/register-user.use-case";
import { UserRepository } from "@app/modules/auth/infrastructure/user.repository";
import { CreateWorkspaceUseCase } from "@app/modules/workspaces/domain/use-cases/create-workspace.use-case";

const userRepository = new UserRepository();

const registerUserUseCase = new RegisterUserUseCase(userRepository);
const createWorkspaceUseCase = new CreateWorkspaceUseCase();

export const container = {
  repositories: {
    user: userRepository,
  },
  useCases: {
    registerUser: registerUserUseCase,
    createWorkspace: createWorkspaceUseCase,
  },
};
