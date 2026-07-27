"use client";

import type { ReactNode } from "react";
import Reveal from "./Reveal";

/**
 * A sheet header: number, drawing name, and a field on the right for
 * whatever that sheet counts. It replaces the eyebrow-chip pattern —
 * the number here is a real sheet reference, not decoration.
 */
export default function SectionHeading({
  number,
  name,
  field,
  title,
  description,
  className,
}: {
  /** Sheet number, e.g. "02". Keyed to the title block. */
  number: string;
  /** Drawing name, shown in the header and echoed by the title block. */
  name: string;
  /** Right-hand field: what this sheet counts. */
  field?: string;
  title?: ReactNode;
  description?: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <Reveal>
        <div className="sheet-label">
          <span className="num">{number}</span>
          <span>{name}</span>
          <span className="rule" />
          {field && <span className="hidden sm:block">{field}</span>}
        </div>
      </Reveal>

      {title && (
        <Reveal delay={0.06}>
          <h2 className="display h2 mb-5">{title}</h2>
        </Reveal>
      )}

      {description && (
        <Reveal delay={0.12}>
          <p className="text-[15px] leading-relaxed text-soft max-w-[58ch]">
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
