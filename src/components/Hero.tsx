"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { ArrowRight, Mail, Radio, Terminal } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { siteConfig } from "@/lib/config";
import { deploymentLoop } from "@/lib/fde";
import ScrambleText from "@/components/motion/ScrambleText";
import Magnetic from "@/components/motion/Magnetic";
import dynamic from "next/dynamic";
import Link from "next/link";

const ParticleCanvas = dynamic(() => import("./ParticleCanvas"), {
  ssr: false,
  loading: () => null,
});

const EASE = [0.25, 0.4, 0.25, 1] as [number, number, number, number];

const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.75, ease: EASE },
  }),
};

/** Headline words animate in individually — reads as a system coming online. */
const HEADLINE: { text: string; className: string }[] = [
  { text: "I deploy", className: "text-white" },
  { text: "into your stack", className: "gradient-text" },
  { text: "and ship.", className: "text-white" },
];

/**
 * Live engagement panel: walks the five loop phases on a timer so the hero
 * shows the operating model rather than asserting it. Purely decorative —
 * hidden from assistive tech, since the full loop has its own section.
 */
function EngagementPanel() {
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const id = setInterval(
      () => setActive((i) => (i + 1) % deploymentLoop.length),
      2200,
    );
    return () => clearInterval(id);
  }, [reduced]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 30, filter: "blur(12px)" }}
      animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
      transition={{ delay: 0.7, duration: 0.9, ease: EASE }}
      aria-hidden="true"
      className="relative w-full max-w-sm rounded-2xl glass border border-[rgba(255,255,255,0.07)] overflow-hidden"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#00d4ff]/50 to-transparent" />

      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-[rgba(255,255,255,0.05)]">
        <Terminal size={12} className="text-[#00d4ff]" />
        <span className="mono text-[10px] uppercase tracking-[2px] text-[#475569]">
          engagement.live
        </span>
        <span className="ml-auto flex items-center gap-1.5">
          <span className="relative flex h-1.5 w-1.5">
            <span className="ping-ring absolute inline-flex h-full w-full rounded-full bg-[#22c55e]" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#22c55e]" />
          </span>
          <span className="mono text-[9px] text-[#22c55e]">ACTIVE</span>
        </span>
      </div>

      <div className="p-4 flex flex-col gap-1">
        {deploymentLoop.map((phase, i) => {
          const isActive = i === active;
          const isDone = i < active;
          return (
            <div
              key={phase.id}
              className="relative flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors duration-500"
              style={{
                background: isActive ? `${phase.color}0f` : "transparent",
              }}
            >
              {/* Rail */}
              <div className="relative flex flex-col items-center">
                <motion.span
                  className="w-2 h-2 rounded-full shrink-0"
                  animate={{
                    background: isActive || isDone ? phase.color : "#1e293b",
                    scale: isActive ? 1.35 : 1,
                    boxShadow: isActive
                      ? `0 0 12px ${phase.color}aa`
                      : `0 0 0px ${phase.color}00`,
                  }}
                  transition={{ duration: 0.45 }}
                />
              </div>

              <div className="min-w-0 flex-1">
                <div
                  className="text-[11px] font-semibold truncate transition-colors duration-500"
                  style={{ color: isActive ? "#f8fafc" : isDone ? "#64748b" : "#334155" }}
                >
                  {phase.title}
                </div>
              </div>

              <span
                className="mono text-[9px] tracking-wider transition-colors duration-500 shrink-0"
                style={{ color: isActive ? phase.color : "#293548" }}
              >
                {phase.window}
              </span>
            </div>
          );
        })}
      </div>

      {/* Progress bar across the loop */}
      <div className="h-px bg-[rgba(255,255,255,0.05)] mx-4" />
      <div className="px-4 py-3 flex items-center gap-3">
        <div className="flex-1 h-[3px] rounded-full bg-[rgba(255,255,255,0.05)] overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            animate={{
              width: `${((active + 1) / deploymentLoop.length) * 100}%`,
              background: deploymentLoop[active].color,
            }}
            transition={{ duration: 0.6, ease: EASE }}
          />
        </div>
        <span className="mono text-[9px] text-[#334155]">
          {String(active + 1).padStart(2, "0")}/
          {String(deploymentLoop.length).padStart(2, "0")}
        </span>
      </div>
    </motion.div>
  );
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      <ParticleCanvas />

      {/* Engineering grid — signals "systems", not "agency landing page". */}
      <div className="grid-field absolute inset-0 pointer-events-none" aria-hidden="true" />

      {/* Ambient glows */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 25% 45%, rgba(0,212,255,0.05) 0%, transparent 70%), radial-gradient(ellipse 50% 50% at 85% 35%, rgba(124,58,237,0.07) 0%, transparent 60%)",
        }}
      />

      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-24 w-full">
        <div className="grid lg:grid-cols-[1fr_auto] gap-16 items-center">
          <div className="max-w-3xl">
            {/* Status badge */}
            <motion.div
              custom={0}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass border border-[rgba(0,212,255,0.15)] text-xs font-medium text-[#00d4ff] mb-8"
            >
              <span className="relative flex h-2 w-2">
                <span className="ping-ring absolute inline-flex h-full w-full rounded-full bg-[#22c55e]" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#22c55e]" />
              </span>
              Available for deployment · Remote or on-site
            </motion.div>

            {/* Role, decrypting */}
            <motion.div
              custom={1}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="flex items-center gap-3 mb-6"
            >
              <Radio size={13} className="text-[#7c3aed] shrink-0" />
              <ScrambleText
                text="FORWARD DEPLOYED ENGINEER"
                delay={450}
                className="mono text-[11px] sm:text-xs tracking-[4px] text-[#7c3aed] font-semibold"
              />
              <div className="hidden sm:block flex-1 h-px bg-gradient-to-r from-[rgba(124,58,237,0.3)] to-transparent" />
            </motion.div>

            {/* Headline */}
            <h1 className="text-[clamp(2.6rem,7.5vw,6rem)] font-black tracking-tight leading-[0.95] mb-8 select-none">
              {HEADLINE.map((line, i) => (
                <span key={line.text} className="block overflow-hidden">
                  <motion.span
                    className={`block ${line.className}`}
                    initial={{ y: "110%", opacity: 0 }}
                    animate={{ y: "0%", opacity: 1 }}
                    transition={{
                      delay: 0.25 + i * 0.11,
                      duration: 0.9,
                      ease: EASE,
                    }}
                  >
                    {line.text}
                  </motion.span>
                </span>
              ))}
            </h1>

            {/* Rotating claim */}
            <motion.p
              custom={4}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="text-lg sm:text-2xl text-[#64748b] mb-10 min-h-[2rem]"
            >
              <TypeAnimation
                sequence={siteConfig.hero.flatMap((line) => [line, 2400])}
                wrapper="span"
                speed={55}
                repeat={Infinity}
              />
            </motion.p>

            {/* CTAs */}
            <motion.div
              custom={5}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="flex flex-wrap items-center gap-4 mb-14"
            >
              <Magnetic>
                <Link
                  href="/#deployments"
                  className="flex items-center gap-2 px-8 py-4 rounded-full btn-gradient text-white font-semibold text-[15px] shine"
                >
                  See Deployments <ArrowRight size={15} />
                </Link>
              </Magnetic>
              <Magnetic strength={0.25}>
                <button
                  onClick={() =>
                    window.dispatchEvent(new CustomEvent("open-chat"))
                  }
                  className="flex items-center gap-2 px-8 py-4 rounded-full border border-[rgba(255,255,255,0.1)] text-white font-semibold text-[15px] hover:border-[rgba(0,212,255,0.25)] hover:bg-white/[0.03] transition-all duration-300"
                >
                  Scope an Engagement
                </button>
              </Magnetic>
            </motion.div>

            {/* Social */}
            <motion.div
              custom={6}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="flex items-center gap-5"
            >
              <span className="mono text-[10px] text-[#334155] uppercase tracking-widest">
                Contact
              </span>
              <div className="w-8 h-px bg-[rgba(255,255,255,0.06)]" />
              <div className="flex gap-3">
                {[
                  {
                    icon: GithubIcon,
                    href: `https://github.com/${siteConfig.github}`,
                    label: "GitHub",
                  },
                  {
                    icon: LinkedinIcon,
                    href: siteConfig.linkedin,
                    label: "LinkedIn",
                  },
                  {
                    icon: Mail,
                    href: `mailto:${siteConfig.email}`,
                    label: "Email",
                  },
                ].map(({ icon: Icon, href, label }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    whileHover={{ y: -3 }}
                    transition={{ type: "spring", stiffness: 400, damping: 18 }}
                    className="w-10 h-10 rounded-full glass flex items-center justify-center text-[#475569] hover:text-[#00d4ff] hover:border-[rgba(0,212,255,0.25)] transition-colors duration-200"
                  >
                    <Icon size={15} />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Live engagement panel — desktop only, it's supporting texture */}
          <div className="hidden lg:flex justify-end">
            <EngagementPanel />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
      >
        <span className="mono text-[9px] text-[#334155] uppercase tracking-[3px]">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-10 bg-gradient-to-b from-[#334155] to-transparent"
        />
      </motion.div>
    </section>
  );
}
