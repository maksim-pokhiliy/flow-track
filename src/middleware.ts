import { auth } from "@app/lib/auth/config";

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const { pathname } = req.nextUrl;

  const isProtectedPath =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/projects") ||
    (pathname.startsWith("/api/v1") && !pathname.startsWith("/api/v1/auth"));

  const isAuthPage = pathname === "/login" || pathname === "/register";

  if (isLoggedIn && isAuthPage) {
    return Response.redirect(new URL("/dashboard", req.nextUrl));
  }

  if (!isLoggedIn && isProtectedPath) {
    const from = pathname;

    return Response.redirect(new URL(`/login?from=${encodeURIComponent(from)}`, req.nextUrl));
  }

  return null;
});

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*|api/health).*)"],
};
