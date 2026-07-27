"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/\\<>[]{}#$%&*+=_-";

/**
 * Decrypt-style reveal: each character resolves left to right while the
 * unresolved tail keeps cycling glyphs. Used for the hero role line — it reads
 * as a terminal resolving a value, which is the note the whole page plays in.
 */
export default function ScrambleText({
  text,
  className,
  delay = 0,
  speed = 34,
}: {
  text: string;
  className?: string;
  delay?: number;
  speed?: number;
}) {
  const reduced = useReducedMotion();
  const [output, setOutput] = useState("");
  const frameRef = useRef<number>(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  // Reduced motion resolves to the plain text by derivation, so the effect
  // below is purely the animated path.
  const shown = reduced ? text : output;

  useEffect(() => {
    if (reduced) return;

    let resolved = 0;
    let tickCount = 0;

    const run = () => {
      // Three animation ticks per settled character keeps the scramble legible.
      const scrambleTick = () => {
        tickCount += 1;
        if (tickCount % 3 === 0) resolved += 1;

        const next = text
          .split("")
          .map((char, i) => {
            if (i < resolved || char === " ") return char;
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          })
          .join("");

        setOutput(next);

        if (resolved < text.length) {
          timeoutRef.current = setTimeout(
            () => (frameRef.current = requestAnimationFrame(scrambleTick)),
            speed,
          );
        } else {
          setOutput(text);
        }
      };

      scrambleTick();
    };

    timeoutRef.current = setTimeout(run, delay);

    return () => {
      clearTimeout(timeoutRef.current);
      cancelAnimationFrame(frameRef.current);
    };
  }, [text, delay, speed, reduced]);

  return (
    <span className={className} aria-label={text}>
      <span aria-hidden="true">{shown || " "}</span>
    </span>
  );
}
