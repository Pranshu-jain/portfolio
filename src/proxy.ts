import {
  NextResponse,
  type NextRequest,
  type NextFetchEvent,
  type NextMiddleware,
} from "next/server";
import { auth } from "@/auth";

// Gate the /admin dashboard AND the admin-only APIs it calls (funnel, demand).
// NextAuth's `auth()` wrapper gates correctly when AUTH_SECRET is set, but fails
// OPEN when it's missing (it logs and calls next() without running the callback).
// An auth gate must fail CLOSED, so we run an explicit config check first and
// only delegate to NextAuth once we know it can actually verify a session.

// Unauthed API calls get a 401 (not a redirect to an HTML login page).
function deny(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith("/api/")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const url = req.nextUrl.clone();
  url.pathname = "/admin/login";
  url.search = "";
  return NextResponse.redirect(url);
}

// `auth()` is overloaded (route handler + middleware); cast to the middleware
// signature so we can invoke it with (request, event).
const authed = auth((req) => {
  if (req.nextUrl.pathname === "/admin/login") return NextResponse.next();
  if (!req.auth?.user) return deny(req);
  return NextResponse.next();
}) as unknown as NextMiddleware;

export function proxy(req: NextRequest, event: NextFetchEvent) {
  // Login page stays reachable so a signed-out user can start the flow.
  if (req.nextUrl.pathname === "/admin/login") return NextResponse.next();
  // Fail closed: no secret means we cannot trust any session — deny.
  if (!process.env.AUTH_SECRET) return deny(req);
  return authed(req, event);
}

export const config = {
  // Protect the dashboard pages AND their data APIs. /api/chat and
  // /api/send-summary stay public (used by the public site).
  matcher: [
    "/admin",
    "/admin/:path*",
    "/api/funnel",
    "/api/funnel/:path*",
    "/api/demand",
    "/api/opportunities",
  ],
};
