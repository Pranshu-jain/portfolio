"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { Menu, X } from "lucide-react";
import { siteConfig } from "@/lib/config";

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 26,
    restDelta: 0.001,
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  if (pathname?.startsWith("/admin")) return null;

  return (
    <>
      <nav
        className={`fixed top-[var(--sheet-inset)] left-[var(--sheet-inset)] right-[var(--sheet-inset)] z-[62] transition-colors duration-300 ${
          scrolled ? "bg-stock/92 backdrop-blur-[2px] border-b border-graphite" : ""
        }`}
      >
        <div className="max-w-[var(--page)] mx-auto px-[var(--gutter)] py-3.5 flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2.5 group shrink-0">
            <span className="w-7 h-7 border border-graphite flex items-center justify-center font-display font-extrabold text-[13px] text-ink group-hover:bg-graphite group-hover:text-stock transition-colors">
              P
            </span>
            <span className="hidden sm:flex flex-col leading-none">
              <span className="display-sm text-[13px]">Pranshu</span>
              <span className="mono !text-[8px] !tracking-[0.12em] mt-0.5">
                {siteConfig.role}
              </span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {siteConfig.navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 font-mono text-[10px] tracking-[0.12em] uppercase text-soft hover:text-ink transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-2.5">
            <Link href="/contact" className="btn btn-sm">
              Contact
            </Link>
          </div>

          <button
            className="md:hidden w-9 h-9 border border-graphite flex items-center justify-center"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={15} /> : <Menu size={15} />}
          </button>
        </div>

        <motion.div
          aria-hidden="true"
          className="absolute bottom-0 left-0 right-0 h-px origin-left bg-blue"
          style={{ scaleX: progress }}
        />
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
            className="fixed top-[calc(var(--sheet-inset)+58px)] left-[var(--sheet-inset)] right-[var(--sheet-inset)] z-[61] bg-stock border-b border-graphite px-[var(--gutter)] py-5 flex flex-col gap-1"
          >
            {siteConfig.navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="py-2.5 font-mono text-[11px] tracking-[0.12em] uppercase text-graphite border-b border-line last:border-b-0"
                style={{ borderColor: "var(--line-soft)" }}
              >
                {link.label}
              </Link>
            ))}
            <Link href="/contact" className="btn btn-sm justify-center mt-3">
              Contact
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
