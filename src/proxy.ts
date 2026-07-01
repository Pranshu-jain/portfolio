import { auth } from "@/auth";
import { NextResponse } from "next/server";

// Gate the /admin dashboard behind an Auth.js (Google) session. The login page
// itself stays open so a signed-out user can reach the sign-in button.
// `auth()` decorates the request with `req.auth` (the session or null).
export const proxy = auth((req) => {
  if (req.nextUrl.pathname === "/admin/login") {
    return NextResponse.next();
  }
  if (!req.auth) {
    const url = req.nextUrl.clone();
    url.pathname = "/admin/login";
    url.search = "";
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
});

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
