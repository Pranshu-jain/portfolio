"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { siteConfig } from "@/lib/config";

function StatItem({
  value,
  label,
  index,
}: {
  value: string;
  label: string;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.55, ease: [0.25, 0.4, 0.25, 1] }}
      className="flex flex-col items-center gap-1.5 py-8 px-6 relative"
    >
      <span className="text-3xl sm:text-4xl font-black gradient-text leading-none">
        {value}
      </span>
      <span className="text-xs text-[#475569] text-center tracking-wide">
        {label}
      </span>
    </motion.div>
  );
}

export default function StatsBar() {
  return (
    <section className="border-y border-[rgba(255,255,255,0.04)] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(0,212,255,0.02)_0%,transparent_70%)]" />
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-[rgba(255,255,255,0.04)]">
          {siteConfig.stats.map((stat, i) => (
            <StatItem key={stat.label} {...stat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
