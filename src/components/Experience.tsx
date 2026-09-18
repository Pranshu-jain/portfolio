import { experience } from "@/lib/experience";
import { siteConfig } from "@/lib/config";
import SectionHeading from "@/components/motion/SectionHeading";
import Reveal from "@/components/motion/Reveal";

/**
 * "Where I've shipped" — the employment record behind the builds above. Text
 * only by design: company work is described, never screenshotted. Content
 * comes from `lib/experience.ts`, which is held to verified facts.
 */
export default function Experience() {
  return (
    <section id="experience" className="py-28 relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 55% 50% at 85% 30%, rgba(124,58,237,0.04) 0%, transparent 65%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6">
        <SectionHeading
          eyebrow="Experience"
          accent="#7c3aed"
          title={
            <>
              Where I&apos;ve <span className="gradient-text">shipped</span>
            </>
          }
          description={`${siteConfig.experience} on product teams. Company work is described in text only — no client names, no screenshots, no internal data.`}
          className="mb-14"
        />

        <div className="flex flex-col gap-4">
          {experience.map((role, i) => (
            <Reveal key={role.id} delay={i * 0.08}>
              <article className="relative p-6 sm:p-7 rounded-2xl card-border overflow-hidden grid md:grid-cols-[240px_1fr] gap-5 md:gap-10">
                <div
                  className="absolute top-0 left-0 right-0 h-[2px] opacity-40"
                  style={{
                    background: `linear-gradient(90deg, ${role.color}, transparent)`,
                  }}
                />

                <div>
                  <div
                    className="mono text-[10px] font-semibold uppercase tracking-widest mb-2"
                    style={{ color: role.color }}
                  >
                    {role.dates}
                  </div>
                  <h3 className="text-base font-bold text-[#0f172a]">
                    {role.company}
                  </h3>
                  <div className="text-sm text-[#64748b] mt-0.5">
                    {role.title}
                  </div>
                </div>

                <div>
                  <p className="text-sm text-[#475569] leading-relaxed mb-4">
                    {role.product}
                  </p>
                  <ul className="flex flex-col gap-2.5">
                    {role.bullets.map((bullet, j) => (
                      <li key={bullet} className="flex items-start gap-3">
                        <span
                          className="mono text-[10px] shrink-0 mt-[3px] tabular-nums"
                          style={{ color: role.color }}
                        >
                          {String(j + 1).padStart(2, "0")}
                        </span>
                        <span className="text-[13px] text-[#475569] leading-relaxed">
                          {bullet}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
