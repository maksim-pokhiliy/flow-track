export interface CreateUserDto {
  email: string;
  password: string;
  name?: string;
}

export interface UserDto {
  id: string;
  email: string;
  name: string | null;
  emailVerified: Date | null;
  image: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export type Result<T, E = Error> = { success: true; data: T } | { success: false; error: E };

export interface IUserRepository {
  create(data: CreateUserDto): Promise<Result<UserDto>>;
  findById(id: string): Promise<UserDto | null>;
  findByEmail(email: string): Promise<UserDto | null>;
  existsByEmail(email: string): Promise<boolean>;
}
