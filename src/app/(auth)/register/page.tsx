import Link from "next/link";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@app/components/ui/card";
import { RegisterForm } from "@app/features/auth";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Create account</CardTitle>

          <CardDescription>Start tracking your time with Chronos</CardDescription>
        </CardHeader>

        <CardContent>
          <RegisterForm />

          <div className="mt-6 text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="font-medium text-primary hover:underline">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
