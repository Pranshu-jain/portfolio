"use client";

import { useRef } from "react";
import {
  motion,
  useInView,
  useScroll,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { deploymentLoop, type LoopPhase } from "@/lib/fde";
import SectionHeading from "@/components/motion/SectionHeading";
import Reveal from "@/components/motion/Reveal";

const EASE = [0.25, 0.4, 0.25, 1] as [number, number, number, number];

function PhaseRow({ phase, index }: { phase: LoopPhase; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  // Fires slightly before centre so the node lights up as the text arrives.
  const inView = useInView(ref, { once: false, margin: "-45% 0px -45% 0px" });

  return (
    <div ref={ref} className="relative pl-16 sm:pl-24 pb-16 last:pb-0">
      {/* Node on the spine */}
      <div className="absolute left-[22px] sm:left-[38px] top-1 -translate-x-1/2">
        <motion.span
          className="absolute inset-0 rounded-full"
          animate={{
            boxShadow: inView
              ? `0 0 0 6px ${phase.color}14, 0 0 22px ${phase.color}66`
              : `0 0 0 0px ${phase.color}00, 0 0 0px ${phase.color}00`,
          }}
          transition={{ duration: 0.5 }}
        />
        <motion.span
          className="relative block w-3.5 h-3.5 rounded-full border-2"
          animate={{
            background: inView ? phase.color : "#050505",
            borderColor: inView ? phase.color : "#1e293b",
            scale: inView ? 1.15 : 1,
          }}
          transition={{ duration: 0.4, ease: EASE }}
        />
      </div>

      <Reveal delay={0.05} direction="up">
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span
            className="mono text-[10px] font-bold uppercase tracking-[2px] px-2.5 py-1 rounded-md transition-colors duration-500"
            style={{
              color: phase.color,
              background: `${phase.color}12`,
              border: `1px solid ${phase.color}26`,
            }}
          >
            {phase.window}
          </span>
          <span className="mono text-[10px] text-[#293548] tabular-nums">
            {String(index + 1).padStart(2, "0")} / {String(deploymentLoop.length).padStart(2, "0")}
          </span>
        </div>

        <h3 className="text-2xl sm:text-3xl font-black text-white mb-3 tracking-tight">
          {phase.title}
        </h3>

        <p className="text-[#64748b] leading-relaxed max-w-2xl mb-5">
          {phase.description}
        </p>

        {/* What physically exists when the phase ends */}
        <div className="flex flex-wrap gap-2">
          {phase.artifacts.map((artifact, i) => (
            <motion.span
              key={artifact}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.4 }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] text-[#64748b] bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)]"
            >
              <span
                className="w-1 h-1 rounded-full shrink-0"
                style={{ background: phase.color }}
              />
              {artifact}
            </motion.span>
          ))}
        </div>
      </Reveal>
    </div>
  );
}

export default function DeploymentLoop() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  // Spine fills in step with the reader's position through the phases.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 65%", "end 65%"],
  });
  const fill = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    restDelta: 0.001,
  });

  return (
    <section id="loop" className="py-28 relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 45% 55% at 0% 30%, rgba(0,212,255,0.04) 0%, transparent 60%), radial-gradient(ellipse 45% 45% at 100% 75%, rgba(99,102,241,0.05) 0%, transparent 60%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6">
        <SectionHeading
          eyebrow="The Deployment Loop"
          accent="#7c3aed"
          title={
            <>
              How an engagement{" "}
              <span className="gradient-text-purple">actually runs</span>
            </>
          }
          description="Same loop every time, whether it's a two-week strike or a three-month embed. The windows compress or stretch; the order never changes."
          className="mb-16"
        />

        <div ref={containerRef} className="relative">
          {/* Spine track */}
          <div
            className="absolute left-[22px] sm:left-[38px] top-2 bottom-2 w-px bg-[rgba(255,255,255,0.06)]"
            aria-hidden="true"
          />

          {/* Scroll-linked fill */}
          <motion.div
            aria-hidden="true"
            className="absolute left-[22px] sm:left-[38px] top-2 bottom-2 w-px origin-top"
            style={{
              scaleY: reduced ? 1 : fill,
              background:
                "linear-gradient(180deg, #00d4ff 0%, #7c3aed 45%, #ff6b35 75%, #6366f1 100%)",
            }}
          />

          {/* Travelling signal pulse */}
          {!reduced && (
            <div
              aria-hidden="true"
              className="absolute left-[22px] sm:left-[38px] top-2 bottom-2 w-px overflow-hidden"
            >
              <div className="spine-signal h-16 w-px bg-gradient-to-b from-transparent via-white/70 to-transparent" />
            </div>
          )}

          {deploymentLoop.map((phase, i) => (
            <PhaseRow key={phase.id} phase={phase} index={i} />
          ))}
        </div>

        {/* Loop-back note — the "loop" in deployment loop */}
        <Reveal delay={0.1}>
          <div className="mt-4 ml-16 sm:ml-24 flex items-center gap-3 text-[#334155]">
            <div className="h-px flex-1 max-w-[80px] bg-gradient-to-r from-[rgba(99,102,241,0.4)] to-transparent" />
            <span className="mono text-[10px] uppercase tracking-[2px]">
              ↺ then it runs again, faster
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
