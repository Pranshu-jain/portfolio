"use client";

import { engagements } from "@/lib/fde";
import SectionHeading from "@/components/motion/SectionHeading";
import Reveal from "@/components/motion/Reveal";

const openChat = () => window.dispatchEvent(new CustomEvent("open-chat"));

export default function BuildWithMe() {
  return (
    <section id="engagements" data-sheet="Engagement models" className="sheet">
      <div className="page">
        <SectionHeading
          number="07"
          name="Engagement models"
          field="Three shapes"
          title={
            <>
              How much ambiguity are you{" "}
              <span className="text-blue">handing over</span>?
            </>
          }
          description="Same loop in all three. The difference is how much of the problem is still undefined when I start, and how long I stay attached."
          className="mb-9"
        />

        <div className="grid md:grid-cols-3 border-t border-l border-graphite">
          {engagements.map((engagement, i) => (
            <Reveal key={engagement.id} delay={i * 0.08} className="h-full">
              <div className="h-full border-r border-b border-graphite p-6 flex flex-col">
                <div className="flex items-baseline justify-between gap-3 mb-3">
                  <span className="font-mono text-[10.5px] tracking-[0.14em] uppercase text-blue font-semibold">
                    {engagement.name}
                  </span>
                  <span className="mono !text-[9px]">{engagement.duration}</span>
                </div>

                <h3 className="display-sm text-[17px] mb-2.5 leading-snug">
                  {engagement.desc}
                </h3>
                <p className="text-[12.5px] text-soft m-0 mb-5">
                  {engagement.best}
                </p>

                <ul className="list-none m-0 p-0 flex flex-col gap-2 flex-1">
                  {engagement.features.map((feature) => (
                    <li
                      key={feature}
                      className="relative pl-4 text-[12.5px] leading-relaxed text-graphite"
                    >
                      <span className="absolute left-0 top-[9px] w-[7px] h-px bg-blue" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={openChat}
                  className={`btn btn-sm mt-6 justify-center ${
                    engagement.highlight ? "btn-solid" : ""
                  }`}
                >
                  Scope this
                </button>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
