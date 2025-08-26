"use client";

import { useParams } from "next/navigation";

import { Container, ContentSection, QueryWrapper, Stack } from "@app/components/layout";
import { useCurrentUser } from "@app/modules/auth/api";

import { useInvitation } from "../api";

import { InvitationContent } from "./invitation-content";
import { InvitationNotFound } from "./invitation-not-found";

export function InvitationAcceptPage() {
  const params = useParams();
  const token = params["token"] as string;

  const { data: session, isLoading: isLoadingSession } = useCurrentUser();
  const { data: invitation, isLoading: isLoadingInvitation, error } = useInvitation(token);

  const isLoading = isLoadingSession || isLoadingInvitation;

  return (
    <QueryWrapper
      isLoading={isLoading}
      loadingText="Loading invitation..."
      error={error}
      data={invitation}
      renderEmpty={
        <Container className="min-h-full">
          <Stack justify="center" className="h-full">
            <ContentSection maxWidth="sm">
              <InvitationNotFound />
            </ContentSection>
          </Stack>
        </Container>
      }
    >
      {(inv) => (
        <Container className="min-h-full">
          <Stack justify="center" className="h-full">
            <ContentSection maxWidth="sm">
              <InvitationContent invitation={inv} user={session?.user} />
            </ContentSection>
          </Stack>
        </Container>
      )}
    </QueryWrapper>
  );
}
