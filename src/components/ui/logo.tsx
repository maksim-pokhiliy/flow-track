import Link from "next/link";

import { Typography } from "@app/components/ui";

type LogoProps = {
  href?: string;
  className?: string;
};

export function Logo({ href = "/", className }: LogoProps) {
  return (
    <Link href={href} className={className}>
      <Typography variant="h3" className="font-bold">
        FlowTrack
      </Typography>
    </Link>
  );
}
