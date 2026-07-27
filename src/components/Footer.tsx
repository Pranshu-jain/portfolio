import Link from "next/link";
import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { siteConfig } from "@/lib/config";

/** The sheet-set colophon: who drew it, what with, and how to reach them. */
export default function Footer() {
  return (
    <footer className="border-t border-graphite">
      <div className="page py-9">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-8">
          <div>
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <span className="w-7 h-7 border border-graphite flex items-center justify-center font-display font-extrabold text-[13px] text-ink">
                P
              </span>
              <span className="flex flex-col leading-none">
                <span className="display-sm text-[13px]">Pranshu Jain</span>
                <span className="mono !text-[8px] !tracking-[0.12em] mt-0.5">
                  {siteConfig.role}
                </span>
              </span>
            </Link>
            <div className="flex gap-2">
              {[
                { icon: GithubIcon, href: `https://github.com/${siteConfig.github}`, label: "GitHub" },
                { icon: LinkedinIcon, href: siteConfig.linkedin, label: "LinkedIn" },
                { icon: Mail, href: `mailto:${siteConfig.email}`, label: "Email" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-8 h-8 border border-graphite flex items-center justify-center hover:bg-graphite hover:text-stock transition-colors"
                >
                  <Icon size={13} />
                </a>
              ))}
            </div>
          </div>

          <nav className="flex flex-wrap gap-x-8 gap-y-2">
            {[
              ["Schedule", "/#dimensions"],
              ["Conditions", "/#conditions"],
              ["Sequence", "/#loop"],
              ["About", "/about"],
              ["Field notes", "/blog"],
              ["Contact", "/contact"],
            ].map(([label, href]) => (
              <Link
                key={label}
                href={href}
                className="font-mono text-[10px] tracking-[0.12em] uppercase text-soft hover:text-ink transition-colors"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="border-t border-line mt-8 pt-5 flex flex-col sm:flex-row justify-between gap-2"
             style={{ borderColor: "var(--line-soft)" }}>
          <p className="mono !text-[8.5px] !tracking-[0.1em] m-0">
            Drawn by P. Jain · Next.js, Tailwind, framer-motion
          </p>
          <p className="mono !text-[8.5px] !tracking-[0.1em] m-0">
            Rev {new Date().getFullYear()} · {siteConfig.email}
          </p>
        </div>
      </div>
    </footer>
  );
}
