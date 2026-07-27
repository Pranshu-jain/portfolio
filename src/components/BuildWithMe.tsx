"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { engagements } from "@/lib/fde";
import SectionHeading from "@/components/motion/SectionHeading";
import Reveal from "@/components/motion/Reveal";
import Magnetic from "@/components/motion/Magnetic";

const openChat = () => window.dispatchEvent(new CustomEvent("open-chat"));

export default function BuildWithMe() {
  return (
    <section id="engagements" className="py-28 relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 0% 40%, rgba(0,212,255,0.04) 0%, transparent 60%), radial-gradient(ellipse 60% 60% at 100% 85%, rgba(124,58,237,0.06) 0%, transparent 60%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6">
        <SectionHeading
          eyebrow="Engagement Models"
          accent="#7c3aed"
          align="center"
          title={
            <>
              Three ways to{" "}
              <span className="gradient-text-warm">deploy me</span>
            </>
          }
          description="Same loop in all three — the difference is how much ambiguity you're handing over and how long I stay attached."
          className="mb-16"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-14">
          {engagements.map((engagement, i) => (
            <Reveal key={engagement.id} delay={i * 0.1} className="h-full">
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 320, damping: 22 }}
                className={`relative h-full p-7 rounded-2xl flex flex-col gap-5 overflow-hidden ${
                  engagement.highlight ? "gradient-border" : "card-border"
                }`}
              >
                {/* Ambient wash keyed to the model's colour */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-60"
                  style={{
                    background: `radial-gradient(ellipse at 50% 0%, ${engagement.color}0e 0%, transparent 65%)`,
                  }}
                />

                {engagement.highlight && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.35 }}
                    className="absolute -top-px left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-b-lg mono text-[9px] font-bold uppercase tracking-[2px] bg-[#7c3aed] text-white"
                  >
                    Most engagements
                  </motion.div>
                )}

                <div className="relative pt-2">
                  <div className="flex items-baseline justify-between gap-3 mb-2">
                    <span
                      className="mono text-[11px] font-bold uppercase tracking-widest"
                      style={{ color: engagement.color }}
                    >
                      {engagement.name}
                    </span>
                    <span className="mono text-[10px] text-[#334155]">
                      {engagement.duration}
                    </span>
                  </div>
                  <p className="text-white font-bold text-lg leading-snug mb-2">
                    {engagement.desc}
                  </p>
                  <p className="text-[#475569] text-xs">{engagement.best}</p>
                </div>

                <div className="relative h-px bg-[rgba(255,255,255,0.05)]" />

                <div className="relative flex flex-col gap-2.5 flex-1">
                  {engagement.features.map((feature, fi) => (
                    <motion.div
                      key={feature}
                      initial={{ opacity: 0, x: -6 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + fi * 0.05, duration: 0.35 }}
                      className="flex items-start gap-2.5"
                    >
                      <CheckCircle2
                        size={13}
                        className="mt-0.5 shrink-0"
                        style={{ color: engagement.color }}
                      />
                      <span className="text-[#64748b] text-xs leading-relaxed">
                        {feature}
                      </span>
                    </motion.div>
                  ))}
                </div>

                <button
                  onClick={openChat}
                  className={`relative flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all ${
                    engagement.highlight
                      ? "btn-gradient text-white shine"
                      : "border border-[rgba(255,255,255,0.08)] text-[#94a3b8] hover:text-white hover:border-[rgba(255,255,255,0.15)]"
                  }`}
                >
                  Scope this <ArrowRight size={14} />
                </button>
              </motion.div>
            </Reveal>
          ))}
        </div>

        {/* Closing CTA */}
        <Reveal delay={0.15}>
          <div className="relative rounded-3xl glass border border-[rgba(255,255,255,0.06)] p-8 sm:p-10 text-center overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(0,212,255,0.05),transparent_70%)] pointer-events-none" />
            <div className="relative">
              <h3 className="text-2xl sm:text-3xl font-black text-white mb-3">
                Not sure which one fits?
              </h3>
              <p className="text-[#64748b] mb-7 max-w-lg mx-auto">
                That&apos;s usually a sign the problem is still fuzzy — which is
                exactly the case forward deployment exists for. One call and
                we&apos;ll know.
              </p>
              <Magnetic className="inline-block">
                <button
                  onClick={openChat}
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full btn-gradient text-white font-semibold shine"
                >
                  Scope an Engagement <ArrowRight size={16} />
                </button>
              </Magnetic>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
