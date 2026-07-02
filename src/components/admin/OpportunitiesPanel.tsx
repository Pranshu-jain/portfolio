"use client";

import { useEffect, useState, useCallback } from "react";
import { RefreshCw, ExternalLink, Check, Plus } from "lucide-react";
import type { Opportunity } from "@/lib/opportunities";

const PRESETS = [
  { id: "remoteok", label: "RemoteOK" },
  { id: "remotive", label: "Remotive" },
];

interface SourceStatus {
  id: string;
  label: string;
  attribution: string | null;
  ok: boolean;
  count: number;
}
type Resp =
  | { ok: true; opportunities: Opportunity[]; sources: SourceStatus[] }
  | { ok: false; opportunities: []; sources: SourceStatus[] };

export default function OpportunitiesPanel() {
  const [data, setData] = useState<Resp | null>(null);
  const [loading, setLoading] = useState(true);
  const [enabled, setEnabled] = useState<Set<string>>(
    () => new Set(PRESETS.map((p) => p.id)),
  );
  const [logged, setLogged] = useState<Record<string, "saving" | "done">>({});

  const load = useCallback(async (ids: Set<string>) => {
    if (ids.size === 0) {
      setData({ ok: false, opportunities: [], sources: [] });
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`/api/opportunities?sources=${[...ids].join(",")}`);
      setData((await res.json()) as Resp);
    } catch {
      setData({ ok: false, opportunities: [], sources: [] });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load(enabled);
  }, [enabled, load]);

  function toggle(id: string) {
    setEnabled((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  async function logToFunnel(o: Opportunity) {
    setLogged((m) => ({ ...m, [o.url]: "saving" }));
    try {
      const res = await fetch("/api/funnel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          platform: o.source || "Opportunity",
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
        const n = { ...m };
        delete n[o.url];
        return n;
      });
    }
  }

  const opps = data && "opportunities" in data ? data.opportunities : [];

  return (
    <section className="p-6 rounded-2xl card-border">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-bold text-white">Opportunities</h2>
        <button
          onClick={() => load(enabled)}
          disabled={loading}
          aria-label="Refresh opportunities"
          className="text-[#475569] hover:text-[#00d4ff] transition-colors disabled:opacity-40"
        >
          <RefreshCw size={15} className={loading ? "animate-spin" : ""} />
        </button>
      </div>

      {/* Source preset toggles */}
      <div className="flex flex-wrap gap-2 mb-4">
        {PRESETS.map((p) => {
          const on = enabled.has(p.id);
          const status = data?.sources?.find((s) => s.id === p.id);
          return (
            <button
              key={p.id}
              onClick={() => toggle(p.id)}
              className={
                "px-2.5 py-1 rounded-md text-[12px] border transition-colors " +
                (on
                  ? "bg-[rgba(0,212,255,0.1)] text-[#00d4ff] border-[rgba(0,212,255,0.25)]"
                  : "bg-transparent text-[#475569] border-[rgba(255,255,255,0.08)]")
              }
              aria-pressed={on}
            >
              {p.label}
              {on && status ? (
                <span className="opacity-60"> {status.ok ? status.count : "!"}</span>
              ) : null}
            </button>
          );
        })}
      </div>

      {loading && <p className="text-[#475569] text-sm">Loading opportunities…</p>}

      {!loading && enabled.size === 0 && (
        <p className="text-[#475569] text-sm">Select a source above to see openings.</p>
      )}

      {!loading && enabled.size > 0 && data && !data.ok && (
        <p className="text-sm text-amber-400">
          Sources unavailable right now. Try refreshing shortly.
        </p>
      )}

      {!loading && data && data.ok && opps.length === 0 && (
        <p className="text-[#475569] text-sm">
          No matching openings from the selected sources. Try another source or refresh later.
        </p>
      )}

      {!loading && opps.length > 0 && (
        <div className="space-y-3">
          {opps.map((o) => (
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
                    <span className="ml-2 text-[11px] text-[#334155]">{o.source}</span>
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
            Cyan = matches your skills. Applying opens the real listing; "Log" adds it to
            your funnel.
            {data?.sources
              ?.filter((s) => s.attribution && s.ok && s.count > 0)
              .map((s) => ` ${s.attribution}.`)}
          </p>
        </div>
      )}
    </section>
  );
}
