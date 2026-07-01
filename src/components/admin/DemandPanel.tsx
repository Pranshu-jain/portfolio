"use client";

import { useEffect, useState } from "react";
import { RefreshCw } from "lucide-react";
import type { DemandResult } from "@/lib/demand";

type DemandResponse =
  | ({ ok: true; source: string } & DemandResult)
  | { ok: false; error: string };

function fmt(n: number | null): string {
  if (n === null) return "—";
  return "$" + n.toLocaleString();
}

export default function DemandPanel() {
  const [data, setData] = useState<DemandResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    void load();
  }, []);

  async function load() {
    setLoading(true);
    try {
      const res = await fetch("/api/demand");
      setData((await res.json()) as DemandResponse);
    } catch {
      setData({ ok: false, error: "Network error" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="p-6 rounded-2xl card-border">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-white">In-demand skills</h2>
        <button
          onClick={load}
          disabled={loading}
          aria-label="Refresh demand data"
          className="text-[#475569] hover:text-[#00d4ff] transition-colors disabled:opacity-40"
        >
          <RefreshCw size={15} className={loading ? "animate-spin" : ""} />
        </button>
      </div>

      {loading && <p className="text-[#475569] text-sm">Loading demand data…</p>}

      {!loading && data && !data.ok && (
        <p className="text-sm text-amber-400">
          Demand data unavailable right now. Try refreshing in a bit.
        </p>
      )}

      {!loading && data && data.ok && (
        <>
          <div className="flex flex-wrap gap-4 mb-5 text-sm">
            <div>
              <div className="text-[#94a3b8] font-semibold">{data.totalJobs}</div>
              <div className="text-[11px] uppercase tracking-wider text-[#475569]">
                jobs sampled
              </div>
            </div>
            <div>
              <div className="text-[#94a3b8] font-semibold">
                {fmt(data.rates.min)} – {fmt(data.rates.max)}
              </div>
              <div className="text-[11px] uppercase tracking-wider text-[#475569]">
                rate range ({data.rates.withSalary} with salary)
              </div>
            </div>
            <div>
              <div className="text-[#94a3b8] font-semibold">
                {fmt(data.rates.median)}
              </div>
              <div className="text-[11px] uppercase tracking-wider text-[#475569]">
                median
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {data.skills.map((s) => (
              <span
                key={s.tag}
                className={
                  "px-2.5 py-1 rounded-md text-[12px] border " +
                  (s.mine
                    ? "bg-[rgba(0,212,255,0.1)] text-[#00d4ff] border-[rgba(0,212,255,0.2)]"
                    : "bg-[rgba(255,255,255,0.03)] text-[#94a3b8] border-[rgba(255,255,255,0.06)]")
                }
                title={s.mine ? "You already offer this" : undefined}
              >
                {s.tag} <span className="opacity-60">{s.count}</span>
              </span>
            ))}
          </div>

          <p className="mt-5 text-[11px] text-[#334155]">
            Cyan = skills you already offer. Jobs data from{" "}
            <a
              href="https://remoteok.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#475569] hover:text-[#00d4ff] underline"
            >
              RemoteOK
            </a>
            .
          </p>
        </>
      )}
    </section>
  );
}
