"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { fieldLog } from "@/lib/fde";
import SectionHeading from "@/components/motion/SectionHeading";
import Reveal from "@/components/motion/Reveal";

const CHAR_MS = 15;
const AFTER_CMD_MS = 200;
const AFTER_OUT_MS = 560;

type Entry = { cmd: string; out: string; tone: string };

/**
 * The log sheet. A field log is a document, so it's set as one — ruled
 * entries on stock rather than a terminal window, which would be a
 * second visual language competing with the drawing.
 *
 * Constraint lines are the only place signal yellow appears here, same
 * rule as everywhere else on the site.
 */
function LogSheet() {
  const ref = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });
  const reduced = useReducedMotion();

  const [entries, setEntries] = useState<Entry[]>([]);
  const [typing, setTyping] = useState("");
  const [done, setDone] = useState(false);

  const shownEntries: Entry[] = reduced ? [...fieldLog] : entries;
  const shownDone = reduced || done;

  useEffect(() => {
    if (!inView || reduced) return;

    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const wait = (ms: number) =>
      new Promise<void>((resolve) => timers.push(setTimeout(resolve, ms)));

    const run = async () => {
      for (const entry of fieldLog) {
        for (let i = 1; i <= entry.cmd.length; i++) {
          if (cancelled) return;
          setTyping(entry.cmd.slice(0, i));
          await wait(CHAR_MS);
        }
        if (cancelled) return;
        await wait(AFTER_CMD_MS);
        if (cancelled) return;
        setTyping("");
        setEntries((prev) => [...prev, entry]);
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

  // Depend on the state, not the derived array — `shownEntries` is a fresh
  // array each render under reduced motion.
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [entries, typing, reduced]);

  return (
    <div ref={ref} className="panel">
      <div className="flex items-center gap-3 px-5 py-3 border-b border-graphite">
        <span className="mono !text-[9.5px] truncate">
          Log sheet — deployments / iterable
        </span>
        <span className="ml-auto mono !text-[9px] shrink-0">
          {shownDone ? "Complete" : "Running"}
        </span>
      </div>

      <div
        ref={scrollRef}
        className="log px-5 py-4 h-[360px] overflow-y-auto scrollbar-hide"
      >
        {shownEntries.map((entry, i) => (
          <div key={`${entry.cmd}-${i}`} className="log-row">
            <div className="log-cmd flex gap-2">
              <span className="text-blue shrink-0 tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="break-all">{entry.cmd}</span>
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.22 }}
              className={`log-out break-words ${
                entry.tone === "warn" ? "log-out-bind" : ""
              }`}
            >
              {entry.out}
            </motion.div>
          </div>
        ))}

        {!shownDone && (
          <div className="log-row border-b-0">
            <div className="flex gap-2">
              <span className="text-blue shrink-0 tabular-nums">
                {String(shownEntries.length + 1).padStart(2, "0")}
              </span>
              <span className="caret break-all">{typing}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function FieldLog() {
  return (
    <section data-sheet="Field log" className="sheet">
      <div className="page">
        <div className="grid lg:grid-cols-2 gap-[clamp(28px,4vw,56px)] items-start">
          <div>
            <SectionHeading
              number="05"
              name="Field log"
              title={
                <>
                  One deployment,
                  <br className="hidden sm:block" />{" "}
                  <span className="text-blue">as recorded</span>.
                </>
              }
              description="The Iterable integration, compressed. Land in a live Rails codebase I didn't write, find the condition that actually binds, and leave a pattern the resident team could reuse without me."
              className="mb-7"
            />

            <Reveal delay={0.15}>
              <div className="grid grid-cols-2 border-t border-l border-graphite max-w-md">
                {[
                  { k: "Campaign triggers", v: "behaviour-driven" },
                  { k: "Event sync", v: "real-time" },
                  { k: "App behaviour changed", v: "none" },
                  { k: "Pattern reuse", v: "later vendors" },
                ].map((item) => (
                  <div
                    key={item.k}
                    className="border-r border-b border-graphite px-4 py-3"
                  >
                    <div className="mono !text-[8.5px] !tracking-[0.11em] mb-1">
                      {item.k}
                    </div>
                    <div className="font-mono text-[13px] font-semibold text-ink">
                      {item.v}
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal direction="left" delay={0.1}>
            <LogSheet />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
