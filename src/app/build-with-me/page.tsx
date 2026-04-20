import type { Metadata } from "next";
import Footer from "@/components/Footer";
import { ArrowRight, CheckCircle2, Zap, Clock, Shield, Star } from "lucide-react";
import { siteConfig } from "@/lib/config";
import Link from "next/link";

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
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-semibold uppercase tracking-wider bg-[rgba(124,58,237,0.08)] text-[#7c3aed] border border-[rgba(124,58,237,0.12)] mb-6">
            For Founders & Startups
          </div>
          <h1 className="text-5xl sm:text-7xl font-black text-white mb-6 leading-tight">
            Let&apos;s build your
            <br />
            <span className="gradient-text">next big thing.</span>
          </h1>
          <p className="text-[#475569] text-xl leading-relaxed mb-8">
            I partner with founders to turn startup ideas into shipped, scalable products
            — using AI-augmented development to move 3× faster than traditional teams.
          </p>
          <a
            href={`mailto:${siteConfig.email}`}
            className="inline-flex items-center gap-2 px-10 py-4 rounded-full btn-gradient text-white font-semibold text-lg shine"
          >
            Start a Conversation <ArrowRight size={18} />
          </a>
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

        {/* Final CTA */}
        <div className="text-center pb-16">
          <p className="text-[#475569] text-lg mb-6">
            Not sure which option fits? Let&apos;s just talk.
          </p>
          <a
            href={siteConfig.calendly}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-[rgba(0,212,255,0.2)] text-[#00d4ff] hover:bg-[rgba(0,212,255,0.05)] transition-all font-semibold"
          >
            Book a Free 30-Min Call <ArrowRight size={16} />
          </a>
        </div>
      </div>
      <Footer />
    </>
  );
}
