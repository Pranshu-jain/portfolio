"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence, useInView, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";
import { dimensions } from "@/lib/fde";
import SectionHeading from "@/components/motion/SectionHeading";
import Reveal from "@/components/motion/Reveal";

const SIZE = 400;
const CENTER = SIZE / 2;
const RADIUS = 118;
const LABEL_RADIUS = 158;
const RINGS = [0.25, 0.5, 0.75, 1];
const EASE = [0.25, 0.4, 0.25, 1] as [number, number, number, number];

/** Axis i sits at -90° + i·(360/n), so dimension one points straight up. */
function angleFor(i: number, total: number) {
  return (-90 + (360 / total) * i) * (Math.PI / 180);
}

function pointAt(i: number, total: number, r: number) {
  const a = angleFor(i, total);
  return { x: CENTER + Math.cos(a) * r, y: CENTER + Math.sin(a) * r };
}

function polygonPoints(radii: number[]) {
  return radii
    .map((r, i) => {
      const { x, y } = pointAt(i, radii.length, r);
      return `${x.toFixed(2)},${y.toFixed(2)}`;
    })
    .join(" ");
}

function Radar({
  activeIndex,
  onSelect,
}: {
  activeIndex: number;
  onSelect: (i: number) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });
  const reduced = useReducedMotion();
  const total = dimensions.length;

  const dataPoints = polygonPoints(
    dimensions.map((d) => (d.score / 100) * RADIUS),
  );
  const active = dimensions[activeIndex];

  return (
    <div ref={ref} className="relative w-full max-w-[460px] mx-auto px-14 py-12">
      <div className="relative w-full aspect-square">
        <svg
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          className="absolute inset-0 w-full h-full overflow-visible"
          role="img"
          aria-label={`Capability radar across ${total} forward-deployed engineering dimensions`}
        >
          <defs>
            <radialGradient id="radar-fill" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#00d4ff" stopOpacity="0.30" />
              <stop offset="60%" stopColor="#7c3aed" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.06" />
            </radialGradient>
            <linearGradient id="sweep-fade" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#00d4ff" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#00d4ff" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Concentric reference rings */}
          {RINGS.map((ratio, i) => (
            <motion.polygon
              key={ratio}
              points={polygonPoints(Array(total).fill(RADIUS * ratio))}
              fill="none"
              stroke="rgba(255,255,255,0.07)"
              strokeWidth="1"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{
                delay: reduced ? 0 : 0.1 + i * 0.08,
                duration: 0.6,
                ease: EASE,
              }}
              style={{ transformOrigin: `${CENTER}px ${CENTER}px` }}
            />
          ))}

          {/* Spokes */}
          {dimensions.map((d, i) => {
            const { x, y } = pointAt(i, total, RADIUS);
            return (
              <motion.line
                key={d.id}
                x1={CENTER}
                y1={CENTER}
                x2={x}
                y2={y}
                stroke={i === activeIndex ? `${d.color}66` : "rgba(255,255,255,0.06)"}
                strokeWidth={i === activeIndex ? 1.5 : 1}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={inView ? { pathLength: 1, opacity: 1 } : {}}
                transition={{
                  delay: reduced ? 0 : 0.35 + i * 0.05,
                  duration: 0.5,
                  ease: EASE,
                }}
              />
            );
          })}

          {/* Rotating sweep — the "this is live" tell */}
          <g className="radar-sweep" style={{ transformOrigin: `${CENTER}px ${CENTER}px` }}>
            <path
              d={`M ${CENTER} ${CENTER} L ${CENTER + RADIUS} ${CENTER} A ${RADIUS} ${RADIUS} 0 0 0 ${
                CENTER + RADIUS * Math.cos(-Math.PI / 4)
              } ${CENTER + RADIUS * Math.sin(-Math.PI / 4)} Z`}
              fill="url(#sweep-fade)"
            />
          </g>

          {/* Capability shape, expanding out of the centre */}
          <motion.g
            initial={{ scale: 0, opacity: 0 }}
            animate={inView ? { scale: 1, opacity: 1 } : {}}
            transition={{
              delay: reduced ? 0 : 0.65,
              duration: 1.1,
              ease: [0.16, 1, 0.3, 1],
            }}
            style={{ transformOrigin: `${CENTER}px ${CENTER}px` }}
          >
            <polygon
              points={dataPoints}
              fill="url(#radar-fill)"
              stroke="#00d4ff"
              strokeWidth="1.75"
              strokeLinejoin="round"
            />
          </motion.g>

          {/* Vertices — also the hit targets */}
          {dimensions.map((d, i) => {
            const { x, y } = pointAt(i, total, (d.score / 100) * RADIUS);
            const isActive = i === activeIndex;
            return (
              <g key={d.id}>
                {isActive && (
                  <motion.circle
                    cx={x}
                    cy={y}
                    r={11}
                    fill={d.color}
                    initial={{ opacity: 0, scale: 0.4 }}
                    animate={{ opacity: 0.18, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
                <motion.circle
                  cx={x}
                  cy={y}
                  r={isActive ? 5.5 : 3.5}
                  fill={isActive ? d.color : "#050505"}
                  stroke={d.color}
                  strokeWidth="2"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{
                    delay: reduced ? 0 : 1.1 + i * 0.06,
                    type: "spring",
                    stiffness: 380,
                    damping: 16,
                  }}
                />
                {/* Generous invisible target so precision isn't required */}
                <circle
                  cx={x}
                  cy={y}
                  r={20}
                  fill="transparent"
                  className="cursor-pointer"
                  onMouseEnter={() => onSelect(i)}
                  onClick={() => onSelect(i)}
                />
              </g>
            );
          })}
        </svg>

        {/* Axis labels, positioned with the same polar maths as the SVG */}
        {dimensions.map((d, i) => {
          const { x, y } = pointAt(i, total, LABEL_RADIUS);
          const isActive = i === activeIndex;
          return (
            <motion.button
              key={d.id}
              type="button"
              onMouseEnter={() => onSelect(i)}
              onFocus={() => onSelect(i)}
              onClick={() => onSelect(i)}
              aria-pressed={isActive}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: reduced ? 0 : 1.2 + i * 0.06, duration: 0.4 }}
              className="absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap mono text-[10px] uppercase tracking-wider transition-colors duration-200 rounded px-1"
              style={{
                left: `${(x / SIZE) * 100}%`,
                top: `${(y / SIZE) * 100}%`,
                color: isActive ? d.color : "#475569",
              }}
            >
              {d.axis}
              <span
                className="block text-[9px] tabular-nums transition-opacity duration-200"
                style={{ opacity: isActive ? 1 : 0.45 }}
              >
                {d.score}
              </span>
            </motion.button>
          );
        })}

        {/* Centre readout */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: reduced ? 0 : 1.5, duration: 0.5 }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <div className="text-center">
            <div
              className="text-3xl font-black tabular-nums leading-none transition-colors duration-300"
              style={{ color: active.color }}
            >
              {active.score}
            </div>
            <div className="mono text-[8px] uppercase tracking-[2px] text-[#334155] mt-1">
              depth
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function FDEDimensions() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = dimensions[activeIndex];

  return (
    <section id="dimensions" className="py-28 relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 55% 50% at 20% 40%, rgba(0,212,255,0.04) 0%, transparent 65%), radial-gradient(ellipse 45% 45% at 85% 70%, rgba(124,58,237,0.05) 0%, transparent 60%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6">
        <SectionHeading
          eyebrow="The Eight Dimensions"
          accent="#00d4ff"
          title={
            <>
              The role is graded on{" "}
              <span className="gradient-text">eight axes</span>, not one.
            </>
          }
          description="A product engineer can be excellent on three of these. Forward deployment fails on any one you're missing — because the customer's problem doesn't respect your job description. Here's where I sit on each, with the evidence."
          className="mb-14"
        />

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <Reveal direction="right">
            <Radar activeIndex={activeIndex} onSelect={setActiveIndex} />
          </Reveal>

          {/* Detail panel */}
          <Reveal direction="left" delay={0.1}>
            <div className="relative rounded-3xl glass border border-[rgba(255,255,255,0.06)] p-7 sm:p-9 min-h-[400px] flex flex-col overflow-hidden">
              <motion.div
                className="absolute inset-x-0 top-0 h-px"
                animate={{
                  background: `linear-gradient(90deg, transparent, ${active.color}, transparent)`,
                }}
                transition={{ duration: 0.5 }}
              />

              <AnimatePresence mode="wait">
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -10, filter: "blur(6px)" }}
                  transition={{ duration: 0.32, ease: EASE }}
                  className="flex flex-col h-full"
                >
                  <div className="flex items-baseline gap-3 mb-1">
                    <span
                      className="mono text-[10px] font-bold tracking-widest"
                      style={{ color: active.color }}
                    >
                      {String(activeIndex + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-2xl font-black text-white">
                      {active.label}
                    </h3>
                  </div>
                  <p className="mono text-[10px] uppercase tracking-wider text-[#475569] mb-6">
                    {active.short}
                  </p>

                  {/* Depth meter */}
                  <div className="flex items-center gap-3 mb-7">
                    <div className="flex-1 h-1.5 rounded-full bg-[rgba(255,255,255,0.05)] overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${active.score}%` }}
                        transition={{ duration: 0.8, ease: EASE }}
                        style={{
                          background: `linear-gradient(90deg, ${active.color}66, ${active.color})`,
                        }}
                      />
                    </div>
                    <span
                      className="mono text-xs tabular-nums font-bold"
                      style={{ color: active.color }}
                    >
                      {active.score}
                    </span>
                  </div>

                  <p className="text-[#94a3b8] text-[15px] leading-relaxed mb-7">
                    {active.detail}
                  </p>

                  <div className="mt-auto flex flex-col gap-3">
                    <div className="mono text-[10px] uppercase tracking-widest text-[#334155]">
                      Evidence
                    </div>
                    {active.evidence.map((item, i) => (
                      <motion.div
                        key={item}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.12 + i * 0.07, duration: 0.35 }}
                        className="flex items-start gap-2.5"
                      >
                        <Check
                          size={13}
                          className="shrink-0 mt-[3px]"
                          style={{ color: active.color }}
                        />
                        <span className="text-[13px] text-[#64748b] leading-relaxed">
                          {item}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </Reveal>
        </div>

        {/* Selector chips — the accessible, touch-friendly path into the radar */}
        <Reveal delay={0.15}>
          <div className="mt-10 flex flex-wrap justify-center gap-2">
            {dimensions.map((d, i) => {
              const isActive = i === activeIndex;
              return (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => setActiveIndex(i)}
                  aria-pressed={isActive}
                  className="px-3.5 py-2 rounded-full text-[11px] font-semibold transition-all duration-200 border"
                  style={{
                    background: isActive ? `${d.color}18` : "rgba(255,255,255,0.02)",
                    borderColor: isActive ? `${d.color}44` : "rgba(255,255,255,0.05)",
                    color: isActive ? d.color : "#475569",
                  }}
                >
                  {d.label}
                </button>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
