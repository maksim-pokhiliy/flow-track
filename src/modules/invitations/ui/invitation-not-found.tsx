"use client";

import Link from "next/link";

import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  Typography,
} from "@app/components/ui";

export function InvitationNotFound() {
  return (
    <Card className="w-full">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Invalid invitation</CardTitle>
      </CardHeader>

      <CardContent className="text-center">
        <Typography variant="body1" className="text-muted-foreground">
          This invitation link is invalid, expired, or has already been used.
        </Typography>
      </CardContent>

      <CardFooter className="justify-center">
        <Button asChild variant="outline" size="lg" className="w-full max-w-xs">
          <Link href="/workspaces">Go to workspaces</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
