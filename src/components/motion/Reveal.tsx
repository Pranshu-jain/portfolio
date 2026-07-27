"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

const EASE = [0.25, 0.4, 0.25, 1] as [number, number, number, number];

type Direction = "up" | "down" | "left" | "right" | "none";

const OFFSET: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 28 },
  down: { x: 0, y: -28 },
  left: { x: 32, y: 0 },
  right: { x: -32, y: 0 },
  none: { x: 0, y: 0 },
};

/**
 * Scroll-triggered entrance used site-wide, so every section shares one motion
 * signature instead of each component inventing its own. Collapses to a plain
 * fade when the visitor asks for reduced motion.
 */
export default function Reveal({
  children,
  delay = 0,
  duration = 0.7,
  direction = "up",
  blur = true,
  className,
  once = true,
}: {
  children: ReactNode;
  delay?: number;
  duration?: number;
  direction?: Direction;
  blur?: boolean;
  className?: string;
  once?: boolean;
}) {
  const reduced = useReducedMotion();
  const { x, y } = reduced ? OFFSET.none : OFFSET[direction];

  return (
    <motion.div
      className={className}
      initial={{
        opacity: 0,
        x,
        y,
        filter: blur && !reduced ? "blur(10px)" : "blur(0px)",
      }}
      whileInView={{ opacity: 1, x: 0, y: 0, filter: "blur(0px)" }}
      viewport={{ once, margin: "-12%" }}
      transition={{
        duration: reduced ? 0.3 : duration,
        delay: reduced ? 0 : delay,
        ease: EASE,
      }}
    >
      {children}
    </motion.div>
  );
}
