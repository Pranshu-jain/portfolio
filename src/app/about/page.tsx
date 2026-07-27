import type { Metadata } from "next";
import Philosophy from "@/components/Philosophy";
import Footer from "@/components/Footer";
import Reveal from "@/components/motion/Reveal";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { dimensions } from "@/lib/fde";

export const metadata: Metadata = {
  title: "About — Pranshu, Forward Deployed Engineer",
  description:
    "Why I work as a forward deployed engineer: embedded with the team, deployed in their stack, owning the problem from ambiguity through adoption.",
};

const capabilities = [
  { emoji: "🛬", label: "Discovery on site", sub: "Ambiguity → one-page spec" },
  { emoji: "⚡", label: "Next.js / React", sub: "Frontend & SSR" },
  { emoji: "💎", label: "Rails / Ruby", sub: "Domain logic & APIs" },
  { emoji: "🐍", label: "Python / Django", sub: "Services & pipelines" },
  { emoji: "🗄️", label: "PostgreSQL / Redis", sub: "Modelling & indexing" },
  { emoji: "🤖", label: "LLMs / Agents", sub: "Deployed, not demoed" },
  { emoji: "🔌", label: "REST / Webhooks", sub: "Third-party integration" },
  { emoji: "☁️", label: "Docker / Vercel / Railway", sub: "Ship & operate" },
];

export default function AboutPage() {
  return (
    <>
      <div className="pt-28 max-w-7xl mx-auto px-6">
        {/* Hero */}
        <div className="max-w-3xl mb-24">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-semibold uppercase tracking-wider bg-[rgba(0,212,255,0.08)] text-[#00d4ff] border border-[rgba(0,212,255,0.12)] mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00d4ff]" />
              About
            </div>
          </Reveal>

          <Reveal delay={0.06}>
            <h1 className="text-5xl sm:text-7xl font-black text-white mb-8 leading-[1.02] tracking-tight">
              I&apos;m Pranshu.
              <br />
              <span className="gradient-text">I deploy forward.</span>
            </h1>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="text-[#94a3b8] text-xl leading-relaxed mb-6">
              Most engineering roles start after someone else has already done
              the hard part — deciding what to build. Forward deployment starts
              before that. I land inside the customer&apos;s environment, watch
              the actual work, and find the constraint that makes the obvious
              answer wrong.
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <p className="text-[#64748b] text-xl leading-relaxed mb-6">
              Then I build. In their stack, against their APIs, under their
              conventions — a thin end-to-end slice live on real data inside the
              first week, hardened into something load-bearing over the next
              few. Not a prototype handed to another team to finish.
            </p>
          </Reveal>

          <Reveal delay={0.24}>
            <p className="text-[#64748b] text-xl leading-relaxed mb-10">
              And I stay until it&apos;s used. Shipped is not the finish line —
              adopted is. The engagement ends when the customer&apos;s team can
              operate and extend it without me, and the metric we agreed on has
              actually moved.
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/build-with-me"
                className="flex items-center gap-2 px-8 py-4 rounded-full btn-gradient text-white font-semibold shine"
              >
                Deploy Me <ArrowRight size={16} />
              </Link>
              <Link
                href="/#deployments"
                className="flex items-center gap-2 px-8 py-4 rounded-full border border-[rgba(255,255,255,0.08)] text-[#94a3b8] hover:text-white hover:border-[rgba(0,212,255,0.2)] transition-all"
              >
                See Deployments
              </Link>
            </div>
          </Reveal>
        </div>

        {/* Dimension summary */}
        <div className="mb-24">
          <Reveal>
            <h2 className="text-2xl font-black text-white mb-2">
              Graded on eight axes
            </h2>
            <p className="text-[#475569] mb-8 max-w-xl">
              The full breakdown, with evidence for each, lives{" "}
              <Link
                href="/#dimensions"
                className="text-[#00d4ff] hover:underline"
              >
                on the home page
              </Link>
              .
            </p>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {dimensions.map((d, i) => (
              <Reveal key={d.id} delay={i * 0.05}>
                <div className="p-5 rounded-2xl card-border h-full">
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className="mono text-[10px] font-bold tracking-widest"
                      style={{ color: d.color }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  {/* Relative emphasis, deliberately unlabelled — a
                      self-assessed number would read as false precision. */}
                  <div className="h-1 rounded-full bg-[rgba(255,255,255,0.05)] overflow-hidden mb-4">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${d.score}%`,
                        background: `linear-gradient(90deg, ${d.color}55, ${d.color})`,
                      }}
                    />
                  </div>
                  <div className="text-sm font-bold text-white mb-1">
                    {d.label}
                  </div>
                  <div className="text-xs text-[#475569]">{d.short}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Toolkit */}
        <div className="mb-24">
          <Reveal>
            <h2 className="text-2xl font-black text-white mb-8">
              What I bring on deployment
            </h2>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {capabilities.map((c, i) => (
              <Reveal key={c.label} delay={i * 0.05}>
                <div className="p-5 rounded-2xl card-border flex flex-col gap-2 h-full">
                  <div className="text-2xl">{c.emoji}</div>
                  <div className="text-sm font-bold text-white">{c.label}</div>
                  <div className="text-xs text-[#475569]">{c.sub}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      <Philosophy />
      <Footer />
    </>
  );
}
