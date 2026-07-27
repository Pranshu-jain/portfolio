"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { dimensions, deploymentLoop } from "@/lib/fde";
import SectionHeading from "@/components/motion/SectionHeading";
import Reveal from "@/components/motion/Reveal";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

/** Two-letter phase heads, keyed to the phase sequence on the next sheet. */
const PHASE_HEADS = ["Ld", "Ms", "Sl", "Hd", "Ov"];

function LoadCell({ level }: { level: number }) {
  const cls = level === 2 ? "ld ld-full" : level === 1 ? "ld ld-part" : "ld";
  return <i className={cls} />;
}

/**
 * The capability schedule. Eight marks, each carrying the phases where it
 * bears load and the evidence behind it — a real schedule, not a score
 * chart. Selecting a row opens the full entry.
 */
export default function FDEDimensions() {
  const [openId, setOpenId] = useState<string | null>(dimensions[0].id);

  return (
    <section id="dimensions" data-sheet="Capability schedule" className="sheet">
      <div className="page">
        <SectionHeading
          number="02"
          name="Capability schedule"
          field="A1–A8"
          title={
            <>
              A deployment fails on the mark
              <br className="hidden sm:block" /> you&rsquo;re{" "}
              <span className="text-blue">missing</span>.
            </>
          }
          description="Not the ones you have. Each mark carries the phases where it bears load, and the evidence behind it — select a row for the full entry."
          className="mb-10"
        />

        <Reveal>
          <div className="overflow-x-auto scrollbar-none -mx-[var(--gutter)] px-[var(--gutter)] md:mx-0 md:px-0">
            <table className="schedule min-w-[640px]">
              <thead>
                <tr>
                  <th className="w-[42px]">Mk</th>
                  <th className="w-[26%]">Capability</th>
                  {PHASE_HEADS.map((h) => (
                    <th key={h} className="w-[26px] text-center pr-[3px]">
                      {h}
                    </th>
                  ))}
                  <th>Evidence on record</th>
                </tr>
              </thead>
              <tbody>
                {dimensions.map((d) => {
                  const open = openId === d.id;
                  return (
                    <tr
                      key={d.id}
                      onClick={() => setOpenId(open ? null : d.id)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setOpenId(open ? null : d.id);
                        }
                      }}
                      tabIndex={0}
                      role="button"
                      aria-expanded={open}
                      aria-label={`${d.label} — full entry`}
                      className="cursor-pointer"
                      style={open ? { background: "rgba(29,91,191,0.07)" } : undefined}
                    >
                      <td className="font-mono text-[11.5px] text-blue font-semibold align-middle">
                        {d.mark}
                      </td>
                      <td className="font-semibold text-ink text-[13.5px]">
                        {d.label}
                      </td>
                      {d.load.map((level, i) => (
                        <td key={i} className="text-center pr-[3px]">
                          <LoadCell level={level} />
                        </td>
                      ))}
                      <td className="text-soft text-[12.5px] leading-snug">
                        {d.evidence[0]}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Reveal>

        {/* Legend — process blue at two weights. Never yellow. */}
        <Reveal delay={0.1}>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-4 mono !text-[9px]">
            <span className="inline-flex items-center gap-2">
              <i className="ld ld-full" /> Carries the phase
            </span>
            <span className="inline-flex items-center gap-2">
              <i className="ld ld-part" /> In play
            </span>
            <span className="inline-flex items-center gap-2">
              <i className="ld" /> Not load-bearing
            </span>
            <span className="sm:ml-auto normal-case tracking-normal text-faint">
              {deploymentLoop
                .map((p, i) => `${PHASE_HEADS[i]} ${p.title.toLowerCase()}`)
                .join("  ·  ")}
            </span>
          </div>
        </Reveal>

        {/* Expanded entry */}
        <AnimatePresence mode="wait" initial={false}>
          {openId && (
            <motion.div
              key={openId}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="overflow-hidden"
            >
              {(() => {
                const d = dimensions.find((x) => x.id === openId)!;
                return (
                  <div className="panel mt-7 p-6 sm:p-7 grid md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-6">
                    <div>
                      <div className="flex items-baseline gap-3 mb-1.5">
                        <span className="font-mono text-[11px] text-blue font-semibold">
                          {d.mark}
                        </span>
                        <h3 className="display-sm text-lg">{d.label}</h3>
                      </div>
                      <p className="mono !text-[9.5px] mb-4">{d.short}</p>
                      <p className="text-[14px] leading-relaxed text-graphite">
                        {d.detail}
                      </p>
                    </div>
                    <div>
                      <div className="mono !text-[9.5px] mb-3">
                        Evidence on record
                      </div>
                      <ul className="list-none m-0 p-0 flex flex-col gap-2.5">
                        {d.evidence.map((item) => (
                          <li
                            key={item}
                            className="relative pl-4 text-[13px] leading-relaxed text-soft"
                          >
                            <span className="absolute left-0 top-[9px] w-[7px] h-px bg-blue" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })()}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
