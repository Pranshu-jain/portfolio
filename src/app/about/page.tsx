import type { Metadata } from "next";
import Link from "next/link";
import Philosophy from "@/components/Philosophy";
import Footer from "@/components/Footer";
import Reveal from "@/components/motion/Reveal";
import { dimensions } from "@/lib/fde";

export const metadata: Metadata = {
  title: "About — Pranshu, Forward Deployed Engineer",
  description:
    "Why I work forward deployed: embedded with the team, building inside their systems, owning the problem from ambiguity through adoption.",
};

const toolkit = [
  { label: "Discovery on site", sub: "Ambiguity to one-page spec" },
  { label: "Next.js / React", sub: "Front end and SSR" },
  { label: "Rails / Ruby", sub: "Domain logic and APIs" },
  { label: "Python / Django", sub: "Services and pipelines" },
  { label: "PostgreSQL / Redis", sub: "Modelling and indexing" },
  { label: "LLMs / agents", sub: "Deployed, not demoed" },
  { label: "REST / webhooks", sub: "Third-party integration" },
  { label: "Docker / Vercel / Railway", sub: "Ship and operate" },
];

export default function AboutPage() {
  return (
    <>
      <section
        data-sheet="Surveyor"
        className="sheet pt-[clamp(96px,15vh,150px)]"
      >
        <div className="page">
          <Reveal>
            <div className="sheet-label">
              <span className="num">A</span>
              <span>Surveyor</span>
              <span className="rule" />
              <span className="hidden sm:block">P. Jain</span>
            </div>
          </Reveal>

          <div className="max-w-[62ch]">
            <Reveal delay={0.05}>
              <h1 className="display h1 mb-7">
                I&rsquo;m Pranshu.
                <br />
                I deploy <span className="text-blue">forward</span>.
              </h1>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="text-[clamp(1rem,1.35vw,1.15rem)] leading-[1.65] text-graphite mb-5">
                Most engineering roles start after somebody else has done the
                hard part — deciding what to build. Forward deployment starts
                before that. I land inside the customer&rsquo;s environment,
                watch the actual work, and find the condition that makes the
                obvious answer wrong.
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <p className="text-[15px] leading-relaxed text-soft mb-5">
                Then I build. In their stack, against their APIs, under their
                conventions — a thin end-to-end slice live on real data inside
                the first week, hardened into something load-bearing over the
                next few. Not a prototype handed to another team to finish.
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="text-[15px] leading-relaxed text-soft mb-8">
                And I stay until it&rsquo;s used. Shipped is not the finish
                line — adopted is. The engagement ends when the customer&rsquo;s
                team can operate and extend it without me, and the number we
                agreed on has actually moved.
              </p>
            </Reveal>

            <Reveal delay={0.25}>
              <div className="flex flex-wrap gap-3">
                <Link href="/contact" className="btn btn-solid">
                  Start a survey
                </Link>
                <Link href="/#conditions" className="btn">
                  Read the survey
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section data-sheet="Capability marks" className="sheet">
        <div className="page">
          <Reveal>
            <div className="sheet-label">
              <span className="num">B</span>
              <span>Capability marks</span>
              <span className="rule" />
              <span className="hidden sm:block">A1&ndash;A8</span>
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <p className="text-[15px] text-soft max-w-[56ch] mb-7">
              The full schedule, with load profiles and evidence for each mark,
              is{" "}
              <Link href="/#dimensions" className="text-blue underline">
                on the survey
              </Link>
              .
            </p>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 border-t border-l border-graphite">
            {dimensions.map((d, i) => (
              <Reveal key={d.id} delay={i * 0.04}>
                <div className="h-full border-r border-b border-graphite p-5">
                  <div className="font-mono text-[11px] text-blue font-semibold mb-3">
                    {d.mark}
                  </div>
                  <div className="display-sm text-[14px] mb-1.5">{d.label}</div>
                  <div className="text-[12px] text-soft">{d.short}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section data-sheet="Toolkit" className="sheet">
        <div className="page">
          <Reveal>
            <div className="sheet-label">
              <span className="num">C</span>
              <span>Toolkit</span>
              <span className="rule" />
              <span className="hidden sm:block">What I bring on site</span>
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 border-t border-l border-graphite">
            {toolkit.map((t, i) => (
              <Reveal key={t.label} delay={i * 0.04}>
                <div className="h-full border-r border-b border-graphite p-5">
                  <div className="display-sm text-[14px] mb-1.5">{t.label}</div>
                  <div className="text-[12px] text-soft">{t.sub}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Philosophy />
      <Footer />
    </>
  );
}
