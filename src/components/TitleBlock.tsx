"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

/**
 * The drawing's title block, pinned to the sheet edge. It tracks which
 * sheet you're reading and names it — the same job it does on a real
 * drawing set, which is why it earns a fixed position.
 *
 * Only shown where there's a clear lane for it (the page is capped at
 * 1080px, so ~1300px of viewport is the threshold before it would sit
 * on top of body text).
 */
export default function TitleBlock() {
  const pathname = usePathname();
  // total: 0 means "not measured yet", which keeps the block hidden until
  // the sheets on the current route are counted.
  const [sheet, setSheet] = useState({ index: 0, total: 0, name: "" });

  useEffect(() => {
    const sheets = Array.from(
      document.querySelectorAll<HTMLElement>("[data-sheet]"),
    );

    // Deferred a frame so the initial measurement isn't a synchronous
    // setState inside the effect body. Also resets the block when a route
    // has no sheets of its own.
    const frame = requestAnimationFrame(() =>
      setSheet(
        sheets.length
          ? {
              index: 1,
              total: sheets.length,
              name: sheets[0].dataset.sheet ?? "",
            }
          : { index: 0, total: 0, name: "" },
      ),
    );

    if (!sheets.length) return () => cancelAnimationFrame(frame);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const index = sheets.indexOf(entry.target as HTMLElement);
          if (index < 0) return;
          setSheet({
            index: index + 1,
            total: sheets.length,
            name: (entry.target as HTMLElement).dataset.sheet ?? "",
          });
        });
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );

    sheets.forEach((s) => observer.observe(s));
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [pathname]);

  if (pathname?.startsWith("/admin") || !sheet.total) return null;

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <aside
      aria-hidden="true"
      /* Bottom-left: a drawing would put this bottom-right, but the chat
         launcher owns that corner and a collision beats convention. */
      className="hidden min-[1300px]:grid fixed left-[calc(var(--sheet-inset)+14px)] bottom-[calc(var(--sheet-inset)+14px)] z-[61] grid-cols-[auto_auto] bg-stock border border-graphite font-mono text-[8.5px] tracking-[0.08em] uppercase"
    >
      <span className="px-2 py-1 border-r border-graphite text-soft">Sheet</span>
      <span className="px-2.5 py-1 font-semibold text-ink tabular-nums">
        {pad(sheet.index)} / {pad(sheet.total)}
      </span>
      <span className="px-2 py-1 border-r border-t border-graphite text-soft">
        Drawing
      </span>
      <span className="px-2.5 py-1 border-t border-graphite font-semibold text-ink">
        {sheet.name}
      </span>
      <span className="px-2 py-1 border-r border-t border-graphite text-soft">
        Surveyor
      </span>
      <span className="px-2.5 py-1 border-t border-graphite font-semibold text-ink">
        P. Jain — FDE
      </span>
    </aside>
  );
}
