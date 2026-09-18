import type { Metadata } from "next";
import FDEDimensions from "@/components/FDEDimensions";
import Philosophy from "@/components/Philosophy";
import Footer from "@/components/Footer";
import Reveal from "@/components/motion/Reveal";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { siteConfig } from "@/lib/config";
import { experience } from "@/lib/experience";

export const metadata: Metadata = {
  title: "About",
  description:
    "Why I work as a forward deployed engineer: embedded with the team, deployed in their stack, owning the problem from ambiguity through adoption.",
};

const capabilities = [
  { emoji: "🛬", label: "Discovery on site", sub: "Ambiguity → one-page spec" },
  { emoji: "⚡", label: "Next.js / React", sub: "Frontend & SSR" },
  { emoji: "💎", label: "Rails / Ruby", sub: "Domain logic & APIs" },
  { emoji: "🐍", label: "Python / PySpark", sub: "Pipelines" },
  { emoji: "🗄️", label: "PostgreSQL / Redis", sub: "Modelling, indexing, Sidekiq jobs" },
  { emoji: "🤖", label: "LangChain / LangGraph", sub: "RAG & agents" },
  { emoji: "🔌", label: "REST / GraphQL", sub: "APIs & third-party integration" },
  { emoji: "☁️", label: "Docker / AWS / Vercel", sub: "Ship & operate" },
];

export default function AboutPage() {
  return (
    <>
      <div className="pt-28 max-w-7xl mx-auto px-6">
        {/* Hero */}
        <div className="max-w-3xl mb-24">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-semibold uppercase tracking-wider bg-[rgba(14,165,233,0.08)] text-[#0284c7] border border-[rgba(14,165,233,0.12)] mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0284c7]" />
              About
            </div>
          </Reveal>

          <Reveal delay={0.06}>
            <h1 className="text-5xl sm:text-7xl font-black text-[#0f172a] mb-8 leading-[1.02] tracking-tight">
              I&apos;m Pranshu Jain.
              <br />
              <span className="gradient-text">I deploy forward.</span>
            </h1>
          </Reveal>

          {/* The facts first — who, how long, where. Philosophy comes after. */}
          <Reveal delay={0.1}>
            <p className="text-[#0f172a] text-xl leading-relaxed mb-6">
              I&apos;m a software engineer with {siteConfig.experience} of
              experience shipping Rails apps, data pipelines, and AI agents to
              production, across three companies:
            </p>
          </Reveal>

          <Reveal delay={0.12}>
            <ul className="flex flex-col gap-3 mb-6">
              {experience.map((role) => (
                <li key={role.id} className="flex items-start gap-3">
                  <span
                    className="w-1.5 h-1.5 rounded-full shrink-0 mt-[9px]"
                    style={{ background: role.color }}
                  />
                  <span className="text-[#475569] text-base leading-relaxed">
                    <span className="font-semibold text-[#0f172a]">
                      {role.company}
                    </span>{" "}
                    <span className="mono text-[11px] text-[#94a3b8]">
                      {role.dates}
                    </span>
                    <br />
                    {role.summary}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.14}>
            <p className="mono text-[11px] tracking-wider text-[#64748b] mb-12">
              {siteConfig.location} · Open to remote work
            </p>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="text-[#475569] text-xl leading-relaxed mb-6">
              Most engineering roles start after someone else has already done
              the hard part — deciding what to build. Forward deployment starts
              before that. I land inside the customer&apos;s environment, watch
              the actual work, and find the constraint that makes the obvious
              answer wrong.
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <p className="text-[#475569] text-xl leading-relaxed mb-6">
              Then I build. In their stack, against their APIs, under their
              conventions — a thin end-to-end slice live on real data inside the
              first week, hardened into something load-bearing over the next
              few. Not a prototype handed to another team to finish.
            </p>
          </Reveal>

          <Reveal delay={0.24}>
            <p className="text-[#475569] text-xl leading-relaxed mb-10">
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
                className="flex items-center gap-2 px-8 py-4 rounded-full btn-gradient text-[#0f172a] font-semibold shine"
              >
                Deploy Me <ArrowRight size={16} />
              </Link>
              <Link
                href="/#builds"
                className="flex items-center gap-2 px-8 py-4 rounded-full border border-[rgba(15,23,42,0.10)] text-[#475569] hover:text-[#0f172a] hover:border-[rgba(14,165,233,0.2)] transition-all"
              >
                See Builds
              </Link>
            </div>
          </Reveal>
        </div>

        {/* Toolkit */}
        <div className="mb-4">
          <Reveal>
            <h2 className="text-2xl font-black text-[#0f172a] mb-8">
              What I bring on deployment
            </h2>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {capabilities.map((c, i) => (
              <Reveal key={c.label} delay={i * 0.05}>
                <div className="p-5 rounded-2xl card-border flex flex-col gap-2 h-full">
                  <div className="text-2xl">{c.emoji}</div>
                  <div className="text-sm font-bold text-[#0f172a]">{c.label}</div>
                  <div className="text-xs text-[#64748b]">{c.sub}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* Moved here from the home page — philosophy lives on About only. */}
      <FDEDimensions />
      <Philosophy />
      <Footer />
    </>
  );
}
