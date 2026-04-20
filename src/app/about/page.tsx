import type { Metadata } from "next";
import Philosophy from "@/components/Philosophy";
import Footer from "@/components/Footer";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About — Pranshu",
  description: "AI-first developer, rapid execution engineer, and startup growth partner. Learn how I think and build.",
};

export default function AboutPage() {
  return (
    <>
      <div className="pt-28 max-w-7xl mx-auto px-6">
        {/* Hero */}
        <div className="max-w-3xl mb-24">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-semibold uppercase tracking-wider bg-[rgba(0,212,255,0.08)] text-[#00d4ff] border border-[rgba(0,212,255,0.1)] mb-6">
            About Me
          </div>
          <h1 className="text-5xl sm:text-7xl font-black text-white mb-8 leading-tight">
            I&apos;m Pranshu.
            <br />
            <span className="gradient-text">I build fast.</span>
          </h1>
          <p className="text-[#475569] text-xl leading-relaxed mb-6">
            I&apos;m an AI-first developer who specializes in turning startup ideas into
            shipped products at a speed traditional development can&apos;t match. I use AI as
            a multiplier at every layer of the stack — from architecture to implementation
            to deployment.
          </p>
          <p className="text-[#475569] text-xl leading-relaxed mb-10">
            I&apos;m not just a coder. I&apos;m a problem solver, a systems thinker, and an
            execution machine. When I take on a project, I own it end-to-end until it ships.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/build-with-me"
              className="flex items-center gap-2 px-8 py-4 rounded-full btn-gradient text-white font-semibold shine"
            >
              Build With Me <ArrowRight size={16} />
            </Link>
            <Link
              href="/#projects"
              className="flex items-center gap-2 px-8 py-4 rounded-full border border-[rgba(255,255,255,0.08)] text-[#94a3b8] hover:text-white hover:border-[rgba(0,212,255,0.2)] transition-all"
            >
              See My Work
            </Link>
          </div>
        </div>

        {/* Skills bento */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-24">
          {[
            { emoji: "⚡", label: "Next.js / React",   sub: "Frontend & SSR" },
            { emoji: "🐍", label: "Python / Django",   sub: "Backend & APIs" },
            { emoji: "🗄️", label: "PostgreSQL / Redis", sub: "Databases" },
            { emoji: "☁️", label: "Docker / Railway",   sub: "DevOps & Deploy" },
            { emoji: "🤖", label: "LangChain / OpenAI", sub: "AI & Agents" },
            { emoji: "📡", label: "REST / GraphQL",     sub: "API Design" },
            { emoji: "🔧", label: "Celery / Queues",    sub: "Async Systems" },
            { emoji: "📊", label: "Tailwind / Framer",  sub: "UI & Motion" },
          ].map((s) => (
            <div
              key={s.label}
              className="p-5 rounded-2xl card-border flex flex-col gap-2"
            >
              <div className="text-2xl">{s.emoji}</div>
              <div className="text-sm font-bold text-white">{s.label}</div>
              <div className="text-xs text-[#475569]">{s.sub}</div>
            </div>
          ))}
        </div>
      </div>

      <Philosophy />
      <Footer />
    </>
  );
}
