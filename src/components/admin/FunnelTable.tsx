"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import type { FunnelEntry } from "@/lib/db";

const ACCOUNT_STATUSES = ["none", "created", "vetting", "approved", "rejected"];
const STAGES = ["applied", "interview", "offer", "won", "lost"];

const EMPTY_NEW = {
  platform: "",
  account_status: "none",
  stage: "applied",
  rate_seen: "",
  requirements: "",
  notes: "",
};

export default function FunnelTable() {
  const [entries, setEntries] = useState<FunnelEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [draft, setDraft] = useState({ ...EMPTY_NEW });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    void load();
  }, []);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/funnel");
      const data = (await res.json()) as { entries?: FunnelEntry[]; error?: string };
      if (!res.ok) throw new Error(data.error ?? "Failed to load");
      setEntries(data.entries ?? []);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load");
    } finally {
      setLoading(false);
    }
  }

  async function addEntry(e: React.FormEvent) {
    e.preventDefault();
    if (!draft.platform.trim()) return;
    setSaving(true);
    try {
      const res = await fetch("/api/funnel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          platform: draft.platform.trim(),
          account_status: draft.account_status,
          stage: draft.stage,
          rate_seen: draft.rate_seen.trim() || null,
          requirements: draft.requirements
            .split(",")
            .map((r) => r.trim())
            .filter(Boolean),
          notes: draft.notes.trim() || null,
        }),
      });
      const data = (await res.json()) as { entry?: FunnelEntry; error?: string };
      if (!res.ok || !data.entry) throw new Error(data.error ?? "Failed to add");
      setEntries((prev) => [data.entry!, ...prev]);
      setDraft({ ...EMPTY_NEW });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to add");
    } finally {
      setSaving(false);
    }
  }

  async function patchEntry(id: string, patch: Partial<FunnelEntry>) {
    // optimistic update
    setEntries((prev) => prev.map((x) => (x.id === id ? { ...x, ...patch } : x)));
    try {
      const res = await fetch(`/api/funnel/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patch),
      });
      if (!res.ok) throw new Error();
    } catch {
      setError("Update failed — reloading");
      void load();
    }
  }

  async function removeEntry(id: string) {
    const prev = entries;
    setEntries((cur) => cur.filter((x) => x.id !== id));
    try {
      const res = await fetch(`/api/funnel/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
    } catch {
      setError("Delete failed — reloading");
      setEntries(prev);
    }
  }

  return (
    <section className="p-6 rounded-2xl card-border">
      <h2 className="text-lg font-bold text-white mb-4">Application funnel</h2>

      {/* Add form */}
      <form onSubmit={addEntry} className="flex flex-wrap gap-2 mb-5">
        <input
          placeholder="Platform (e.g. micro1)"
          value={draft.platform}
          onChange={(e) => setDraft({ ...draft, platform: e.target.value })}
          className="flex-1 min-w-[140px] px-3 py-2 rounded-lg text-sm bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.06)] text-white focus:outline-none focus:border-[rgba(0,212,255,0.25)]"
        />
        <input
          placeholder="Rate seen"
          value={draft.rate_seen}
          onChange={(e) => setDraft({ ...draft, rate_seen: e.target.value })}
          className="w-28 px-3 py-2 rounded-lg text-sm bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.06)] text-white focus:outline-none focus:border-[rgba(0,212,255,0.25)]"
        />
        <button
          type="submit"
          disabled={saving || !draft.platform.trim()}
          className="px-4 py-2 rounded-lg btn-gradient text-white text-sm font-medium flex items-center gap-1.5 disabled:opacity-40"
        >
          <Plus size={14} /> Add
        </button>
      </form>

      {loading && <p className="text-[#475569] text-sm">Loading…</p>}
      {error && (
        <p className="text-sm text-amber-400 mb-3">
          {error}. If this is the first run, set <code>DATABASE_URL</code> in Vercel.
        </p>
      )}
      {!loading && !error && entries.length === 0 && (
        <p className="text-[#475569] text-sm">
          No applications tracked yet. Add micro1 / Toptal above once you apply.
        </p>
      )}

      {entries.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-[11px] uppercase tracking-wider text-[#475569]">
                <th className="py-2 pr-3">Platform</th>
                <th className="py-2 pr-3">Account</th>
                <th className="py-2 pr-3">Stage</th>
                <th className="py-2 pr-3">Rate</th>
                <th className="py-2 pr-3"></th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry) => (
                <tr key={entry.id} className="border-t border-[rgba(255,255,255,0.06)]">
                  <td className="py-2 pr-3 text-white font-medium">{entry.platform}</td>
                  <td className="py-2 pr-3">
                    <select
                      value={entry.account_status}
                      onChange={(e) =>
                        patchEntry(entry.id, { account_status: e.target.value })
                      }
                      className="bg-transparent border border-[rgba(255,255,255,0.08)] rounded-md px-2 py-1 text-[#94a3b8] focus:outline-none"
                    >
                      {ACCOUNT_STATUSES.map((s) => (
                        <option key={s} value={s} className="bg-[#0f0f0f]">
                          {s}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="py-2 pr-3">
                    <select
                      value={entry.stage}
                      onChange={(e) => patchEntry(entry.id, { stage: e.target.value })}
                      className="bg-transparent border border-[rgba(255,255,255,0.08)] rounded-md px-2 py-1 text-[#94a3b8] focus:outline-none"
                    >
                      {STAGES.map((s) => (
                        <option key={s} value={s} className="bg-[#0f0f0f]">
                          {s}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="py-2 pr-3 text-[#94a3b8]">{entry.rate_seen ?? "—"}</td>
                  <td className="py-2 pr-3 text-right">
                    <button
                      onClick={() => removeEntry(entry.id)}
                      aria-label="Delete entry"
                      className="text-[#334155] hover:text-red-400 transition-colors"
                    >
                      <Trash2 size={15} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
