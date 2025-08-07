import { AuthCard, LoginForm } from "@app/modules/auth";

export function LoginPage() {
  return (
    <AuthCard title="Welcome back" description="Sign in to continue to your dashboard">
      <LoginForm />
    </AuthCard>
  );
}
