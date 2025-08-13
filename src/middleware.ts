import { type NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const PUBLIC_ROUTES = ["/", "/login", "/register", "/pricing", "/invite"] as const;

function isPublic(pathname: string): boolean {
  for (const p of PUBLIC_ROUTES) {
    if (pathname === p || pathname.startsWith(`${p}/`)) {
      return true;
    }
  }

  return false;
}

function safeInternalPath(path: string | null): string | null {
  return path?.startsWith("/") ? path : null;
}

export async function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!isPublic(pathname) && !token) {
    const url = new URL("/login", req.url);

    url.searchParams.set("callbackUrl", `${pathname}${search}`);

    return NextResponse.redirect(url);
  }

  if ((pathname === "/login" || pathname === "/register") && token) {
    const target = safeInternalPath(req.nextUrl.searchParams.get("callbackUrl")) ?? "/workspaces";

    return NextResponse.redirect(new URL(target, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
