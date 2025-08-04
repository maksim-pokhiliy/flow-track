import { UserRepository } from "../repositories";

import { AuthService } from "./auth.service";

export type { AuthenticateUserData, CreateUserData, IUserRepository } from "./auth.service";
export { AuthService };

export const authService = new AuthService(new UserRepository());
