"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";

import {
  Button,
  Container,
  Form,
  FormField,
  FormInput,
  Stack,
  Typography,
} from "@app/components/ui";

import { useLogin } from "../api";
import { type LoginInput, loginSchema } from "../model";

export function LoginForm() {
  const { mutate: login, isPending } = useLogin();

  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginInput) => {
    login(data);
  };

  return (
    <Container maxWidth="sm" className="w-full h-full">
      <Stack justify="center" className="h-full">
        <Stack spacing={8}>
          <Stack spacing={2} align="center">
            <Typography className="text-center" variant="h3">
              Sign in
            </Typography>

            <Typography variant="body2" className="text-muted-foreground text-center">
              Enter your email and password to continue
            </Typography>
          </Stack>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <Stack spacing={4}>
                <Stack spacing={4}>
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormInput type="email" placeholder="Email" {...field} />
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormInput type="password" placeholder="Password" {...field} />
                    )}
                  />
                </Stack>

                <Button
                  type="submit"
                  loading={isPending}
                  loadingText="Signing in..."
                  className="w-full"
                >
                  Sign in
                </Button>
              </Stack>
            </form>
          </Form>

          <Typography variant="body2" className="text-center text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-primary hover:underline">
              Sign up
            </Link>
          </Typography>
        </Stack>
      </Stack>
    </Container>
  );
}
