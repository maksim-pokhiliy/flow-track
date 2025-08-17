"use client";

import { Role } from "@prisma/client";
import { ArrowRight, LogOut } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

import { Stack } from "@app/components/layout";
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  Typography,
} from "@app/components/ui";

import { useAcceptInvitation } from "../api";
import type { InvitationWithWorkspace } from "../model";

type Props = {
  invitation: InvitationWithWorkspace;
  user?: {
    id: string;
    email?: string | null;
    name?: string | null;
  };
};

const roleLabels = {
  [Role.OWNER]: "Owner",
  [Role.ADMIN]: "Admin",
  [Role.MEMBER]: "Member",
} as const;

export function InvitationContent({ invitation, user }: Props) {
  const params = useParams();
  const router = useRouter();

  const { mutate: acceptInvitation, isPending } = useAcceptInvitation();

  const token = params["token"] as string;
  const currentPath = `/invite/${token}`;

  const handleAccept = () => {
    acceptInvitation(invitation.token, {
      onSuccess: () => router.push("/workspaces"),
    });
  };

  const redirectToLogin = async () => {
    await signOut({
      redirect: true,
      callbackUrl: `/login?callbackUrl=${encodeURIComponent(currentPath)}`,
    });
  };

  const getState = () => {
    if (!user) {
      return "unauthenticated";
    }

    if (user.email !== invitation.email) {
      return "email-mismatch";
    }

    return "ready";
  };

  const state = getState();
  const needsAuth = state === "unauthenticated" || state === "email-mismatch";

  const renderFooter = () => {
    switch (state) {
      case "unauthenticated":
        return (
          <Button onClick={redirectToLogin} size="lg" className="w-full">
            Continue
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        );

      case "email-mismatch":
        return (
          <Button onClick={redirectToLogin} variant="outline" size="lg" className="w-full">
            <LogOut className="w-4 h-4 mr-2" />
            Switch account
          </Button>
        );

      case "ready":
        return (
          <Button
            onClick={handleAccept}
            loading={isPending}
            loadingText="Joining..."
            size="lg"
            className="w-full"
          >
            Join workspace
          </Button>
        );
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="text-center">
        <CardTitle>
          <Typography variant="h4">{invitation.workspace.name}</Typography>
        </CardTitle>
      </CardHeader>

      <CardContent className="text-center">
        <Stack spacing={4} align="center">
          <Typography variant="body1" className="text-muted-foreground">
            You&apos;ve been invited to join this workspace
          </Typography>

          <Badge variant="secondary">{roleLabels[invitation.role]} access</Badge>

          {needsAuth && (
            <Typography variant="body2" className="text-muted-foreground mt-2">
              Sign in as <strong>{invitation.email}</strong> to accept this invitation
            </Typography>
          )}

          {state === "email-mismatch" && (
            <Typography variant="caption" className="text-muted-foreground">
              Currently signed in as <strong>{user?.email}</strong>
            </Typography>
          )}
        </Stack>
      </CardContent>

      <CardFooter className="justify-center">{renderFooter()}</CardFooter>
    </Card>
  );
}
