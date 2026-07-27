import Link from "next/link";
import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { siteConfig } from "@/lib/config";

export default function Footer() {
  return (
    <footer className="border-t border-[rgba(255,255,255,0.04)] pt-12 pb-8 mt-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-8">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg btn-gradient flex items-center justify-center text-white font-black text-sm shine">
              P
            </div>
            <div>
              <div className="text-sm font-bold text-white">Pranshu</div>
              <div className="mono text-[9px] uppercase tracking-[1.5px] text-[#334155]">
                Forward Deployed Engineer
              </div>
            </div>
          </Link>

          {/* Nav */}
          <nav className="flex flex-wrap justify-center gap-x-8 gap-y-2">
            {[
              ["Dimensions", "/#dimensions"],
              ["Deployments", "/#deployments"],
              ["The Loop", "/#loop"],
              ["About", "/about"],
              ["Field Notes", "/blog"],
              ["Contact", "/contact"],
            ].map(([label, href]) => (
              <Link
                key={label}
                href={href}
                className="text-xs text-[#334155] hover:text-white transition-colors"
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Social */}
          <div className="flex gap-3">
            {[
              { icon: GithubIcon,   href: `https://github.com/${siteConfig.github}`, label: "GitHub" },
              { icon: LinkedinIcon, href: siteConfig.linkedin, label: "LinkedIn" },
              { icon: Mail,         href: `mailto:${siteConfig.email}`, label: "Email" },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-9 h-9 rounded-full glass flex items-center justify-center text-[#334155] hover:text-[#00d4ff] hover:border-[rgba(0,212,255,0.2)] transition-all"
              >
                <Icon size={14} />
              </a>
            ))}
          </div>
        </div>

        <div className="border-t border-[rgba(255,255,255,0.03)] pt-6 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-[11px] text-[#1e293b]">
            © {new Date().getFullYear()} Pranshu — Built with Next.js, Tailwind CSS & framer-motion
          </p>
          <p className="text-[11px] text-[#1e293b]">
            jpranshu36@gmail.com
          </p>
        </div>
      </div>
    </footer>
  );
}
