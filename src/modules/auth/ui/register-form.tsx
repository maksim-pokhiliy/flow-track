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

import { useRegister } from "../api";
import { type RegisterInput, registerSchema } from "../model";

export function RegisterForm() {
  const { mutate: register, isPending } = useRegister();

  const form = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: RegisterInput) => {
    register(data);
  };

  return (
    <Stack direction="column" align="center" justify="center" className="min-h-screen">
      <Container maxWidth="sm" className="w-full">
        <Stack direction="column" spacing={8}>
          <Stack direction="column" spacing={2} align="center">
            <Typography className="text-center" variant="h3">
              Create account
            </Typography>

            <Typography variant="body2" className="text-muted-foreground text-center">
              Get started with your free account
            </Typography>
          </Stack>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <Stack direction="column" spacing={4}>
                <Stack direction="column" spacing={4}>
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormInput type="text" placeholder="Name (optional)" {...field} />
                    )}
                  />

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
                      <FormInput
                        type="password"
                        placeholder="Password (min 6 characters)"
                        {...field}
                      />
                    )}
                  />
                </Stack>

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
          </Form>

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
