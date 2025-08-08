"use client";

import Link from "next/link";
import { useState } from "react";

import { Button, Container, Input, Stack, Typography } from "@app/components/ui";

import { useRegister } from "../api";

export function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const { mutate: register, isPending, error } = useRegister();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    register({ email, password, name });
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
                  {error.message}
                </Typography>
              )}

              <Button
                type="submit"
                loading={isPending}
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
