"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import { siteConfig } from "@/lib/config";

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  // Reading-position bar pinned to the bottom edge of the nav.
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 26,
    restDelta: 0.001,
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Marketing nav is irrelevant on the private /admin dashboard.
  if (pathname?.startsWith("/admin")) return null;

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.25, 0.4, 0.25, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "glass" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg btn-gradient flex items-center justify-center text-[#0f172a] font-black text-sm shine">
              P
            </div>
            <span className="hidden sm:flex flex-col leading-none">
              <span className="text-sm font-semibold text-[#0f172a]/80 group-hover:text-[#0f172a] transition-colors">
                Pranshu
              </span>
              <span className="mono text-[8px] uppercase tracking-[1.5px] text-[#64748b] mt-0.5">
                Forward Deployed Engineer
              </span>
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {siteConfig.navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative px-4 py-2 text-sm text-[#475569] hover:text-[#0f172a] transition-colors duration-200 rounded-lg hover:bg-white/[0.04]"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/contact"
              className="px-4 py-2 text-sm rounded-full border border-[rgba(15,23,42,0.10)] text-[#475569] hover:text-[#0f172a] hover:border-[rgba(14,165,233,0.25)] transition-all duration-200"
            >
              Contact
            </Link>
            <Link
              href="/build-with-me"
              className="flex items-center gap-2 px-5 py-2 text-sm rounded-full btn-gradient text-[#0f172a] font-medium shine"
            >
              Deploy Me <ArrowRight size={13} />
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg border border-[rgba(15,23,42,0.10)] text-[#475569] hover:text-[#0f172a] hover:border-[rgba(14,165,233,0.2)] transition-all"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait" initial={false}>
              {mobileOpen ? (
                <motion.span
                  key="x"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <X size={16} />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <Menu size={16} />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>

        {/* Reading progress */}
        <motion.div
          aria-hidden="true"
          className="absolute bottom-0 left-0 right-0 h-px origin-left"
          style={{
            scaleX: progress,
            background:
              "linear-gradient(90deg, #0284c7 0%, #7c3aed 50%, #f97316 100%)",
          }}
        />
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[69px] left-0 right-0 z-40 glass border-b border-[rgba(15,23,42,0.08)] px-6 py-6 flex flex-col gap-3"
          >
            {siteConfig.navLinks.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
              >
                <Link
                  href={link.href}
                  className="block py-2 text-[#475569] hover:text-[#0f172a] transition-colors text-sm"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.25 }}
              className="mt-2"
            >
              <Link
                href="/build-with-me"
                className="flex items-center justify-center gap-2 py-3 rounded-xl btn-gradient text-[#0f172a] font-semibold text-sm shine"
              >
                Deploy Me <ArrowRight size={14} />
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
