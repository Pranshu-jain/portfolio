"use client";

import { useRef, useState, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";

/**
 * Perspective tilt plus a pointer-tracking sheen. The sheen is what sells it —
 * tilt alone reads as a gimmick, tilt with a moving highlight reads as a
 * physical surface catching light.
 */
export default function TiltCard({
  children,
  className,
  glare = "rgba(14,165,233,0.10)",
  max = 7,
}: {
  children: ReactNode;
  className?: string;
  glare?: string;
  max?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [hovered, setHovered] = useState(false);

  // Normalised pointer position within the card, -0.5 → 0.5 on both axes.
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const config = { stiffness: 180, damping: 20, mass: 0.5 };
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [max, -max]), config);
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-max, max]), config);

  // Sheen origin follows the pointer across the surface. Composed at the top
  // level so the hook order never depends on `reduced`.
  const glareX = useTransform(px, [-0.5, 0.5], ["0%", "100%"]);
  const glareY = useTransform(py, [-0.5, 0.5], ["0%", "100%"]);
  const glareBackground = useTransform(
    [glareX, glareY],
    ([gx, gy]: string[]) =>
      `radial-gradient(circle at ${gx} ${gy}, ${glare} 0%, transparent 55%)`,
  );

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width - 0.5);
    py.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const reset = () => {
    px.set(0);
    py.set(0);
    setHovered(false);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={reset}
      style={{
        rotateX: reduced ? 0 : rotateX,
        rotateY: reduced ? 0 : rotateY,
        transformStyle: "preserve-3d",
        transformPerspective: 900,
      }}
      className={`relative ${className ?? ""}`}
    >
      {children}
      {!reduced && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[inherit]"
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.35 }}
          style={{ background: glareBackground }}
        />
      )}
    </motion.div>
  );
}
