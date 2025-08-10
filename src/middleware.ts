import { type NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const PUBLIC_AUTH_PAGES = ["/login", "/register"] as const;
const PRIVATE_PAGES = ["/workspaces", "/projects", "/timer", "/analytics"] as const;

const PROTECTED_API_PREFIXES = [
  "/api/workspaces",
  "/api/projects",
  "/api/tasks",
  "/api/timer",
  "/api/analytics",
  "/api/invoices",
  "/api/invitations",
] as const;

function startsWithAny(pathname: string, prefixes: readonly string[]) {
  return prefixes.some((p) => pathname === p || pathname.startsWith(`${p}/`));
}

export async function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/static") ||
    pathname.startsWith("/assets") ||
    pathname === "/favicon.ico" ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml"
  ) {
    return NextResponse.next();
  }

  const token = await getToken({ req });

  if (PUBLIC_AUTH_PAGES.includes(pathname as (typeof PUBLIC_AUTH_PAGES)[number])) {
    if (token) {
      const url = req.nextUrl.clone();

      url.pathname = "/workspaces";
      url.search = "";

      return NextResponse.redirect(url);
    }

    return NextResponse.next();
  }

  if (startsWithAny(pathname, PRIVATE_PAGES)) {
    if (!token) {
      const url = req.nextUrl.clone();
      const next = pathname + (search || "");

      url.pathname = "/login";
      url.search = `?next=${encodeURIComponent(next)}`;

      return NextResponse.redirect(url);
    }

    return NextResponse.next();
  }

  if (pathname.startsWith("/api/")) {
    if (pathname.startsWith("/api/auth")) {
      return NextResponse.next();
    }

    if (startsWithAny(pathname, PROTECTED_API_PREFIXES)) {
      if (!token) {
        return NextResponse.json(
          { error: { code: "UNAUTHORIZED", message: "Authentication required" } },
          { status: 401 },
        );
      }
    }

    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/login",
    "/register",

    "/workspaces/:path*",
    "/projects/:path*",
    "/timer/:path*",
    "/analytics/:path*",

    "/api/:path*",
  ],
};
