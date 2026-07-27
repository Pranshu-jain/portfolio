"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { fieldLog } from "@/lib/fde";
import SectionHeading from "@/components/motion/SectionHeading";
import Reveal from "@/components/motion/Reveal";

const TONE: Record<string, string> = {
  ok: "#22c55e",
  info: "#00d4ff",
  warn: "#f59e0b",
};

const CHAR_MS = 16;
const AFTER_CMD_MS = 220;
const AFTER_OUT_MS = 620;

type Rendered = { cmd: string; out: string | null; tone: string };

/**
 * Replays one real deployment as terminal output, typed line by line. It shows
 * the shape of the work — land, observe, map constraints, integrate, verify,
 * hand off — in the medium the work actually happens in. Lines come from
 * `fieldLog`, which is held to the no-invented-figures rule in `lib/fde.ts`.
 */
function Terminal() {
  const ref = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });
  const reduced = useReducedMotion();

  const [lines, setLines] = useState<Rendered[]>([]);
  const [typing, setTyping] = useState("");
  const [done, setDone] = useState(false);

  // Reduced motion shows the finished transcript by derivation rather than by
  // replaying it, so the effect only ever drives the animated path.
  const shownLines: Rendered[] = reduced
    ? fieldLog.map((l) => ({ cmd: l.cmd, out: l.out, tone: l.tone }))
    : lines;
  const shownDone = reduced || done;

  useEffect(() => {
    if (!inView || reduced) return;

    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const wait = (ms: number) =>
      new Promise<void>((resolve) => timers.push(setTimeout(resolve, ms)));

    const run = async () => {
      for (const entry of fieldLog) {
        // Type the command one character at a time.
        for (let i = 1; i <= entry.cmd.length; i++) {
          if (cancelled) return;
          setTyping(entry.cmd.slice(0, i));
          await wait(CHAR_MS);
        }
        if (cancelled) return;

        await wait(AFTER_CMD_MS);
        if (cancelled) return;

        // Commit the command, then reveal its output.
        setTyping("");
        setLines((prev) => [
          ...prev,
          { cmd: entry.cmd, out: entry.out, tone: entry.tone },
        ]);
        await wait(AFTER_OUT_MS);
      }
      if (!cancelled) setDone(true);
    };

    run();

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, [inView, reduced]);

  // Keep the newest line in frame as output accumulates.
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [shownLines, typing]);

  return (
    <div
      ref={ref}
      className="relative rounded-2xl overflow-hidden border border-[rgba(255,255,255,0.07)] bg-[#080809] shadow-[0_24px_80px_rgba(0,0,0,0.5)]"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#00d4ff]/40 to-transparent" />

      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.015)]">
        <div className="flex gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        </div>
        <span className="mono text-[10px] text-[#475569] ml-2 truncate">
          ~/deployments/iterable — field log
        </span>
        <span className="ml-auto flex items-center gap-1.5 shrink-0">
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: shownDone ? "#22c55e" : "#f59e0b" }}
          />
          <span className="mono text-[9px] text-[#475569]">
            {shownDone ? "COMPLETE" : "RUNNING"}
          </span>
        </span>
      </div>

      {/* Output */}
      <div
        ref={scrollRef}
        className="mono text-[11px] sm:text-xs p-5 h-[380px] overflow-y-auto scrollbar-hide leading-relaxed"
      >
        {shownLines.map((line, i) => (
          <div key={`${line.cmd}-${i}`} className="mb-3">
            <div className="flex gap-2">
              <span className="text-[#7c3aed] shrink-0">❯</span>
              <span className="text-[#cbd5e1] break-all">{line.cmd}</span>
            </div>
            {line.out && (
              <motion.div
                initial={{ opacity: 0, y: -3 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="pl-4 mt-1 break-words"
                style={{ color: TONE[line.tone] }}
              >
                {line.out}
              </motion.div>
            )}
          </div>
        ))}

        {/* Line currently being typed */}
        {!shownDone && (
          <div className="flex gap-2">
            <span className="text-[#7c3aed] shrink-0">❯</span>
            <span className="text-[#cbd5e1] caret break-all">{typing}</span>
          </div>
        )}

        {shownDone && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex gap-2 text-[#334155]"
          >
            <span className="text-[#7c3aed] shrink-0">❯</span>
            <span className="caret" />
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default function FieldLog() {
  return (
    <section className="py-28 relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 70% 50%, rgba(124,58,237,0.05) 0%, transparent 65%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <SectionHeading
              eyebrow="Field Log"
              accent="#22c55e"
              title={
                <>
                  What it looks like{" "}
                  <span className="gradient-text">from the inside</span>
                </>
              }
              description="One real deployment, compressed: the Iterable integration. Land in a live Rails codebase I didn't write, find the constraint that actually binds — fail-open, no matter what — and leave behind a pattern the resident team could reuse without me."
              className="mb-8"
            />

            <Reveal delay={0.2}>
              <div className="grid grid-cols-2 gap-3 max-w-md">
                {[
                  { k: "Campaign triggers", v: "behaviour-driven", c: "#22c55e" },
                  { k: "Event sync", v: "real-time", c: "#00d4ff" },
                  { k: "App behaviour changed", v: "none", c: "#7c3aed" },
                  { k: "Pattern reuse", v: "later vendors", c: "#ff6b35" },
                ].map((item) => (
                  <div
                    key={item.k}
                    className="p-4 rounded-xl card-border"
                  >
                    <div className="mono text-[9px] uppercase tracking-wider text-[#334155] mb-1.5">
                      {item.k}
                    </div>
                    <div
                      className="mono text-sm font-bold"
                      style={{ color: item.c }}
                    >
                      {item.v}
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal direction="left" delay={0.1}>
            <Terminal />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
