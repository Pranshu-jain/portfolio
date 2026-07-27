"use client";

import { usePathname } from "next/navigation";

/**
 * The drawing sheet's border. Suppressed on /admin, which is back-of-house
 * tooling and keeps its own dark treatment — framing it as a survey sheet
 * would claim a coherence that isn't there.
 */
export default function SheetFrame() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;
  return <div className="sheet-frame" aria-hidden="true" />;
}
