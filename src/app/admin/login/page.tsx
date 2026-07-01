"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, ArrowRight } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        router.replace("/admin");
        router.refresh();
      } else {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        setError(data.error ?? "Login failed");
      }
    } catch {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-[#050505]">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-sm p-8 rounded-3xl gradient-border relative overflow-hidden"
      >
        <div className="flex items-center gap-2 mb-6 text-[#00d4ff]">
          <Lock size={18} />
          <h1 className="text-lg font-bold text-white">Admin access</h1>
        </div>
        <label className="block text-[11px] uppercase tracking-wider text-[#475569] mb-2">
          Password
        </label>
        <input
          type="password"
          autoFocus
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.06)] text-white focus:outline-none focus:border-[rgba(0,212,255,0.25)] transition-colors"
        />
        {error && <p className="mt-3 text-sm text-red-400">{error}</p>}
        <button
          type="submit"
          disabled={loading || !password}
          className="mt-5 w-full py-2.5 rounded-xl btn-gradient text-white text-sm font-medium flex items-center justify-center gap-2 disabled:opacity-40 transition-opacity"
        >
          {loading ? "Checking…" : "Enter"} <ArrowRight size={14} />
        </button>
      </form>
    </div>
  );
}
