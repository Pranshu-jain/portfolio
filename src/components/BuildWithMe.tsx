"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Zap, Bot, Wrench, PlusCircle } from "lucide-react";

const services = [
  { icon: Zap,        title: "New Websites & Apps",      desc: "Full-stack MVP at startup speed",         color: "#00d4ff" },
  { icon: Bot,        title: "AI Integration",            desc: "LLMs, agents, automation built-in",       color: "#7c3aed" },
  { icon: Wrench,     title: "Existing Site Improvement", desc: "Redesign, speed, UX & conversions",       color: "#22c55e" },
  { icon: PlusCircle, title: "Feature Addition",          desc: "Ship new features to your live product",  color: "#ff6b35" },
];

export default function BuildWithMe() {
  return (
    <section className="py-28 relative overflow-hidden">
      {/* Ambient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 0% 50%, rgba(0,212,255,0.04) 0%, transparent 60%), radial-gradient(ellipse 60% 60% at 100% 80%, rgba(124,58,237,0.06) 0%, transparent 60%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: [0.25, 0.4, 0.25, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-semibold uppercase tracking-wider bg-[rgba(124,58,237,0.08)] text-[#7c3aed] border border-[rgba(124,58,237,0.12)] mb-6">
              For Startups & Founders
            </div>

            <h2 className="text-4xl sm:text-5xl font-black text-white mb-6 leading-tight">
              New build or existing site —
              <br />
              <span className="gradient-text-warm">I&apos;ve got you covered.</span>
            </h2>

            <p className="text-[#475569] text-lg leading-relaxed mb-8 max-w-lg">
              Whether you&apos;re starting from scratch or need to improve what you already have — I build new products, redesign and optimize existing sites, add features, and integrate AI.{" "}
              <span className="text-white font-medium">3× faster</span> than traditional development.
            </p>

            <div className="flex flex-col gap-3 mb-10">
              {[
                "New websites & apps shipped in 1–2 weeks",
                "Existing site audits, redesigns & speed fixes",
                "Feature additions & AI integrations",
                "Ongoing maintenance & support",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle2
                    size={17}
                    className="text-[#00d4ff] shrink-0 mt-0.5"
                  />
                  <span className="text-[#64748b] text-[15px]">{item}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => window.dispatchEvent(new CustomEvent("open-chat"))}
                className="flex items-center gap-2 px-8 py-4 rounded-full btn-gradient text-white font-semibold shine"
              >
                Start a Conversation <ArrowRight size={16} />
              </button>
              <button
                onClick={() => window.dispatchEvent(new CustomEvent("open-chat"))}
                className="flex items-center gap-2 px-8 py-4 rounded-full border border-[rgba(255,255,255,0.08)] text-[#94a3b8] hover:text-white hover:border-[rgba(0,212,255,0.2)] transition-all duration-300"
              >
                Let&apos;s Talk
              </button>
            </div>
          </motion.div>

          {/* Right: service cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.15, ease: [0.25, 0.4, 0.25, 1] }}
            className="grid grid-cols-2 gap-4"
          >
            {services.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 + 0.3 }}
                whileHover={{ scale: 1.03, y: -2 }}
                className="p-6 rounded-2xl gradient-border relative overflow-hidden group"
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                  style={{
                    background: `radial-gradient(ellipse at 50% 0%, ${s.color}08 0%, transparent 70%)`,
                  }}
                />
                <s.icon
                  size={22}
                  className="mb-3 relative"
                  style={{ color: s.color }}
                />
                <h3 className="font-bold text-white text-sm mb-1.5 relative">
                  {s.title}
                </h3>
                <p className="text-[#475569] text-xs leading-relaxed relative">
                  {s.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
