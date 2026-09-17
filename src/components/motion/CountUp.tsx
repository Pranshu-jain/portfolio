"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

/** Ease-out cubic — fast start, settled landing. Reads as a counter, not a spinner. */
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

/**
 * Renders the final `value` in the server HTML — crawlers, link previews and
 * no-JS visitors must never see a zero. With JS, it counts up from 0 the first
 * time it scrolls into view, as a progressive enhancement. Numbers are
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
  // Same margin as <Reveal>, so the reset to 0 happens while the wrapping
  // fade-in is still at opacity 0 — the real value never visibly flashes.
  const inView = useInView(ref, { once: true, margin: "-12%" });
  const reduced = useReducedMotion();
  // null = "not animating": show the real value. Only the running animation
  // ever overrides it, so SSR, pre-hydration and reduced motion all get the
  // final number without the effect writing state for those cases.
  const [display, setDisplay] = useState<number | null>(null);
  const shown = reduced || display === null ? value : display;

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
