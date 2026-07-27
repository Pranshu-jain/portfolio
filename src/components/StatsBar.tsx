"use client";

import { proofMetrics } from "@/lib/fde";
import CountUp from "@/components/motion/CountUp";
import Reveal from "@/components/motion/Reveal";

/**
 * The dimension strip. On a drawing, dimensions are the measured facts
 * you can check against the built work — which is exactly the contract
 * these numbers are under (see the rule at the top of lib/fde.ts).
 */
export default function StatsBar() {
  return (
    <section className="border-y border-graphite">
      <div className="page">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {proofMetrics.map((metric, i) => (
            <Reveal key={metric.label} delay={i * 0.07} blur={false}>
              <div
                className={`py-7 pr-5 ${
                  i > 0 ? "md:border-l md:border-graphite md:pl-5" : ""
                } ${i % 2 === 1 ? "border-l border-graphite pl-5 md:pl-5" : ""}`}
              >
                {/* Dimension line: tick — measure — tick */}
                <div
                  className="flex items-center gap-1 mb-3 text-blue"
                  aria-hidden="true"
                >
                  <span className="w-px h-2 bg-current" />
                  <span className="flex-1 h-px bg-current opacity-40" />
                  <span className="w-px h-2 bg-current" />
                </div>

                <CountUp
                  value={metric.value}
                  prefix={metric.prefix}
                  suffix={metric.suffix}
                  className="display block text-[clamp(1.5rem,2.6vw,2.1rem)] leading-none tabular-nums"
                />
                <div className="text-[13px] text-graphite mt-2 leading-snug">
                  {metric.label}
                </div>
                <div className="mono !text-[9px] mt-1.5 !tracking-[0.1em] text-faint">
                  {metric.sub}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
