import type { IUserRepository, Result } from "../repositories/user.repository.interface";

export interface RegisterUserDto {
  email: string;
  password: string;
  name?: string;
}

export interface RegisterUserResult {
  userId: string;
  email: string;
}

export class RegisterUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(data: RegisterUserDto): Promise<Result<RegisterUserResult>> {
    const result = await this.userRepository.create({
      email: data.email.toLowerCase(),
      password: data.password,
      name: data.name?.trim(),
    });

    if (!result.success) {
      return result;
    }

    return {
      success: true,
      data: {
        userId: result.data.id,
        email: result.data.email,
      },
    };
  }
}
