"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { doctrine } from "@/lib/fde";
import SectionHeading from "@/components/motion/SectionHeading";
import Reveal from "@/components/motion/Reveal";

/**
 * Operating doctrine. Six rules that decide what I do when the engagement gets
 * ambiguous — which, on a forward deployment, is most days.
 */
export default function Philosophy() {
  return (
    <section id="doctrine" className="py-28 relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 50% at 100% 0%, rgba(14,165,233,0.04) 0%, transparent 60%), radial-gradient(ellipse 40% 40% at 0% 100%, rgba(124,58,237,0.05) 0%, transparent 60%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6">
        <SectionHeading
          eyebrow="Operating Doctrine"
          accent="#10b981"
          title={
            <>
              The rules I fall back on{" "}
              <span className="gradient-text">when it gets fuzzy</span>
            </>
          }
          description="Nobody hires a forward deployed engineer for a well-specified problem. These are the defaults that decide what I do when the brief runs out."
          className="mb-14"
        />

        {/* Anchor quote */}
        <Reveal delay={0.1}>
          <div className="relative p-8 sm:p-12 rounded-3xl glass border border-[rgba(15,23,42,0.06)] mb-14 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,rgba(14,165,233,0.05)_0%,transparent_70%)] pointer-events-none" />
            <motion.div
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#0284c7]/40 to-transparent"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.1, ease: [0.25, 0.4, 0.25, 1] }}
            />

            <Quote size={34} className="text-[#0284c7] mb-6 opacity-40" aria-hidden="true" />
            <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0f172a] leading-tight mb-6">
              The customer&apos;s hardest problem is never the one written in
              the brief. It&apos;s the one everybody has quietly stopped
              mentioning because they assume it can&apos;t be fixed.
            </p>
            <p className="mono text-[11px] uppercase tracking-wider text-[#94a3b8]">
              — what forward deployment is actually for
            </p>
          </div>
        </Reveal>

        {/* Doctrine grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {doctrine.map((rule, i) => (
            <Reveal key={rule.n} delay={i * 0.07} className="h-full">
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 320, damping: 22 }}
                className="relative h-full p-7 rounded-2xl card-border overflow-hidden group"
              >
                {/* Number watermark */}
                <span className="absolute top-3 right-5 text-7xl font-black opacity-[0.03] text-[#0f172a] select-none group-hover:opacity-[0.07] transition-opacity duration-500">
                  {rule.n}
                </span>

                {/* Accent rule that extends on hover */}
                <motion.div
                  className="h-1 rounded-full mb-5"
                  style={{ background: rule.color }}
                  initial={{ width: 28 }}
                  whileHover={{ width: 52 }}
                  transition={{ duration: 0.3 }}
                />

                <h3 className="text-lg font-bold text-[#0f172a] mb-3 leading-snug relative">
                  {rule.title}
                </h3>
                <p className="text-[#475569] text-sm leading-relaxed relative">
                  {rule.desc}
                </p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
