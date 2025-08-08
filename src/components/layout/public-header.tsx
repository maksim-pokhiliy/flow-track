import Link from "next/link";

export function PublicHeader() {
  return (
    <header className="border-b border-default">
      <div className="mx-auto flex max-w-6xl items-center justify-between p-4">
        <Link href="/" className="font-semibold">
          FlowTrack
        </Link>
        <nav className="flex items-center gap-4">
          <Link href="/pricing">Pricing</Link>
          <Link href="/login">Log in</Link>
        </nav>
      </div>
    </header>
  );
}
