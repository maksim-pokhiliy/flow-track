"use client";

import { Clock } from "lucide-react";
import Link from "next/link";

import { GradientText, Stack } from "@app/components";

export function Logo() {
  return (
    <Link href="/">
      <Stack direction="row" spacing={3} align="center">
        <Stack className="rounded-lg bg-gradient-brand w-10 h-10" justify="center" align="center">
          <Clock className="text-white animate-clock-tick origin-center" />
        </Stack>

        <GradientText variant="h6">Chronos</GradientText>
      </Stack>
    </Link>
  );
}
