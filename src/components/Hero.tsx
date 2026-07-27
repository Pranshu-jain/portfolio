"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { siteConfig } from "@/lib/config";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

/** Set as two deliberate lines; the break is part of the composition. */
const HEADLINE = [
  [{ text: "I work inside", accent: false }],
  [
    { text: "the ", accent: false },
    { text: "constraint", accent: true },
    { text: ".", accent: false },
  ],
];

export default function Hero() {
  const reduced = useReducedMotion();

  return (
    <section
      data-sheet="Site survey"
      className="sheet pt-[clamp(112px,17vh,178px)] pb-[clamp(52px,8vh,96px)]"
    >
      <div className="page">
        <div className="grid lg:grid-cols-[minmax(0,1.5fr)_minmax(0,0.78fr)] gap-[clamp(32px,4vw,56px)] items-center">
        <div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mono"
          >
            {siteConfig.role} &nbsp;·&nbsp; Available for survey
          </motion.div>

          <h1 className="display h1 my-5">
            {HEADLINE.map((line, i) => (
              <span key={i} className="block overflow-hidden">
                <motion.span
                  className="block whitespace-nowrap max-[520px]:whitespace-normal"
                  initial={{ y: reduced ? 0 : "108%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 1, delay: 0.2 + i * 0.11, ease: EASE }}
                >
                  {line.map((part) => (
                    <span
                      key={part.text}
                      className={part.accent ? "text-blue" : undefined}
                    >
                      {part.text}
                    </span>
                  ))}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45, ease: EASE }}
            className="text-[clamp(1rem,1.35vw,1.15rem)] leading-[1.62] text-graphite max-w-[52ch]"
          >
            Most engineering starts once somebody has decided what to build.
            Forward deployment starts before that — in your systems, on your
            data, under the rules that can&rsquo;t move.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55, ease: EASE }}
            className="flex flex-wrap items-center gap-3 mt-8"
          >
            <Link href="/#conditions" className="btn btn-solid">
              Read the survey
            </Link>
            <button
              onClick={() => window.dispatchEvent(new CustomEvent("open-chat"))}
              className="btn"
            >
              Start one
            </button>

            <div className="flex gap-2 ml-1">
              {[
                {
                  icon: GithubIcon,
                  href: `https://github.com/${siteConfig.github}`,
                  label: "GitHub",
                },
                { icon: LinkedinIcon, href: siteConfig.linkedin, label: "LinkedIn" },
                { icon: Mail, href: `mailto:${siteConfig.email}`, label: "Email" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-[38px] h-[38px] border border-graphite flex items-center justify-center text-graphite hover:bg-graphite hover:text-stock transition-colors duration-200"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* SIGNATURE — a real constraint, annotated. The leader line points
            back at the word it qualifies. */}
        <motion.aside
          initial={{ opacity: 0, x: reduced ? 0 : 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.85, ease: EASE }}
          className="callout callout-leader max-w-[340px] lg:justify-self-end"
        >
          <span className="tag">Binding constraint · as observed</span>
          <ul className="font-mono text-[12.5px] leading-[1.85] text-ink list-none m-0 p-0">
            <li>
              <span className="text-bind-ink">— </span>cannot change app behaviour
            </li>
            <li>
              <span className="text-bind-ink">— </span>cannot block a user request
            </li>
            <li>
              <span className="text-bind-ink">— </span>fail-open if the vendor is down
            </li>
          </ul>
          <p className="font-mono text-[9.5px] tracking-[0.1em] uppercase text-bind-ink/80 mt-3 mb-0">
            Client Rails app · Iterable integration
          </p>
        </motion.aside>
        </div>
      </div>
    </section>
  );
}
