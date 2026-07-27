import type { Metadata } from "next";
import Footer from "@/components/Footer";
import ChatTrigger from "@/components/ChatTrigger";
import Reveal from "@/components/motion/Reveal";
import { siteConfig } from "@/lib/config";
import { engagements, deploymentLoop } from "@/lib/fde";

export const metadata: Metadata = {
  title: "Deploy me — Pranshu, Forward Deployed Engineer",
  description:
    "Engagement models for forward deployment: a two-week strike, a multi-month embed, or ongoing systems and AI integration. Same loop, different depth.",
};

const terms = [
  {
    title: "You get the discovery too",
    desc: "I don't need a finished spec. Turning the fuzzy version into a buildable one is the first phase of the work, not a prerequisite for it.",
  },
  {
    title: "Deployed in your stack",
    desc: "Your repo, your conventions, your deploy pipeline. Not a sandbox demo your team has to rebuild before it counts.",
  },
  {
    title: "Measured, not asserted",
    desc: "We agree on one number before I build, and the instrumentation ships in the same commit as the feature.",
  },
  {
    title: "Your team owns it after",
    desc: "Documentation and a walkthrough are deliverables. The engagement succeeds when you stop needing me.",
  },
];

export default function BuildWithMePage() {
  return (
    <>
      <section
        data-sheet="Scope of work"
        className="sheet pt-[clamp(96px,15vh,150px)]"
      >
        <div className="page">
          <Reveal>
            <div className="sheet-label">
              <span className="num">A</span>
              <span>Scope of work</span>
              <span className="rule" />
              <span className="hidden sm:block">Three shapes</span>
            </div>
          </Reveal>

          <div className="max-w-[58ch]">
            <Reveal delay={0.05}>
              <h1 className="display h1 mb-6">
                Hand me the fuzzy problem.
                <br />
                I&rsquo;ll deploy the{" "}
                <span className="text-blue">answer</span>.
              </h1>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="text-[clamp(1rem,1.35vw,1.12rem)] leading-[1.62] text-graphite mb-8">
                Forward deployment means I take the problem before it&rsquo;s
                been specified, build inside your environment, and stay attached
                until your team has adopted what I shipped.
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <ChatTrigger className="btn btn-solid">
                Scope an engagement
              </ChatTrigger>
            </Reveal>
          </div>
        </div>
      </section>

      <section data-sheet="Terms" className="sheet">
        <div className="page">
          <Reveal>
            <div className="sheet-label">
              <span className="num">B</span>
              <span>Terms</span>
              <span className="rule" />
              <span className="hidden sm:block">How this works</span>
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 border-t border-l border-graphite">
            {terms.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.05}>
                <div className="h-full border-r border-b border-graphite p-5">
                  <h3 className="display-sm text-[14px] mb-2.5">{item.title}</h3>
                  <p className="text-[12.5px] leading-relaxed text-soft m-0">
                    {item.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section data-sheet="Engagement models" className="sheet">
        <div className="page">
          <Reveal>
            <div className="sheet-label">
              <span className="num">C</span>
              <span>Engagement models</span>
              <span className="rule" />
              <span className="hidden sm:block">Same loop, different depth</span>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-3 border-t border-l border-graphite">
            {engagements.map((eng, i) => (
              <Reveal key={eng.id} delay={i * 0.07} className="h-full">
                <div className="h-full border-r border-b border-graphite p-6 flex flex-col">
                  <div className="flex items-baseline justify-between gap-3 mb-3">
                    <span className="font-mono text-[10.5px] tracking-[0.14em] uppercase text-blue font-semibold">
                      {eng.name}
                    </span>
                    <span className="mono !text-[9px]">{eng.duration}</span>
                  </div>

                  <h3 className="display-sm text-[16px] mb-2.5 leading-snug">
                    {eng.desc}
                  </h3>
                  <p className="text-[12.5px] text-soft m-0 mb-5">{eng.best}</p>

                  <ul className="list-none m-0 p-0 flex flex-col gap-2 flex-1">
                    {eng.features.map((f) => (
                      <li
                        key={f}
                        className="relative pl-4 text-[12.5px] leading-relaxed text-graphite"
                      >
                        <span className="absolute left-0 top-[9px] w-[7px] h-px bg-blue" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <a
                    href={`mailto:${siteConfig.email}?subject=${encodeURIComponent(
                      `${eng.name} engagement — scoping`,
                    )}`}
                    className={`btn btn-sm mt-6 justify-center ${
                      eng.highlight ? "btn-solid" : ""
                    }`}
                  >
                    Scope this
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section data-sheet="Phase sequence" className="sheet">
        <div className="page">
          <Reveal>
            <div className="sheet-label">
              <span className="num">D</span>
              <span>Phase sequence</span>
              <span className="rule" />
              <span className="hidden sm:block">Windows compress, order doesn&rsquo;t</span>
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 border-t border-l border-graphite">
            {deploymentLoop.map((phase, i) => (
              <Reveal key={phase.id} delay={i * 0.05}>
                <div className="h-full border-r border-b border-graphite p-5">
                  <div className="h-[3px] bg-blue mb-4" style={{ width: `${(i + 1) * 20}%` }} />
                  <div className="font-mono text-[9.5px] tracking-[0.13em] uppercase text-blue font-semibold mb-2.5">
                    {phase.window}
                  </div>
                  <h3 className="display-sm text-[14px] mb-2">{phase.title}</h3>
                  <p className="text-[12px] leading-relaxed text-soft m-0">
                    {phase.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.15}>
            <div className="mt-10 max-w-[52ch]">
              <p className="text-[15px] text-soft mb-5">
                Still deciding which shape fits? That usually means the problem
                is fuzzy — which is the case for forward deployment, not against
                it.
              </p>
              <ChatTrigger className="btn">Start a conversation</ChatTrigger>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </>
  );
}
