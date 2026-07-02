import { NextRequest, NextResponse } from "next/server";
import { filterCandidates, type Candidate } from "@/lib/opportunities";
import { SOURCES, DEFAULT_SOURCE_IDS } from "@/lib/sources";
import { siteConfig } from "@/lib/config";

export const dynamic = "force-dynamic";

// Aggregate client/contract openings across permitted sources, matched to the
// owner's skills. Gated by the proxy (admin-only). `?sources=remoteok,remotive`
// selects which feeds to pull; defaults to all. One source failing does not
// break the others.
export async function GET(req: NextRequest) {
  const param = req.nextUrl.searchParams.get("sources");
  const requested = param
    ? param.split(",").map((s) => s.trim()).filter((id) => id in SOURCES)
    : DEFAULT_SOURCE_IDS;
  const ids = requested.length ? requested : DEFAULT_SOURCE_IDS;

  const results = await Promise.allSettled(ids.map((id) => SOURCES[id].fetch()));

  const candidates: Candidate[] = [];
  const sources = ids.map((id, i) => {
    const r = results[i];
    const ok = r.status === "fulfilled";
    if (ok) candidates.push(...r.value);
    return {
      id,
      label: SOURCES[id].label,
      attribution: SOURCES[id].attribution ?? null,
      ok,
      count: ok ? r.value.length : 0,
    };
  });

  const opportunities = filterCandidates(candidates, siteConfig.skills, 30);
  const anyOk = sources.some((s) => s.ok);

  return NextResponse.json(
    { ok: anyOk, opportunities, sources },
    { status: anyOk ? 200 : 502 },
  );
}
