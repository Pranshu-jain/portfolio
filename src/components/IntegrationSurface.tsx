"use client";

import { motion } from "framer-motion";
import { integrationSurface } from "@/lib/fde";
import SectionHeading from "@/components/motion/SectionHeading";
import Reveal from "@/components/motion/Reveal";
import TiltCard from "@/components/motion/TiltCard";
import Marquee from "@/components/motion/Marquee";

/** Flattened token list for the marquee strip. */
const stack = integrationSurface.flatMap((group) =>
  group.items.map((item) => ({ item, color: group.color })),
);

export default function IntegrationSurface() {
  return (
    <section id="surface" className="py-28 relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 50%, rgba(0,212,255,0.025) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 mb-14">
        <SectionHeading
          eyebrow="Integration Surface"
          accent="#ff6b35"
          align="center"
          title={
            <>
              I land in{" "}
              <span className="gradient-text-warm">stacks I didn&apos;t choose</span>
            </>
          }
          description="Forward deployment means writing code in someone else's repo, against someone else's API, under someone else's conventions. These are the surfaces I plug into — and the rule I hold each one to."
        />
      </div>

      {/* Stack strip — two rows drifting in opposite directions */}
      <Reveal blur={false} className="mb-16">
        <div className="flex flex-col gap-3">
          <Marquee speed={42}>
            {stack.map(({ item, color }, i) => (
              <span
                key={`a-${item}-${i}`}
                className="mono mx-1.5 px-4 py-2 rounded-full text-[11px] whitespace-nowrap border"
                style={{
                  color: `${color}dd`,
                  borderColor: `${color}22`,
                  background: `${color}08`,
                }}
              >
                {item}
              </span>
            ))}
          </Marquee>
          <Marquee speed={52} reverse>
            {[...stack].reverse().map(({ item, color }, i) => (
              <span
                key={`b-${item}-${i}`}
                className="mono mx-1.5 px-4 py-2 rounded-full text-[11px] whitespace-nowrap border"
                style={{
                  color: `${color}99`,
                  borderColor: `${color}18`,
                  background: `${color}05`,
                }}
              >
                {item}
              </span>
            ))}
          </Marquee>
        </div>
      </Reveal>

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {integrationSurface.map((group, i) => (
            <Reveal key={group.category} delay={i * 0.07}>
              <TiltCard
                className="h-full rounded-2xl"
                glare={`${group.color}14`}
                max={6}
              >
                <div className="h-full p-6 rounded-2xl card-border flex flex-col group">
                  <div className="flex items-center gap-2.5 mb-4">
                    <motion.span
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ background: group.color }}
                      animate={{ opacity: [1, 0.35, 1] }}
                      transition={{
                        duration: 2.4,
                        repeat: Infinity,
                        delay: i * 0.3,
                        ease: "easeInOut",
                      }}
                    />
                    <h3 className="font-bold text-white text-sm">
                      {group.category}
                    </h3>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="mono px-2 py-1 rounded-md text-[10px] text-[#64748b] bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.04)] transition-colors duration-300"
                      >
                        {item}
                      </span>
                    ))}
                  </div>

                  <div className="mt-auto pt-4 border-t border-[rgba(255,255,255,0.04)]">
                    <p className="text-[12px] text-[#475569] leading-relaxed">
                      {group.note}
                    </p>
                  </div>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
