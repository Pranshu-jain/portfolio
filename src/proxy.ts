import {
  NextResponse,
  type NextRequest,
  type NextFetchEvent,
  type NextMiddleware,
} from "next/server";
import { auth } from "@/auth";

// NextAuth's `auth()` wrapper gates correctly when AUTH_SECRET is set, but fails
// OPEN when it's missing (it logs and calls next() without running the callback).
// An auth gate must fail CLOSED, so we run an explicit config check first and
// only delegate to NextAuth once we know it can actually verify a session.

function loginRedirect(req: NextRequest) {
  const url = req.nextUrl.clone();
  url.pathname = "/admin/login";
  url.search = "";
  return NextResponse.redirect(url);
}

// `auth()` is overloaded (route handler + middleware); cast to the middleware
// signature so we can invoke it with (request, event).
const authed = auth((req) => {
  if (req.nextUrl.pathname === "/admin/login") return NextResponse.next();
  if (!req.auth?.user) return loginRedirect(req);
  return NextResponse.next();
}) as unknown as NextMiddleware;

export function proxy(req: NextRequest, event: NextFetchEvent) {
  // Login page stays reachable so a signed-out user can start the flow.
  if (req.nextUrl.pathname === "/admin/login") return NextResponse.next();
  // Fail closed: no secret means we cannot trust any session — deny.
  if (!process.env.AUTH_SECRET) return loginRedirect(req);
  return authed(req, event);
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
