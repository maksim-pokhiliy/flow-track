import { AuthCard, RegisterForm } from "@app/modules/auth";

export function RegisterPage() {
  return (
    <AuthCard
      title="Create your account"
      description="Start your free trial and boost your productivity"
    >
      <RegisterForm />
    </AuthCard>
  );
}
