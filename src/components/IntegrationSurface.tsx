"use client";

import { integrationSurface } from "@/lib/fde";
import SectionHeading from "@/components/motion/SectionHeading";
import Reveal from "@/components/motion/Reveal";

/**
 * The surface schedule. Each row is a class of system I have to plug
 * into, the components within it, and the rule that class is held to —
 * the rule column is the point, not the logo soup.
 */
export default function IntegrationSurface() {
  return (
    <section id="surface" data-sheet="Integration surface" className="sheet">
      <div className="page">
        <SectionHeading
          number="06"
          name="Integration surface"
          field={`${integrationSurface.length} classes`}
          title={
            <>
              Stacks I{" "}
              <span className="text-blue">didn&rsquo;t choose</span>.
            </>
          }
          description="Forward deployment means writing in someone else's repo, against someone else's API, under someone else's conventions. These are the surfaces I plug into, and the rule each one is held to."
          className="mb-9"
        />

        <Reveal>
          <div className="overflow-x-auto scrollbar-none -mx-[var(--gutter)] px-[var(--gutter)] md:mx-0 md:px-0">
            <table className="schedule min-w-[620px]">
              <thead>
                <tr>
                  <th className="w-[42px]">Mk</th>
                  <th className="w-[20%]">Class</th>
                  <th className="w-[32%]">Components</th>
                  <th>Rule held to</th>
                </tr>
              </thead>
              <tbody>
                {integrationSurface.map((group, i) => (
                  <tr key={group.category}>
                    <td className="font-mono text-[11.5px] text-blue font-semibold">
                      S{String(i + 1).padStart(2, "0")}
                    </td>
                    <td className="font-semibold text-ink text-[13.5px]">
                      {group.category}
                    </td>
                    <td>
                      <div className="flex flex-wrap gap-1">
                        {group.items.map((item) => (
                          <span
                            key={item}
                            className="font-mono text-[10px] px-1.5 py-0.5 border text-soft"
                            style={{ borderColor: "var(--line)" }}
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="text-soft text-[12.5px] leading-snug">
                      {group.note}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
