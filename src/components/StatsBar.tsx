"use client";

import { motion } from "framer-motion";
import { proofMetrics } from "@/lib/fde";
import CountUp from "@/components/motion/CountUp";
import Reveal from "@/components/motion/Reveal";

/**
 * The proof strip directly under the hero. Numbers count up on first view —
 * the point is that each claim on this page resolves to something countable.
 */
export default function StatsBar() {
  return (
    <section className="border-y border-[rgba(255,255,255,0.04)] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(0,212,255,0.025)_0%,transparent_70%)]" />

      {/* Sweep that crosses the strip once on entry */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-y-0 w-40 bg-gradient-to-r from-transparent via-[rgba(0,212,255,0.06)] to-transparent"
        initial={{ x: "-20%" }}
        whileInView={{ x: "120vw" }}
        viewport={{ once: true }}
        transition={{ duration: 1.6, ease: "easeInOut", delay: 0.2 }}
      />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-[rgba(255,255,255,0.04)]">
          {proofMetrics.map((metric, i) => (
            <Reveal key={metric.label} delay={i * 0.08} blur={false}>
              <div className="group flex flex-col items-center gap-1.5 py-9 px-5 text-center">
                <CountUp
                  value={metric.value}
                  prefix={metric.prefix}
                  suffix={metric.suffix}
                  className="text-3xl sm:text-4xl font-black gradient-text leading-none tabular-nums"
                />
                <span className="text-xs text-[#64748b] tracking-wide mt-1">
                  {metric.label}
                </span>
                <span className="mono text-[9px] text-[#334155] uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {metric.sub}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
