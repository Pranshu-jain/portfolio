"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useSpring, useReducedMotion } from "framer-motion";
import { deploymentLoop, type LoopPhase } from "@/lib/fde";
import SectionHeading from "@/components/motion/SectionHeading";
import Reveal from "@/components/motion/Reveal";

function Phase({ phase, index }: { phase: LoopPhase; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, margin: "-45% 0px -45% 0px" });

  return (
    <div ref={ref} className="relative pl-12 sm:pl-16 pb-11 last:pb-0">
      {/* Station mark on the spine. Literal hex, not var() — framer-motion
          animates parsed colour values and can't interpolate a custom
          property. */}
      <motion.span
        className="absolute left-[15px] sm:left-[23px] top-1 -translate-x-1/2 block w-[11px] h-[11px] border"
        initial={false}
        animate={{
          backgroundColor: inView ? "#1D5BBF" : "#E4E7E4",
          borderColor: inView ? "#1D5BBF" : "#22262B",
        }}
        transition={{ duration: 0.35 }}
      />

      <Reveal>
        <div className="flex flex-wrap items-baseline gap-3 mb-2">
          <span className="font-mono text-[10px] tracking-[0.13em] uppercase text-blue font-semibold">
            {phase.window}
          </span>
          <span className="font-mono text-[9.5px] text-faint tabular-nums">
            {String(index + 1).padStart(2, "0")} /{" "}
            {String(deploymentLoop.length).padStart(2, "0")}
          </span>
        </div>

        <h3 className="display-sm text-xl mb-2.5">{phase.title}</h3>

        <p className="text-[13.5px] leading-relaxed text-soft max-w-[56ch] m-0 mb-4">
          {phase.description}
        </p>

        <div className="flex flex-wrap gap-1.5">
          {phase.artifacts.map((artifact) => (
            <span
              key={artifact}
              className="font-mono text-[10px] px-2.5 py-1.5 border text-soft"
              style={{ borderColor: "var(--line)" }}
            >
              {artifact}
            </span>
          ))}
        </div>
      </Reveal>
    </div>
  );
}

/**
 * The phase sequence. This one really is ordered — the windows compress
 * or stretch with the engagement, but the order never changes — so the
 * numbering and the measured spine both carry information.
 */
export default function DeploymentLoop() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

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
    <section id="loop" data-sheet="Phase sequence" className="sheet">
      <div className="page">
        <SectionHeading
          number="04"
          name="Phase sequence"
          field="Windows compress, order doesn't"
          title={
            <>
              Same loop every{" "}
              <span className="text-blue">engagement</span>.
            </>
          }
          description="Whether it's a two-week strike or a three-month embed, the sequence holds. Only the windows move."
          className="mb-10"
        />

        <div ref={containerRef} className="relative">
          <div
            className="absolute left-[15px] sm:left-[23px] top-2 bottom-2 w-px"
            style={{ background: "var(--line)" }}
            aria-hidden="true"
          />
          <motion.div
            aria-hidden="true"
            className="absolute left-[15px] sm:left-[23px] top-2 bottom-2 w-px origin-top bg-blue"
            style={{ scaleY: reduced ? 1 : fill }}
          />

          {deploymentLoop.map((phase, i) => (
            <Phase key={phase.id} phase={phase} index={i} />
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="mono !text-[9.5px] mt-2 ml-12 sm:ml-16">
            &#8634; Then it runs again, faster
          </div>
        </Reveal>
      </div>
    </section>
  );
}
