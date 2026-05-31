"use client";

import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { ArrowRight, Mail, Zap } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { siteConfig } from "@/lib/config";
import dynamic from "next/dynamic";
import Link from "next/link";

const ParticleCanvas = dynamic(() => import("./ParticleCanvas"), {
  ssr: false,
  loading: () => null,
});

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.75, ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number] },
  }),
};

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      {/* 3D Particle background */}
      <ParticleCanvas />

      {/* Ambient glows */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 30% 50%, rgba(0,212,255,0.04) 0%, transparent 70%), radial-gradient(ellipse 50% 50% at 80% 30%, rgba(124,58,237,0.06) 0%, transparent 60%)",
        }}
      />

      {/* Bottom fade to bg */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-28 pb-24 w-full">
        <div className="max-w-5xl">
          {/* Status badge */}
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass border border-[rgba(0,212,255,0.15)] text-xs font-medium text-[#00d4ff] mb-10"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22c55e] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#22c55e]" />
            </span>
            Available for projects · AI-First Developer
          </motion.div>

          {/* Main headline */}
          <motion.h1
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-[clamp(2.8rem,8vw,7rem)] font-black tracking-tight leading-[0.95] mb-8 select-none"
          >
            <span className="block text-white">I build</span>
            <span className="block gradient-text">products fast</span>
            <span className="block text-white">using AI.</span>
          </motion.h1>

          {/* Typing subtitle */}
          <motion.p
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-xl sm:text-2xl text-[#475569] mb-12 min-h-[2rem]"
          >
            <TypeAnimation
              sequence={[
                "MVP in days, not months.",
                2500,
                "Automation that reclaims your time.",
                2500,
                "AI-powered products that scale.",
                2500,
                "Your startup idea → shipped product.",
                2500,
              ]}
              wrapper="span"
              speed={55}
              repeat={Infinity}
            />
          </motion.p>

          {/* CTAs */}
          <motion.div
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap items-center gap-4 mb-16"
          >
            <Link
              href="/#projects"
              className="flex items-center gap-2 px-8 py-4 rounded-full btn-gradient text-white font-semibold text-[15px] shine"
            >
              <Zap size={16} /> View My Work
            </Link>
            <Link
              href="/build-with-me"
              className="flex items-center gap-2 px-8 py-4 rounded-full border border-[rgba(255,255,255,0.1)] text-white font-semibold text-[15px] hover:border-[rgba(0,212,255,0.25)] hover:bg-white/[0.03] transition-all duration-300"
            >
              Build With Me <ArrowRight size={15} />
            </Link>
          </motion.div>

          {/* Social links */}
          <motion.div
            custom={4}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="flex items-center gap-5"
          >
            <span className="text-xs text-[#334155] uppercase tracking-widest">
              Connect
            </span>
            <div className="w-8 h-px bg-[rgba(255,255,255,0.06)]" />
            <div className="flex gap-3">
              {[
                {
                  icon: GithubIcon,
                  href: "https://github.com/Pranshu-jain",
                  label: "GitHub",
                },
                {
                  icon: LinkedinIcon,
                  href: siteConfig.linkedin,
                  label: "LinkedIn",
                },
                {
                  icon: Mail,
                  href: "mailto:jpranshu36@gmail.com",
                  label: "Email",
                },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 rounded-full glass flex items-center justify-center text-[#475569] hover:text-[#00d4ff] hover:border-[rgba(0,212,255,0.25)] transition-all duration-200"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
      >
        <span className="text-[10px] text-[#334155] uppercase tracking-[3px]">
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
