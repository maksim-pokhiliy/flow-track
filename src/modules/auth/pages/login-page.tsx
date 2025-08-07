import { Container, FullScreenSection, Stack } from "@app/components";
import { AuthCard, LoginForm } from "@app/modules/auth";

export function LoginPage() {
  return (
    <FullScreenSection>
      <Container size="xl">
        <Stack align="center">
          <AuthCard title="Welcome back" description="Sign in to continue to your dashboard">
            <LoginForm />
          </AuthCard>
        </Stack>
      </Container>
    </FullScreenSection>
  );
}
