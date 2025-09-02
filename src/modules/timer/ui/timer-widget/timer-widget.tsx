"use client";

import { Stack } from "@app/components/layout";

import { ContextSelector } from "./context-selector";
import { TimerControl } from "./timer-control";
import { TimerDisplay } from "./timer-display";

export function TimerWidget() {
  return (
    <Stack direction="row" spacing={2} align="center">
      <TimerControl />
      <ContextSelector />
      <TimerDisplay />
    </Stack>
  );
}
