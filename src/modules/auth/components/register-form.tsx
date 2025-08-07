"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button, FormField, Stack, Typography } from "@app/components";

import { type RegisterInput, registerSchema } from "../schemas/auth.schema";

export function RegisterForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterInput) => {
    setIsLoading(true);

    try {
      const response = await fetch("/api/v1/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        toast.error("Registration failed", {
          description: result.error ?? "Unable to create your account. Please try again.",
        });
        setIsLoading(false);

        return;
      }

      const signInResult = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (signInResult?.error) {
        toast.warning("Account created", {
          description: "Your account was created successfully. Please sign in manually.",
        });

        router.push("/login");

        return;
      }

      toast.success("Welcome to Chronos!", {
        description: "Your account has been created successfully.",
      });

      router.push("/dashboard");
      router.refresh();
    } catch (err) {
      console.error("Registration error:", err);

      toast.error("Something went wrong", {
        description: "An unexpected error occurred. Please try again.",
      });

      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={4}>
        <FormField
          label="Name"
          type="text"
          placeholder="John Doe"
          error={errors.name?.message}
          disabled={isLoading}
          required
          autoComplete="name"
          {...register("name")}
        />

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
          hint="At least 8 characters with uppercase, lowercase and numbers"
          autoComplete="new-password"
          {...register("password")}
        />

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
