"use client";

import { useEffect, useState } from "react";
import { RefreshCw, ExternalLink, Check, Plus } from "lucide-react";
import type { Opportunity } from "@/lib/opportunities";

type Resp =
  | { ok: true; source: string; opportunities: Opportunity[] }
  | { ok: false; error: string };

export default function OpportunitiesPanel() {
  const [data, setData] = useState<Resp | null>(null);
  const [loading, setLoading] = useState(true);
  const [logged, setLogged] = useState<Record<string, "saving" | "done">>({});

  useEffect(() => {
    void load();
  }, []);

  async function load() {
    setLoading(true);
    try {
      const res = await fetch("/api/opportunities");
      setData((await res.json()) as Resp);
    } catch {
      setData({ ok: false, error: "Network error" });
    } finally {
      setLoading(false);
    }
  }

  async function logToFunnel(o: Opportunity) {
    setLogged((m) => ({ ...m, [o.url]: "saving" }));
    try {
      const res = await fetch("/api/funnel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          platform: (data && data.ok && data.source) || "RemoteOK",
          stage: "applied",
          rate_seen: o.rate,
          requirements: o.matched.length ? o.matched : o.tags.slice(0, 3),
          notes: `${o.title} @ ${o.company} — ${o.url}`,
        }),
      });
      if (!res.ok) throw new Error();
      setLogged((m) => ({ ...m, [o.url]: "done" }));
    } catch {
      setLogged((m) => {
        const next = { ...m };
        delete next[o.url];
        return next;
      });
    }
  }

  return (
    <section className="p-6 rounded-2xl card-border">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-white">Opportunities</h2>
        <button
          onClick={load}
          disabled={loading}
          aria-label="Refresh opportunities"
          className="text-[#475569] hover:text-[#00d4ff] transition-colors disabled:opacity-40"
        >
          <RefreshCw size={15} className={loading ? "animate-spin" : ""} />
        </button>
      </div>

      {loading && <p className="text-[#475569] text-sm">Loading opportunities…</p>}

      {!loading && data && !data.ok && (
        <p className="text-sm text-amber-400">
          Opportunities unavailable right now. Try refreshing shortly.
        </p>
      )}

      {!loading && data && data.ok && data.opportunities.length === 0 && (
        <p className="text-[#475569] text-sm">
          No matching openings right now. Refresh later, or broaden your skills in config.
        </p>
      )}

      {!loading && data && data.ok && data.opportunities.length > 0 && (
        <div className="space-y-3">
          {data.opportunities.map((o) => (
            <div
              key={o.url}
              className="p-4 rounded-xl border border-[rgba(255,255,255,0.06)] hover:border-[rgba(0,212,255,0.2)] transition-colors"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="text-white font-medium truncate">{o.title}</div>
                  <div className="text-[#475569] text-sm">
                    {o.company}
                    {o.rate ? ` · ${o.rate}` : ""}
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <a
                    href={o.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-[#00d4ff] hover:underline"
                  >
                    Apply <ExternalLink size={12} />
                  </a>
                  <button
                    onClick={() => logToFunnel(o)}
                    disabled={!!logged[o.url]}
                    className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-md border border-[rgba(255,255,255,0.08)] text-[#94a3b8] hover:text-white disabled:opacity-60"
                  >
                    {logged[o.url] === "done" ? (
                      <>
                        <Check size={12} /> Logged
                      </>
                    ) : (
                      <>
                        <Plus size={12} /> {logged[o.url] === "saving" ? "…" : "Log"}
                      </>
                    )}
                  </button>
                </div>
              </div>
              {(o.matched.length > 0 || o.tags.length > 0) && (
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {(o.matched.length ? o.matched : o.tags.slice(0, 4)).map((t) => (
                    <span
                      key={t}
                      className={
                        "px-2 py-0.5 rounded text-[11px] " +
                        (o.matched.includes(t)
                          ? "bg-[rgba(0,212,255,0.1)] text-[#00d4ff]"
                          : "bg-[rgba(255,255,255,0.03)] text-[#475569]")
                      }
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
          <p className="text-[11px] text-[#334155]">
            Cyan = matches your skills. Openings from{" "}
            <a
              href="https://remoteok.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#475569] hover:text-[#00d4ff] underline"
            >
              RemoteOK
            </a>
            . Applying opens the real listing; "Log" adds it to your funnel.
          </p>
        </div>
      )}
    </section>
  );
}
