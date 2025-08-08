"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState } from "react";

import { Button, Container, Input, Stack, Typography } from "@app/components/ui";

export function LoginForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("Invalid email or password");
      setLoading(false);
    } else {
      router.refresh();
    }
  };

  return (
    <Stack direction="column" align="center" justify="center" className="h-screen">
      <Container maxWidth="sm">
        <Stack direction="column" spacing={8} align="center">
          <Typography variant="h3">Sign in</Typography>

          <form onSubmit={handleSubmit} className="w-full">
            <Stack direction="column" spacing={4}>
              <Stack direction="column" spacing={4}>
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />

                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Stack>

              {error && (
                <Typography variant="body2" className="text-destructive">
                  {error}
                </Typography>
              )}

              <Button
                type="submit"
                loading={loading}
                loadingText="Signing in..."
                className="w-full"
              >
                Sign in
              </Button>
            </Stack>
          </form>

          <Typography variant="body2" className="text-center text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-primary hover:underline">
              Sign up
            </Link>
          </Typography>
        </Stack>
      </Container>
    </Stack>
  );
}
