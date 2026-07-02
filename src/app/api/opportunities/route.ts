import { NextResponse } from "next/server";
import { matchOpportunities } from "@/lib/opportunities";
import { siteConfig } from "@/lib/config";

export const dynamic = "force-dynamic";

// Client/contract opportunities from RemoteOK (a permitted public feed), matched
// to the owner's skills. Gated by the proxy (admin-only). Cached 1h upstream.
export async function GET() {
  try {
    const res = await fetch("https://remoteok.com/api", {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; portfolio-admin/1.0)",
        Accept: "application/json",
      },
      next: { revalidate: 3600 },
    });
    if (!res.ok) {
      return NextResponse.json(
        { ok: false, error: `RemoteOK returned ${res.status}` },
        { status: 502 },
      );
    }
    const raw: unknown = await res.json();
    const opportunities = matchOpportunities(raw, siteConfig.skills, 25);
    return NextResponse.json({ ok: true, opportunities, source: "RemoteOK" });
  } catch (err) {
    console.error("[opportunities] fetch failed", err);
    return NextResponse.json(
      { ok: false, error: "Could not reach RemoteOK" },
      { status: 502 },
    );
  }
}
