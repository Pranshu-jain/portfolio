import { NextResponse } from "next/server";
import { rankDemand } from "@/lib/demand";
import { siteConfig } from "@/lib/config";

export const dynamic = "force-dynamic";

// Public demand signal from RemoteOK. Cached upstream at 1h so refreshes never
// hit RemoteOK more than once per hour. Attribution is required by their ToS
// and shown in the UI (DemandPanel).
export async function GET() {
  try {
    const res = await fetch("https://remoteok.com/api", {
      headers: {
        // RemoteOK blocks requests without a UA.
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
    const result = rankDemand(raw, siteConfig.skills, 25);
    return NextResponse.json({ ok: true, ...result, source: "RemoteOK" });
  } catch (err) {
    console.error("[demand] fetch failed", err);
    return NextResponse.json(
      { ok: false, error: "Could not reach RemoteOK" },
      { status: 502 },
    );
  }
}
