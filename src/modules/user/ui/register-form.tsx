"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState } from "react";

import { Button, Container, Input, Stack, Typography } from "@app/components/ui";

export function RegisterForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error?.message ?? "Registration failed");
        setLoading(false);

        return;
      }

      const signInResult = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (signInResult?.error) {
        setError("Registration successful, but login failed. Please try logging in.");
        setLoading(false);

        return;
      }

      router.push("/workspaces");
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <Stack direction="column" align="center" justify="center" className="min-h-screen">
      <Container maxWidth="sm" className="w-full">
        <Stack direction="column" spacing={8} align="center">
          <Typography variant="h3">Create account</Typography>

          <form onSubmit={handleSubmit} className="w-full">
            <Stack direction="column" spacing={4}>
              <Stack direction="column" spacing={4}>
                <Input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />

                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />

                <Input
                  type="password"
                  placeholder="Password (min 6 characters)"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
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
                loadingText="Creating account..."
                className="w-full"
              >
                Sign up
              </Button>
            </Stack>
          </form>

          <Typography variant="body2" className="text-center text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="text-primary hover:underline">
              Sign in
            </Link>
          </Typography>
        </Stack>
      </Container>
    </Stack>
  );
}
