"use client";

import { Loader } from "lucide-react";

import { ContentSection, Stack } from "@app/components/layout";
import { Typography } from "@app/components/ui/typography";

type QueryWrapperProps<T> = {
  isLoading: boolean;
  loadingText?: string;
  error: unknown | null;
  data: T | undefined;
  children: (data: T) => React.ReactNode;
  isEmpty?: (data: T) => boolean;
  renderEmpty?: React.ReactNode | (() => React.ReactNode);
};

export function QueryWrapper<T>({
  isLoading,
  loadingText,
  error,
  data,
  children,
  isEmpty,
  renderEmpty,
}: QueryWrapperProps<T>) {
  if (isLoading) {
    return (
      <ContentSection maxWidth="2xl">
        <Stack align="center" justify="center" spacing={2} direction="row">
          <Loader className="animate-spin" />

          <Typography variant="h4" className="font-normal">
            {loadingText ?? "Loading..."}
          </Typography>
        </Stack>
      </ContentSection>
    );
  }

  if (error) {
    const err = (error as Error) ?? new Error("Unknown error");

    return (
      <ContentSection maxWidth="2xl">
        <Stack align="center" justify="center">
          <Typography className="text-destructive">{err.message}</Typography>
        </Stack>
      </ContentSection>
    );
  }

  const empty = !data || (isEmpty?.(data) ?? false);

  if (empty) {
    if (!renderEmpty) {
      return null;
    }

    return (
      <>
        {typeof renderEmpty === "function" ? (renderEmpty as () => React.ReactNode)() : renderEmpty}
      </>
    );
  }

  return <>{children(data)}</>;
}
