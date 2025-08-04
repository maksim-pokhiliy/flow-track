"use client";

import { Clock, LogOut } from "lucide-react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

import { Button } from "@app/components/ui/button";

interface HeaderProps {
  variant?: "landing" | "app";
}

export function Header({ variant = "landing" }: HeaderProps) {
  const { data: session } = useSession();

  if (variant === "landing") {
    return (
      <header className="border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Clock className="h-6 w-6" />

            <span className="text-xl font-bold">Chronos</span>
          </Link>

          <div className="flex items-center gap-4">
            {session ? (
              <>
                <span className="text-sm text-muted-foreground">
                  Welcome, {session.user.name?.split(" ")[0]}!
                </span>

                <Link href="/dashboard">
                  <Button variant="ghost">Dashboard</Button>
                </Link>

                <Button variant="ghost" size="sm" onClick={() => signOut()}>
                  <LogOut className="h-4 w-4" />
                </Button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost">Sign in</Button>
                </Link>

                <Link href="/register">
                  <Button>Get Started</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="h-16 border-b bg-card flex items-center px-6">
      <div className="flex-1" />

      <div className="flex items-center gap-4">
        <span className="text-sm text-muted-foreground">
          Welcome back, {session?.user?.name?.split(" ")[0]}!
        </span>

        <Button variant="ghost" size="sm" onClick={() => signOut()}>
          <LogOut className="h-4 w-4" />
        </Button>
      </div>
    </header>
  );
}
