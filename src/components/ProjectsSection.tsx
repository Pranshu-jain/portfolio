"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ExternalLink,
  ArrowRight,
  X,
  Crosshair,
  Lock,
  PackageCheck,
  TrendingUp,
  Plug,
} from "lucide-react";
import { GithubIcon } from "@/components/icons";
import { featuredProjects, type Deployment } from "@/lib/projects";
import SectionHeading from "@/components/motion/SectionHeading";
import Reveal from "@/components/motion/Reveal";
import TiltCard from "@/components/motion/TiltCard";

/** Full engagement dossier: context → constraint → shipped → outcome. */
function DeploymentDossier({
  deployment,
  onClose,
}: {
  deployment: Deployment;
  onClose: () => void;
}) {
  // Escape closes, and the page behind must not scroll while this is open.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${deployment.title} deployment dossier`}
    >
      <div className="absolute inset-0 bg-black/85 backdrop-blur-md" />

      <motion.div
        initial={{ scale: 0.94, opacity: 0, y: 24 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.94, opacity: 0, y: 24 }}
        transition={{ type: "spring", damping: 28, stiffness: 300 }}
        className="relative w-full max-w-3xl bg-[#0b0b0c] rounded-3xl border border-[rgba(255,255,255,0.08)] overflow-hidden max-h-[90dvh] overflow-y-auto scrollbar-hide"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="h-[2px] w-full"
          style={{
            background: `linear-gradient(90deg, ${deployment.color}, ${deployment.color}00)`,
          }}
        />

        <div className="p-7 sm:p-9">
          {/* Header */}
          <div className="flex items-start justify-between gap-4 mb-7">
            <div className="flex items-center gap-3.5 min-w-0">
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shrink-0"
                style={{ background: deployment.accentColor }}
              >
                {deployment.emoji}
              </div>
              <div className="min-w-0">
                <div
                  className="mono text-[10px] font-semibold uppercase tracking-widest mb-1"
                  style={{ color: deployment.color }}
                >
                  Deployment Dossier
                </div>
                <h3 className="text-xl font-black text-white truncate">
                  {deployment.title}
                </h3>
              </div>
            </div>
            <button
              onClick={onClose}
              aria-label="Close dossier"
              className="w-8 h-8 rounded-full flex items-center justify-center text-[#475569] hover:text-white hover:bg-white/[0.06] transition-all shrink-0"
            >
              <X size={16} />
            </button>
          </div>

          {/* Role strip */}
          <div className="mono text-[10px] uppercase tracking-wider text-[#475569] mb-7 px-3 py-2 rounded-lg bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.04)]">
            Role — {deployment.role}
          </div>

          {/* Outcome headline: numbers before narrative */}
          <div className="grid grid-cols-3 gap-3 mb-7">
            {deployment.outcome.map((o, i) => (
              <motion.div
                key={o.metric}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.07, duration: 0.4 }}
                className="p-4 rounded-xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.04)] text-center"
              >
                <div
                  className="mono text-base sm:text-lg font-black leading-none mb-1.5"
                  style={{ color: deployment.color }}
                >
                  {o.value}
                </div>
                <div className="text-[10px] text-[#475569] leading-tight">
                  {o.metric}
                </div>
              </motion.div>
            ))}
          </div>

          {/* The story, in FDE order */}
          <div className="flex flex-col gap-3 mb-7">
            {[
              {
                icon: Crosshair,
                label: "What I landed in",
                content: deployment.context,
                color: "#00d4ff",
              },
              {
                icon: Lock,
                label: "The binding constraint",
                content: deployment.constraint,
                color: "#f59e0b",
              },
            ].map(({ icon: Icon, label, content, color }) => (
              <div
                key={label}
                className="flex gap-3.5 p-4 rounded-xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.04)]"
              >
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                  style={{ background: `${color}18` }}
                >
                  <Icon size={14} style={{ color }} />
                </div>
                <div>
                  <div className="mono text-[10px] font-semibold uppercase tracking-wider text-[#475569] mb-1.5">
                    {label}
                  </div>
                  <div className="text-[13px] text-[#94a3b8] leading-relaxed">
                    {content}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Shipped */}
          <div className="mb-7">
            <div className="flex items-center gap-2 mb-3.5">
              <PackageCheck size={14} className="text-[#22c55e]" />
              <span className="mono text-[10px] font-semibold uppercase tracking-wider text-[#475569]">
                What shipped
              </span>
            </div>
            <div className="flex flex-col gap-2.5">
              {deployment.shipped.map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.05, duration: 0.35 }}
                  className="flex items-start gap-3"
                >
                  <span
                    className="mono text-[10px] shrink-0 mt-[3px] tabular-nums"
                    style={{ color: deployment.color }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[13px] text-[#94a3b8] leading-relaxed">
                    {item}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Integration surfaces */}
          <div className="mb-7">
            <div className="flex items-center gap-2 mb-3">
              <Plug size={14} className="text-[#7c3aed]" />
              <span className="mono text-[10px] font-semibold uppercase tracking-wider text-[#475569]">
                Integration surface
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {deployment.surfaces.map((s) => (
                <span
                  key={s}
                  className="mono px-3 py-1 rounded-full text-[10px] font-medium border"
                  style={{
                    color: `${deployment.color}cc`,
                    borderColor: `${deployment.color}26`,
                    background: `${deployment.color}0d`,
                  }}
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Stack */}
          <div className="flex flex-wrap gap-2 mb-7">
            {deployment.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full text-[11px] font-medium bg-[rgba(255,255,255,0.04)] text-[#64748b] border border-[rgba(255,255,255,0.04)]"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-3">
            <a
              href={deployment.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-[rgba(255,255,255,0.08)] text-sm text-[#64748b] hover:text-white hover:border-[rgba(255,255,255,0.15)] transition-all"
            >
              <GithubIcon size={14} /> Source Code
            </a>
            {deployment.demo !== deployment.github && (
              <a
                href={deployment.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-full btn-gradient text-sm text-white font-medium shine"
              >
                <ExternalLink size={14} /> Live Deployment
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function DeploymentCard({
  deployment,
  index,
  onClick,
}: {
  deployment: Deployment;
  index: number;
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const headline = deployment.outcome[0];

  return (
    <Reveal delay={index * 0.09} className="h-full">
      <TiltCard
        className="h-full rounded-2xl"
        glare={`${deployment.color}1a`}
        max={7}
      >
        <motion.article
          onHoverStart={() => setHovered(true)}
          onHoverEnd={() => setHovered(false)}
          onClick={onClick}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onClick();
            }
          }}
          aria-label={`Open dossier for ${deployment.title}`}
          className="relative h-full cursor-pointer rounded-2xl overflow-hidden card-border p-6 flex flex-col gap-5 group focus:outline-none focus-visible:ring-1 focus-visible:ring-[#00d4ff]"
          style={{ minHeight: "340px" }}
        >
          <div
            className="absolute top-0 left-0 right-0 h-[2px] transition-opacity duration-300"
            style={{
              background: `linear-gradient(90deg, ${deployment.color}, transparent)`,
              opacity: hovered ? 1 : 0.4,
            }}
          />

          <motion.div
            className="absolute inset-0 pointer-events-none rounded-2xl"
            animate={{ opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            style={{
              background: `radial-gradient(ellipse at 50% 0%, ${deployment.accentColor} 0%, transparent 70%)`,
            }}
          />

          <div className="relative flex items-start justify-between">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center text-xl"
              style={{ background: deployment.accentColor }}
            >
              {deployment.emoji}
            </div>
            <motion.div
              animate={{ x: hovered ? 0 : 6, opacity: hovered ? 1 : 0 }}
              transition={{ duration: 0.2 }}
              className="text-[#475569]"
            >
              <ArrowRight size={16} />
            </motion.div>
          </div>

          <div className="relative">
            <h3 className="text-base font-bold text-white mb-2">
              {deployment.title}
            </h3>
            <p className="text-sm text-[#475569] leading-relaxed line-clamp-3">
              {deployment.shortDesc}
            </p>
          </div>

          {/* Headline outcome — the reason to open the card */}
          <div className="relative flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.04)] mt-auto">
            <TrendingUp
              size={13}
              className="shrink-0"
              style={{ color: deployment.color }}
            />
            <span
              className="mono text-xs font-bold"
              style={{ color: deployment.color }}
            >
              {headline.value}
            </span>
            <span className="text-[11px] text-[#475569] truncate">
              {headline.metric}
            </span>
          </div>

          <div className="relative flex flex-wrap gap-2">
            {deployment.surfaces.slice(0, 3).map((s) => (
              <span
                key={s}
                className="mono px-2 py-1 rounded-md text-[10px] text-[#475569] bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.04)]"
              >
                {s}
              </span>
            ))}
            {deployment.surfaces.length > 3 && (
              <span className="mono px-2 py-1 rounded-md text-[10px] text-[#334155] bg-[rgba(255,255,255,0.02)]">
                +{deployment.surfaces.length - 3}
              </span>
            )}
          </div>

          <div className="relative mono text-[10px] uppercase tracking-wider text-[#334155] flex items-center gap-1.5 group-hover:text-[#475569] transition-colors">
            Open dossier <ArrowRight size={9} />
          </div>
        </motion.article>
      </TiltCard>
    </Reveal>
  );
}

export default function ProjectsSection() {
  const [selected, setSelected] = useState<Deployment | null>(null);

  return (
    <section id="deployments" className="py-28 max-w-7xl mx-auto px-6">
      <SectionHeading
        eyebrow="Deployments"
        accent="#00d4ff"
        title={
          <>
            Problems I was{" "}
            <span className="gradient-text">dropped into</span>
          </>
        }
        description="Each one reads the same way: the situation I landed in, the constraint that made the obvious answer wrong, what shipped, and the number that moved. Open a dossier for the full engagement."
        className="mb-16"
      />

      {/* Horizontal swipe on mobile, grid on md+ */}
      <div className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-none -mx-6 px-6 md:mx-0 md:px-0 md:grid md:grid-cols-2 md:overflow-visible md:pb-0 lg:grid-cols-3">
        {featuredProjects.map((deployment, i) => (
          <div
            key={deployment.id}
            className="snap-start shrink-0 w-[80vw] sm:w-[60vw] md:w-auto"
          >
            <DeploymentCard
              deployment={deployment}
              index={i}
              onClick={() => setSelected(deployment)}
            />
          </div>
        ))}
      </div>

      <Reveal delay={0.2} blur={false}>
        <div className="mt-12 flex justify-center">
          <a
            href="https://github.com/Pranshu-jain"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[rgba(255,255,255,0.07)] text-sm text-[#475569] hover:text-white hover:border-[rgba(0,212,255,0.2)] transition-all duration-300"
          >
            <GithubIcon size={14} /> Full source on GitHub{" "}
            <ArrowRight size={13} />
          </a>
        </div>
      </Reveal>

      <AnimatePresence>
        {selected && (
          <DeploymentDossier
            deployment={selected}
            onClose={() => setSelected(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
