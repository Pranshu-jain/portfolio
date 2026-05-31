import type { Metadata } from "next";
import Footer from "@/components/Footer";
import ChatTrigger from "@/components/ChatTrigger";
import { siteConfig } from "@/lib/config";
import { ArrowRight, CheckCircle2, Zap, Clock, Shield, Star, Wrench, PlusCircle, RefreshCw } from "lucide-react";

export const metadata: Metadata = {
  title: "Build With Me — Pranshu",
  description: "Have a startup idea? I can build and scale it fast using AI. MVP in days, AI integrations, automation systems.",
};

const packages = [
  {
    name: "MVP Sprint",
    price: "Let's Talk",
    desc: "Full-stack MVP shipped in 1–2 weeks",
    features: [
      "Complete full-stack application",
      "Authentication + database",
      "Responsive UI/UX",
      "Deployed and production-ready",
      "1 week of post-launch support",
    ],
    color: "#00d4ff",
    highlight: false,
  },
  {
    name: "AI Product",
    price: "Let's Talk",
    desc: "AI-first product with agents and automation",
    features: [
      "Everything in MVP Sprint",
      "LLM integration (GPT-4 / Claude)",
      "Custom AI agents + workflows",
      "Automation pipelines",
      "2 weeks of post-launch support",
    ],
    color: "#7c3aed",
    highlight: true,
  },
  {
    name: "Scale Partner",
    price: "Let's Talk",
    desc: "Long-term startup tech partner",
    features: [
      "Ongoing development retainer",
      "Architecture reviews",
      "Performance optimization",
      "New feature development",
      "Priority response time",
    ],
    color: "#ff6b35",
    highlight: false,
  },
];

export default function BuildWithMePage() {
  return (
    <>
      <div className="pt-28 max-w-7xl mx-auto px-6">
        {/* Hero */}
        <div className="text-center max-w-3xl mx-auto mb-24">
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-semibold uppercase tracking-wider bg-[rgba(124,58,237,0.08)] text-[#7c3aed] border border-[rgba(124,58,237,0.12)]">
              New Websites & Apps
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-semibold uppercase tracking-wider bg-[rgba(0,212,255,0.08)] text-[#00d4ff] border border-[rgba(0,212,255,0.12)]">
              Existing Site Improvement
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-semibold uppercase tracking-wider bg-[rgba(255,107,53,0.08)] text-[#ff6b35] border border-[rgba(255,107,53,0.12)]">
              Feature Addition & AI
            </div>
          </div>
          <h1 className="text-5xl sm:text-7xl font-black text-white mb-6 leading-tight">
            Whatever you need —
            <br />
            <span className="gradient-text">I&apos;ll build it fast.</span>
          </h1>
          <p className="text-[#475569] text-xl leading-relaxed mb-8">
            New website, existing site that needs improvement, features to add, or AI to integrate —
            I work 3× faster using AI-augmented development without sacrificing quality.
          </p>
          <ChatTrigger className="inline-flex items-center gap-2 px-10 py-4 rounded-full btn-gradient text-white font-semibold text-lg shine">
            Start a Conversation <ArrowRight size={18} />
          </ChatTrigger>
        </div>

        {/* Why me */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-24">
          {[
            { icon: Zap,     title: "AI-Augmented Speed",  desc: "I ship in days what takes teams weeks" },
            { icon: Shield,  title: "Production Quality",  desc: "No shortcuts — scalable, tested code" },
            { icon: Clock,   title: "Fast Iteration",      desc: "Daily updates, weekly demos" },
            { icon: Star,    title: "Full Ownership",      desc: "I own it end-to-end until it ships" },
          ].map((item) => (
            <div key={item.title} className="p-6 rounded-2xl card-border">
              <item.icon size={22} className="text-[#00d4ff] mb-4" />
              <h3 className="font-bold text-white text-sm mb-2">{item.title}</h3>
              <p className="text-[#475569] text-xs leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Packages */}
        <div className="mb-24">
          <h2 className="text-3xl sm:text-4xl font-black text-white text-center mb-12">
            How we can <span className="gradient-text">work together</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {packages.map((pkg) => (
              <div
                key={pkg.name}
                className={`relative p-7 rounded-2xl flex flex-col gap-5 ${
                  pkg.highlight
                    ? "gradient-border"
                    : "card-border"
                }`}
              >
                {pkg.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-[11px] font-bold bg-[#7c3aed] text-white uppercase tracking-wider">
                    Most Popular
                  </div>
                )}
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-widest mb-2"
                    style={{ color: pkg.color }}>
                    {pkg.name}
                  </div>
                  <div className="text-3xl font-black text-white mb-1">{pkg.price}</div>
                  <div className="text-[#475569] text-sm">{pkg.desc}</div>
                </div>
                <div className="flex flex-col gap-2.5 flex-1">
                  {pkg.features.map((f) => (
                    <div key={f} className="flex items-start gap-2.5">
                      <CheckCircle2 size={14} className="mt-0.5 shrink-0" style={{ color: pkg.color }} />
                      <span className="text-[#64748b] text-xs">{f}</span>
                    </div>
                  ))}
                </div>
                <a
                  href={`mailto:${siteConfig.email}?subject=${encodeURIComponent(`${pkg.name} — Let's Build`)}`}
                  className={`flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all ${
                    pkg.highlight
                      ? "btn-gradient text-white shine"
                      : "border border-[rgba(255,255,255,0.08)] text-[#94a3b8] hover:text-white hover:border-[rgba(255,255,255,0.15)]"
                  }`}
                >
                  Get Started <ArrowRight size={14} />
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Website services section */}
        <div className="mb-24">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-3">
              Already have a website? <span className="gradient-text">I can help.</span>
            </h2>
            <p className="text-[#475569] text-lg max-w-xl mx-auto">
              You don&apos;t need to build from scratch to work with me. I improve, fix, and extend what you already have.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                icon: Wrench,
                title: "Site Audit & Revamp",
                color: "#22c55e",
                desc: "Full audit of your existing website — performance, SEO, UX, and conversion issues — followed by targeted improvements.",
                points: ["Performance & Core Web Vitals", "UX & design refresh", "SEO improvements", "Conversion optimization"],
              },
              {
                icon: PlusCircle,
                title: "Feature Addition",
                color: "#00d4ff",
                desc: "Need a new feature on your existing product? I analyze your codebase and ship the feature fast.",
                points: ["Codebase analysis first", "Clean integration", "No breaking changes", "Tested and deployed"],
              },
              {
                icon: RefreshCw,
                title: "Maintenance & Support",
                color: "#ff6b35",
                desc: "Ongoing technical partner for your live site. Bug fixes, updates, monitoring, and rapid response.",
                points: ["Bug fixes & patches", "Dependency updates", "Performance monitoring", "Priority response time"],
              },
            ].map((item) => (
              <div key={item.title} className="p-7 rounded-2xl card-border flex flex-col gap-4">
                <item.icon size={22} style={{ color: item.color }} />
                <div>
                  <h3 className="font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-[#475569] text-sm leading-relaxed">{item.desc}</p>
                </div>
                <div className="flex flex-col gap-2 flex-1">
                  {item.points.map((p) => (
                    <div key={p} className="flex items-start gap-2">
                      <CheckCircle2 size={13} className="mt-0.5 shrink-0" style={{ color: item.color }} />
                      <span className="text-[#64748b] text-xs">{p}</span>
                    </div>
                  ))}
                </div>
                <ChatTrigger className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold border border-[rgba(255,255,255,0.08)] text-[#94a3b8] hover:text-white hover:border-[rgba(255,255,255,0.15)] transition-all w-full">
                  Discuss This <ArrowRight size={13} />
                </ChatTrigger>
              </div>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center pb-16">
          <p className="text-[#475569] text-lg mb-6">
            Not sure which option fits? Let&apos;s just talk.
          </p>
          <ChatTrigger className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-[rgba(0,212,255,0.2)] text-[#00d4ff] hover:bg-[rgba(0,212,255,0.05)] transition-all font-semibold">
            Start a Conversation <ArrowRight size={16} />
          </ChatTrigger>
        </div>
      </div>
      <Footer />
    </>
  );
}
