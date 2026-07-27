"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

/** Ease-out cubic — fast start, settled landing. Reads as a counter, not a spinner. */
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

/**
 * Counts from 0 to `value` the first time it scrolls into view. Numbers are
 * formatted with locale separators so 10000 reads as 10,000.
 */
export default function CountUp({
  value,
  prefix = "",
  suffix = "",
  duration = 1600,
  className,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });
  const reduced = useReducedMotion();
  const [display, setDisplay] = useState(0);

  // Under reduced motion the final value is derived rather than animated to,
  // so the effect never has to write state for that case.
  const shown = reduced ? value : display;

  useEffect(() => {
    if (!inView || reduced) return;

    let frame = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      setDisplay(Math.round(easeOut(progress) * value));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, value, duration, reduced]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {shown.toLocaleString("en-US")}
      {suffix}
    </span>
  );
}
