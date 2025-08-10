"use client";

import { ContentSection, Stack, Typography } from "@app/components/ui";

export function LandingPage() {
  return (
    <ContentSection>
      <Stack>
        <Typography variant="h1">FlowTrack</Typography>

        <Typography variant="body1" className="mt-3 text-fg-muted text-balance">
          Beautiful, intuitive time tracking built by perfectionists.
        </Typography>
      </Stack>
    </ContentSection>
  );
}
