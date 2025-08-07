import { LandingHeader } from "@app/components";

type LandingLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default function LandingLayout({ children }: LandingLayoutProps) {
  return (
    <>
      <LandingHeader />

      {children}
    </>
  );
}
