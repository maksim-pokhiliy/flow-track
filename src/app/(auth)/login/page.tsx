import Link from "next/link";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@app/components/ui/card";
import { LoginForm } from "@app/features/auth";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>

          <CardDescription>Sign in to your Chronos account</CardDescription>
        </CardHeader>

        <CardContent>
          <LoginForm />

          <div className="mt-6 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="font-medium text-primary hover:underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
