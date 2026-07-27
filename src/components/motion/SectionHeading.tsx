"use client";

import type { ReactNode } from "react";
import Reveal from "./Reveal";

/**
 * The shared section header: eyebrow chip, headline, supporting line. Every
 * section used to hand-roll this markup; centralising it keeps rhythm and
 * spacing identical down the page.
 */
export default function SectionHeading({
  eyebrow,
  accent = "#00d4ff",
  title,
  description,
  align = "left",
  className,
}: {
  eyebrow: string;
  accent?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  const centered = align === "center";

  return (
    <div
      className={`${centered ? "text-center" : ""} ${className ?? ""}`}
    >
      <Reveal>
        <div
          className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-semibold uppercase tracking-wider mb-5 ${
            centered ? "mx-auto" : ""
          }`}
          style={{
            background: `${accent}14`,
            color: accent,
            border: `1px solid ${accent}26`,
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: accent }}
          />
          {eyebrow}
        </div>
      </Reveal>

      <Reveal delay={0.08}>
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-5 leading-[1.05] tracking-tight">
          {title}
        </h2>
      </Reveal>

      {description && (
        <Reveal delay={0.16}>
          <p
            className={`text-[#64748b] text-lg leading-relaxed ${
              centered ? "max-w-2xl mx-auto" : "max-w-xl"
            }`}
          >
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
