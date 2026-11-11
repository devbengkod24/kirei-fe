import { NextResponse, type NextRequest } from "next/server";
import { authMode, laravelSessionCookie } from "@/lib/auth/mode";
import { homeFor, LOGIN_PATH, SESSION_COOKIE, userFromSession } from "@/lib/auth/session";

/**
 * Optimistic redirects from the session cookie. Pages still check the role with requireRole.
 * With the real Laravel session the proxy cannot tell who it is without calling the API, so it only
 * checks that a session cookie exists; the login page and the role layouts do the rest.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (authMode() === "api") {
    const hasSession = request.cookies.has(laravelSessionCookie());
    if (pathname === LOGIN_PATH || hasSession) return NextResponse.next();
    return NextResponse.redirect(new URL(LOGIN_PATH, request.url));
  }

  const user = userFromSession(request.cookies.get(SESSION_COOKIE)?.value);
  const home = user && homeFor(user.role);

  if (pathname === LOGIN_PATH) {
    return home ? NextResponse.redirect(new URL(home, request.url)) : NextResponse.next();
  }
  if (!user) {
    const response = NextResponse.redirect(new URL(LOGIN_PATH, request.url));
    response.cookies.delete(SESSION_COOKIE);
    return response;
  }
  if (pathname === "/" && home) {
    return NextResponse.redirect(new URL(home, request.url));
  }
  return NextResponse.next();
}

export const config = {
  // Everything except Next internals and files in public/ (anything with an extension).
  matcher: ["/((?!_next/|.*\\.[^/]+$).*)"],
};
