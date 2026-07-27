"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, X } from "lucide-react";
import { GithubIcon } from "@/components/icons";
import { featuredProjects, type Deployment } from "@/lib/projects";
import SectionHeading from "@/components/motion/SectionHeading";
import Reveal from "@/components/motion/Reveal";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

/** Survey reference: C-01, C-02… Not a ranking, a drawing reference. */
const ref = (i: number) => `C-${String(i + 1).padStart(2, "0")}`;

function Dossier({
  deployment,
  index,
  onClose,
}: {
  deployment: Deployment;
  index: number;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-8"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${deployment.title} survey record`}
    >
      <div className="absolute inset-0 bg-graphite/45" />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 16 }}
        transition={{ duration: 0.32, ease: EASE }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl bg-stock border border-graphite max-h-[88dvh] overflow-y-auto scrollbar-hide"
      >
        <div className="flex items-start justify-between gap-4 px-7 py-5 border-b border-graphite">
          <div>
            <div className="mono !text-[9.5px] mb-1.5">
              Survey record · {ref(index)}
            </div>
            <h3 className="display-sm text-xl">{deployment.title}</h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close record"
            className="w-8 h-8 border border-graphite flex items-center justify-center hover:bg-graphite hover:text-stock transition-colors shrink-0"
          >
            <X size={15} />
          </button>
        </div>

        <div className="px-7 py-6">
          <div className="mono !text-[9.5px] mb-5">Role — {deployment.role}</div>

          <div className="mb-6">
            <div className="mono !text-[9.5px] mb-2.5">Existing conditions</div>
            <p className="text-[14px] leading-relaxed text-graphite m-0">
              {deployment.context}
            </p>
          </div>

          <div className="note mb-6">
            <span className="tag">Binding constraint</span>
            <p className="m-0 text-[13px] leading-relaxed text-ink">
              {deployment.constraint}
            </p>
          </div>

          <div className="mb-6">
            <div className="mono !text-[9.5px] mb-3">Work built</div>
            <ul className="list-none m-0 p-0 flex flex-col gap-2">
              {deployment.shipped.map((item) => (
                <li
                  key={item}
                  className="relative pl-4 text-[13.5px] leading-relaxed text-graphite"
                >
                  <span className="absolute left-0 top-[10px] w-[7px] h-px bg-blue" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-3 border-t border-l border-graphite mb-6">
            {deployment.outcome.map((o) => (
              <div
                key={o.metric}
                className="px-4 py-2.5 border-r border-b border-graphite"
              >
                <div className="font-mono text-[13px] font-semibold text-ink">
                  {o.value}
                </div>
                <div className="mono !text-[8.5px] !tracking-[0.11em] leading-tight">
                  {o.metric}
                </div>
              </div>
            ))}
          </div>

          <div className="mb-6">
            <div className="mono !text-[9.5px] mb-2.5">Integration surface</div>
            <div className="flex flex-wrap gap-1.5">
              {deployment.surfaces.map((s) => (
                <span
                  key={s}
                  className="font-mono text-[10px] px-2 py-1 border border-line text-soft"
                  style={{ borderColor: "var(--line)" }}
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-2.5">
            <a
              href={deployment.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-sm"
            >
              <GithubIcon size={13} /> Source
            </a>
            {deployment.demo !== deployment.github && (
              <a
                href={deployment.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-sm btn-solid"
              >
                <ExternalLink size={13} /> Live deployment
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function SurveyEntry({
  deployment,
  index,
  onOpen,
}: {
  deployment: Deployment;
  index: number;
  onOpen: () => void;
}) {
  return (
    <Reveal delay={index * 0.07}>
      <article className="border-t border-graphite py-7 grid md:grid-cols-[52px_minmax(0,1fr)_minmax(0,0.9fr)] gap-x-[clamp(18px,3vw,40px)] gap-y-4">
        <div className="font-mono text-[11.5px] text-blue font-semibold pt-1">
          {ref(index)}
        </div>

        <div>
          <h3 className="display-sm text-lg mb-2.5">{deployment.title}</h3>
          <p className="text-[13.5px] leading-relaxed text-soft m-0 mb-3.5">
            {deployment.context}
          </p>
          <ul className="list-none m-0 p-0">
            {deployment.shipped.slice(0, 3).map((item) => (
              <li
                key={item}
                className="relative pl-4 py-[3px] text-[13px] leading-snug text-graphite"
              >
                <span className="absolute left-0 top-[11px] w-[7px] h-px bg-blue" />
                {item}
              </li>
            ))}
          </ul>
          <button
            onClick={onOpen}
            className="mono !text-[9.5px] mt-3.5 inline-flex items-center gap-1.5 hover:text-ink transition-colors"
          >
            Open record &rarr;
          </button>
        </div>

        <div>
          <div className="note">
            <span className="tag">Binding constraint</span>
            <p className="m-0 text-[12.5px] leading-relaxed text-ink">
              {deployment.constraint}
            </p>
          </div>

          {/* Grid, not flex-wrap: a wrapped flex row breaks the border box. */}
          <div className="grid grid-cols-3 border-t border-l border-graphite mt-4">
            {deployment.outcome.map((o) => (
              <div
                key={o.metric}
                className="px-3 py-2 border-r border-b border-graphite"
              >
                <div className="font-mono text-[12.5px] font-semibold text-ink">
                  {o.value}
                </div>
                <div className="mono !text-[8px] !tracking-[0.11em] leading-tight">
                  {o.metric}
                </div>
              </div>
            ))}
          </div>
        </div>
      </article>
    </Reveal>
  );
}

export default function ProjectsSection() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <section id="conditions" data-sheet="Existing conditions" className="sheet">
      <div className="page">
        <SectionHeading
          number="03"
          name="Existing conditions"
          field={`${featuredProjects.length} surveys`}
          title={
            <>
              What was already there
              <br className="hidden sm:block" /> when I{" "}
              <span className="text-blue">arrived</span>.
            </>
          }
          description="The situation on site, the condition that ruled out the obvious answer, and what got built inside it."
          className="mb-9"
        />

        {featuredProjects.map((deployment, i) => (
          <SurveyEntry
            key={deployment.id}
            deployment={deployment}
            index={i}
            onOpen={() => setSelected(i)}
          />
        ))}

        <Reveal delay={0.12}>
          <div className="border-t border-graphite pt-7">
            <a
              href={`https://github.com/${"Pranshu-jain"}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-sm"
            >
              <GithubIcon size={13} /> Full source on GitHub
            </a>
          </div>
        </Reveal>
      </div>

      <AnimatePresence>
        {selected !== null && (
          <Dossier
            deployment={featuredProjects[selected]}
            index={selected}
            onClose={() => setSelected(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
