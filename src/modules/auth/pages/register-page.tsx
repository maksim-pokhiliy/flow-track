import { Container, FullScreenSection, Stack } from "@app/components";
import { AuthCard, RegisterForm } from "@app/modules/auth";

export function RegisterPage() {
  return (
    <FullScreenSection>
      <Container size="xl">
        <Stack align="center">
          <AuthCard
            title="Create your account"
            description="Start your free trial and boost your productivity"
          >
            <RegisterForm />
          </AuthCard>
        </Stack>
      </Container>
    </FullScreenSection>
  );
}
