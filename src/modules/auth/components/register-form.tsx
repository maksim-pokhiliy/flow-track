"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { Button, Stack, Typography } from "@app/components";

import { type RegisterInput, registerSchema } from "../schemas/auth.schema";

export function RegisterForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterInput) => {
    setIsLoading(true);
    setError(null);

    try {
      // 1. Регистрируем пользователя
      const response = await fetch("/api/v1/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error ?? "Registration failed");
      }

      // 2. Автоматически логинимся
      const signInResult = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (signInResult?.error) {
        throw new Error("Failed to sign in after registration");
      }

      // 3. Редиректим на dashboard
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
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

        <Stack spacing={2}>
          <label htmlFor="name" className="text-sm font-medium">
            Name (optional)
          </label>
          <input
            id="name"
            type="text"
            {...register("name")}
            className="h-10 w-full rounded-lg border border-border bg-background px-3 text-sm transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            placeholder="John Doe"
            disabled={isLoading}
          />
          {errors.name && (
            <Typography variant="caption" className="text-destructive">
              {errors.name.message}
            </Typography>
          )}
        </Stack>

        <Stack spacing={2}>
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            type="email"
            {...register("email")}
            className="h-10 w-full rounded-lg border border-border bg-background px-3 text-sm transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            placeholder="john@example.com"
            disabled={isLoading}
            autoComplete="email"
          />
          {errors.email && (
            <Typography variant="caption" className="text-destructive">
              {errors.email.message}
            </Typography>
          )}
        </Stack>

        <Stack spacing={2}>
          <label htmlFor="password" className="text-sm font-medium">
            Password
          </label>
          <input
            id="password"
            type="password"
            {...register("password")}
            className="h-10 w-full rounded-lg border border-border bg-background px-3 text-sm transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            placeholder="••••••••"
            disabled={isLoading}
            autoComplete="new-password"
          />
          {errors.password && (
            <Typography variant="caption" className="text-destructive">
              {errors.password.message}
            </Typography>
          )}
        </Stack>

        <Button type="submit" variant="gradient" fullWidth disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Creating account...
            </>
          ) : (
            "Create account"
          )}
        </Button>

        <Typography variant="body2" className="text-center text-muted-foreground">
          Already have an account?{" "}
          <Link href="/login" className="text-primary hover:underline">
            Sign in
          </Link>
        </Typography>
      </Stack>
    </form>
  );
}
