"use client";

import { doctrine } from "@/lib/fde";
import SectionHeading from "@/components/motion/SectionHeading";
import Reveal from "@/components/motion/Reveal";

/**
 * Operating doctrine. Six independent rules — not a sequence, so they
 * carry no numbers. They're set as a list of statements because that's
 * what they are.
 */
export default function Philosophy() {
  return (
    <section id="doctrine" data-sheet="Operating doctrine" className="sheet">
      <div className="page">
        <SectionHeading
          number="08"
          name="Operating doctrine"
          field="General notes"
          title={
            <>
              What I fall back on when the brief{" "}
              <span className="text-blue">runs out</span>.
            </>
          }
          description="Nobody deploys an engineer forward for a well-specified problem. These are the defaults that decide what happens next."
          className="mb-9"
        />

        <Reveal>
          <div className="callout mb-10 max-w-[62ch]">
            <span className="tag">The premise</span>
            <p className="display-sm text-[clamp(1.05rem,1.9vw,1.45rem)] leading-snug m-0">
              The customer&rsquo;s hardest problem is never the one written in
              the brief. It&rsquo;s the one everybody has quietly stopped
              mentioning because they assume it can&rsquo;t be fixed.
            </p>
          </div>
        </Reveal>

        <div className="grid sm:grid-cols-2 gap-x-[clamp(24px,4vw,56px)] gap-y-0">
          {doctrine.map((rule, i) => (
            <Reveal key={rule.title} delay={i * 0.05}>
              <div className="border-t border-graphite py-6">
                <h3 className="display-sm text-[16px] mb-2.5 leading-snug">
                  {rule.title}
                </h3>
                <p className="text-[13px] leading-relaxed text-soft m-0">
                  {rule.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
