"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { Button, FormField, Stack, Typography } from "@app/components";

import { type LoginInput, loginSchema } from "../schemas/auth.schema";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get("from") ?? "/dashboard";

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginInput) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password");
        setIsLoading(false);

        return;
      }

      router.push(from);
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={4}>
        {error && (
          <div className="rounded-lg bg-destructive/10 p-3">
            <Typography variant="body2" className="text-destructive">
              {error}
            </Typography>
          </div>
        )}

        <FormField
          label="Email"
          type="email"
          placeholder="john@example.com"
          error={errors.email?.message}
          disabled={isLoading}
          required
          autoComplete="email"
          {...register("email")}
        />

        <FormField
          label="Password"
          type="password"
          placeholder="••••••••"
          error={errors.password?.message}
          disabled={isLoading}
          required
          autoComplete="current-password"
          labelAction={
            <Link
              href="/forgot-password"
              className="text-xs text-muted-foreground hover:text-primary"
            >
              Forgot password?
            </Link>
          }
          {...register("password")}
        />

        <Button type="submit" variant="gradient" fullWidth disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Signing in...
            </>
          ) : (
            "Sign in"
          )}
        </Button>

        <Typography variant="body2" className="text-center text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-primary hover:underline">
            Create one
          </Link>
        </Typography>
      </Stack>
    </form>
  );
}
