export class User {
  constructor(
    public readonly id: string,
    public readonly email: string,
    public readonly name: string | null,
    public readonly emailVerified: Date | null,
    public readonly image: string | null,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}

  get isEmailVerified(): boolean {
    return this.emailVerified !== null;
  }

  get displayName(): string {
    return this.name ?? this.email.split("@")[0] ?? "User";
  }
}
