"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ExternalLink,
  ArrowRight,
  X,
  TrendingUp,
  Lightbulb,
  Target,
} from "lucide-react";
import { GithubIcon } from "@/components/icons";
import { featuredProjects } from "@/lib/projects";
import Link from "next/link";

type Project = (typeof featuredProjects)[0];

function ImpactTag({ text }: { text: string }) {
  const [emoji, ...rest] = text.split(" · ");
  return (
    <div className="flex items-center gap-1.5 text-xs text-[#64748b]">
      <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e]/60" />
      {text}
    </div>
  );
}

function ProjectModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />
      <motion.div
        initial={{ scale: 0.92, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.92, opacity: 0, y: 20 }}
        transition={{ type: "spring", damping: 28, stiffness: 300 }}
        className="relative w-full max-w-2xl bg-[#0f0f0f] rounded-3xl border border-[rgba(255,255,255,0.08)] overflow-hidden max-h-[90dvh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top accent line */}
        <div
          className="h-[2px] w-full"
          style={{
            background: `linear-gradient(90deg, ${project.color}, ${project.color}00)`,
          }}
        />

        <div className="p-8">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-3">
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl"
                style={{ background: project.accentColor }}
              >
                {project.emoji}
              </div>
              <div>
                <div
                  className="text-[10px] font-semibold uppercase tracking-widest mb-1"
                  style={{ color: project.color }}
                >
                  Featured Project
                </div>
                <h3 className="text-xl font-bold text-white">{project.title}</h3>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full flex items-center justify-center text-[#475569] hover:text-white hover:bg-white/[0.06] transition-all"
            >
              <X size={16} />
            </button>
          </div>

          <p className="text-[#64748b] text-sm leading-relaxed mb-6">
            {project.description}
          </p>

          {/* Story cards */}
          <div className="grid grid-cols-1 gap-3 mb-6">
            {[
              { icon: Lightbulb, label: "Problem", content: project.problem, color: "#ef4444" },
              { icon: Target, label: "Solution", content: project.solution, color: "#00d4ff" },
              { icon: TrendingUp, label: "Impact", content: project.impact, color: "#22c55e" },
            ].map(({ icon: Icon, label, content, color }) => (
              <div
                key={label}
                className="flex gap-3 p-4 rounded-xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.04)]"
              >
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                  style={{ background: `${color}18` }}
                >
                  <Icon size={14} style={{ color }} />
                </div>
                <div>
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-[#475569] mb-1">
                    {label}
                  </div>
                  <div className="text-sm text-[#94a3b8]">{content}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full text-[11px] font-medium bg-[rgba(255,255,255,0.04)] text-[#64748b] border border-[rgba(255,255,255,0.04)]"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Links */}
          <div className="flex gap-3">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-[rgba(255,255,255,0.08)] text-sm text-[#64748b] hover:text-white hover:border-[rgba(255,255,255,0.15)] transition-all"
            >
              <GithubIcon size={14} /> Source Code
            </a>
            {project.demo !== project.github && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-full btn-gradient text-sm text-white font-medium shine"
              >
                <ExternalLink size={14} /> Live Demo
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function ProjectCard({
  project,
  index,
  onClick,
}: {
  project: Project;
  index: number;
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ delay: index * 0.1, duration: 0.55, ease: [0.25, 0.4, 0.25, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={onClick}
      className="relative cursor-pointer rounded-2xl overflow-hidden card-border p-6 flex flex-col gap-5 group"
      style={{ minHeight: "300px" }}
    >
      {/* Top accent */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] transition-opacity duration-300"
        style={{
          background: `linear-gradient(90deg, ${project.color}, transparent)`,
          opacity: hovered ? 1 : 0.4,
        }}
      />

      {/* Inner glow on hover */}
      <motion.div
        className="absolute inset-0 pointer-events-none rounded-2xl"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{
          background: `radial-gradient(ellipse at 50% 0%, ${project.accentColor} 0%, transparent 70%)`,
        }}
      />

      <div className="relative flex items-start justify-between">
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center text-xl"
          style={{ background: project.accentColor }}
        >
          {project.emoji}
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
        <h3 className="text-base font-bold text-white mb-2">{project.title}</h3>
        <p className="text-sm text-[#475569] leading-relaxed line-clamp-3">
          {project.shortDesc}
        </p>
      </div>

      <div className="relative flex flex-wrap gap-2 mt-auto">
        {project.tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="px-2 py-1 rounded-md text-[11px] text-[#475569] bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.04)]"
          >
            {tag}
          </span>
        ))}
        {project.tags.length > 3 && (
          <span className="px-2 py-1 rounded-md text-[11px] text-[#334155] bg-[rgba(255,255,255,0.02)]">
            +{project.tags.length - 3}
          </span>
        )}
      </div>

      <div className="relative text-[11px] text-[#334155] flex items-center gap-1.5 group-hover:text-[#475569] transition-colors">
        Click for full story <ArrowRight size={9} />
      </div>
    </motion.article>
  );
}

export default function ProjectsSection() {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <section id="projects" className="py-28 max-w-7xl mx-auto px-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-16"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-semibold uppercase tracking-wider bg-[rgba(0,212,255,0.08)] text-[#00d4ff] border border-[rgba(0,212,255,0.1)] mb-5">
          Featured Work
        </div>
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-5 leading-tight">
          Projects that{" "}
          <span className="gradient-text">deliver results</span>
        </h2>
        <p className="text-[#475569] max-w-xl text-lg leading-relaxed">
          Not just code — products that solve real problems, ship fast, and
          create measurable impact. Click any card for the full story.
        </p>
      </motion.div>

      {/* Grid — horizontal swipe on mobile, grid on md+ */}
      <div className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-none -mx-6 px-6 md:mx-0 md:px-0 md:grid md:grid-cols-2 md:overflow-visible md:pb-0 lg:grid-cols-3">
        {featuredProjects.map((project, i) => (
          <div key={project.id} className="snap-start shrink-0 w-[80vw] sm:w-[60vw] md:w-auto">
            <ProjectCard
              project={project}
              index={i}
              onClick={() => setSelected(project)}
            />
          </div>
        ))}
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
        className="mt-12 flex justify-center"
      >
        <a
          href="https://github.com/Pranshu-jain"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[rgba(255,255,255,0.07)] text-sm text-[#475569] hover:text-white hover:border-[rgba(0,212,255,0.2)] transition-all duration-300"
        >
          <GithubIcon size={14} /> View All on GitHub <ArrowRight size={13} />
        </a>
      </motion.div>

      <AnimatePresence>
        {selected && (
          <ProjectModal project={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
