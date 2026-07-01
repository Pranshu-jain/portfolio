import { NextRequest, NextResponse } from "next/server";
import {
  SESSION_COOKIE,
  DEFAULT_MAX_AGE_MS,
  signSession,
  verifyPassword,
} from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  let password = "";
  try {
    const body = (await req.json()) as { password?: unknown };
    password = typeof body.password === "string" ? body.password : "";
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  if (!verifyPassword(password)) {
    return NextResponse.json({ error: "Incorrect password" }, { status: 401 });
  }

  let token: string;
  try {
    token = await signSession(Date.now());
  } catch {
    // ADMIN_SESSION_SECRET missing — misconfigured deploy, fail closed.
    return NextResponse.json({ error: "Auth not configured" }, { status: 500 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: Math.floor(DEFAULT_MAX_AGE_MS / 1000),
  });
  return res;
}
