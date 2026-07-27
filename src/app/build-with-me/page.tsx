import type { Metadata } from "next";
import Footer from "@/components/Footer";
import ChatTrigger from "@/components/ChatTrigger";
import Reveal from "@/components/motion/Reveal";
import { siteConfig } from "@/lib/config";
import { engagements, deploymentLoop } from "@/lib/fde";
import { ArrowRight, CheckCircle2, Crosshair, Gauge, Layers, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "Deploy Me — Pranshu, Forward Deployed Engineer",
  description:
    "Engagement models for forward deployment: a two-week strike, a multi-month embed, or ongoing systems and AI integration. Same loop, different depth.",
};

const whyFDE = [
  {
    icon: Crosshair,
    title: "You get the discovery too",
    desc: "I don't need a finished spec. Turning the fuzzy version into a buildable one is the first phase of the work, not a prerequisite for it.",
  },
  {
    icon: Layers,
    title: "Deployed in your stack",
    desc: "Your repo, your conventions, your deploy pipeline. Not a sandbox demo your team has to rebuild before it counts.",
  },
  {
    icon: Gauge,
    title: "Measured, not asserted",
    desc: "We agree on one number before I build, and instrumentation ships in the same commit as the feature.",
  },
  {
    icon: Users,
    title: "Your team owns it after",
    desc: "Documentation and a walkthrough are deliverables. The engagement succeeds when you don't need me anymore.",
  },
];

export default function BuildWithMePage() {
  return (
    <>
      <div className="pt-28 max-w-7xl mx-auto px-6">
        {/* Hero */}
        <div className="text-center max-w-3xl mx-auto mb-24">
          <Reveal>
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              {engagements.map((eng) => (
                <span
                  key={eng.id}
                  className="mono inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-semibold uppercase tracking-wider"
                  style={{
                    background: `${eng.color}14`,
                    color: eng.color,
                    border: `1px solid ${eng.color}26`,
                  }}
                >
                  {eng.name} · {eng.duration}
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <h1 className="text-5xl sm:text-7xl font-black text-[#0f172a] mb-6 leading-[1.02] tracking-tight">
              Hand me the fuzzy problem —
              <br />
              <span className="gradient-text">I&apos;ll deploy the answer.</span>
            </h1>
          </Reveal>

          <Reveal delay={0.14}>
            <p className="text-[#475569] text-xl leading-relaxed mb-8">
              Forward deployment means I take the problem before it&apos;s been
              specified, build inside your environment, and stay attached until
              your team has adopted what I shipped.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <ChatTrigger className="inline-flex items-center gap-2 px-10 py-4 rounded-full btn-gradient text-[#0f172a] font-semibold text-lg shine">
              Scope an Engagement <ArrowRight size={18} />
            </ChatTrigger>
          </Reveal>
        </div>

        {/* Why an FDE, not a contractor */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-24">
          {whyFDE.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.07}>
              <div className="p-6 rounded-2xl card-border h-full">
                <item.icon size={22} className="text-[#0284c7] mb-4" />
                <h3 className="font-bold text-[#0f172a] text-sm mb-2">
                  {item.title}
                </h3>
                <p className="text-[#64748b] text-xs leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Engagement models */}
        <div className="mb-24">
          <Reveal>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0f172a] text-center mb-3">
              Three ways to <span className="gradient-text">deploy me</span>
            </h2>
            <p className="text-[#64748b] text-center mb-12 max-w-xl mx-auto">
              Same loop in all three. The difference is how much ambiguity
              you&apos;re handing over and how long I stay attached.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {engagements.map((eng, i) => (
              <Reveal key={eng.id} delay={i * 0.09}>
                <div
                  className={`relative h-full p-7 rounded-2xl flex flex-col gap-5 ${
                    eng.highlight ? "gradient-border" : "card-border"
                  }`}
                >
                  {eng.highlight && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full mono text-[10px] font-bold bg-[#7c3aed] text-[#0f172a] uppercase tracking-wider">
                      Most engagements
                    </div>
                  )}

                  <div>
                    <div className="flex items-baseline justify-between gap-3 mb-2">
                      <span
                        className="mono text-[11px] font-bold uppercase tracking-widest"
                        style={{ color: eng.color }}
                      >
                        {eng.name}
                      </span>
                      <span className="mono text-[10px] text-[#94a3b8]">
                        {eng.duration}
                      </span>
                    </div>
                    <div className="text-lg font-bold text-[#0f172a] mb-2 leading-snug">
                      {eng.desc}
                    </div>
                    <div className="text-[#64748b] text-xs">{eng.best}</div>
                  </div>

                  <div className="h-px bg-[rgba(15,23,42,0.06)]" />

                  <div className="flex flex-col gap-2.5 flex-1">
                    {eng.features.map((f) => (
                      <div key={f} className="flex items-start gap-2.5">
                        <CheckCircle2
                          size={13}
                          className="mt-0.5 shrink-0"
                          style={{ color: eng.color }}
                        />
                        <span className="text-[#475569] text-xs leading-relaxed">
                          {f}
                        </span>
                      </div>
                    ))}
                  </div>

                  <a
                    href={`mailto:${siteConfig.email}?subject=${encodeURIComponent(
                      `${eng.name} engagement — scoping`,
                    )}`}
                    className={`flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all ${
                      eng.highlight
                        ? "btn-gradient text-[#0f172a] shine"
                        : "border border-[rgba(15,23,42,0.10)] text-[#475569] hover:text-[#0f172a] hover:border-[rgba(15,23,42,0.18)]"
                    }`}
                  >
                    Scope this <ArrowRight size={14} />
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* What every engagement runs through */}
        <div className="mb-24">
          <Reveal>
            <div className="text-center mb-10">
              <h2 className="text-3xl sm:text-4xl font-black text-[#0f172a] mb-3">
                Every engagement runs{" "}
                <span className="gradient-text">the same loop</span>
              </h2>
              <p className="text-[#64748b] text-lg max-w-xl mx-auto">
                Windows compress or stretch with the engagement. The order
                doesn&apos;t change.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {deploymentLoop.map((phase, i) => (
              <Reveal key={phase.id} delay={i * 0.07}>
                <div className="p-6 rounded-2xl card-border h-full flex flex-col">
                  <div className="flex items-center gap-2 mb-4">
                    <span
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ background: phase.color }}
                    />
                    <span
                      className="mono text-[10px] font-bold uppercase tracking-widest"
                      style={{ color: phase.color }}
                    >
                      {phase.window}
                    </span>
                  </div>
                  <h3 className="font-bold text-[#0f172a] text-sm mb-2">
                    {phase.title}
                  </h3>
                  <p className="text-[#64748b] text-xs leading-relaxed">
                    {phase.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <Reveal>
          <div className="text-center pb-16">
            <p className="text-[#475569] text-lg mb-6">
              Still deciding which shape fits? That usually means the problem is
              fuzzy — which is the case for forward deployment, not against it.
            </p>
            <ChatTrigger className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-[rgba(14,165,233,0.2)] text-[#0284c7] hover:bg-[rgba(14,165,233,0.05)] transition-all font-semibold">
              Start a Conversation <ArrowRight size={16} />
            </ChatTrigger>
          </div>
        </Reveal>
      </div>
      <Footer />
    </>
  );
}
