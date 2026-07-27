"use client";

import type { ReactNode } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Seamless infinite strip. The children are rendered twice and the track is
 * translated by exactly -50%, so the loop point is invisible. Pauses on hover
 * and freezes entirely under reduced-motion.
 */
export default function Marquee({
  children,
  speed = 34,
  reverse = false,
  className,
}: {
  children: ReactNode;
  /** Seconds for one full pass. Higher is slower. */
  speed?: number;
  reverse?: boolean;
  className?: string;
}) {
  const reduced = useReducedMotion();

  return (
    <div
      className={`marquee group relative overflow-hidden ${className ?? ""}`}
      aria-hidden="true"
    >
      {/* Edge masks so items dissolve instead of clipping at the bounds. */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[#050505] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[#050505] to-transparent" />

      <div
        className="marquee-track flex w-max"
        style={{
          animationDuration: `${speed}s`,
          animationDirection: reverse ? "reverse" : "normal",
          animationPlayState: reduced ? "paused" : undefined,
        }}
      >
        <div className="flex shrink-0">{children}</div>
        <div className="flex shrink-0">{children}</div>
      </div>
    </div>
  );
}
