import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import CustomCursor from "@/components/CustomCursor";
import ChatWidget from "@/components/ChatWidget";
import { siteConfig } from "@/lib/config";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const SITE_TITLE = `${siteConfig.name} — ${siteConfig.role}`;

/** schema.org Person — lets crawlers tie this site to the right profiles. */
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteConfig.name,
  jobTitle: siteConfig.jobTitle,
  url: siteConfig.siteUrl,
  email: `mailto:${siteConfig.email}`,
  sameAs: [`https://github.com/${siteConfig.github}`, siteConfig.linkedin],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  // Child pages set a short title ("About"); the template appends the name.
  title: { default: SITE_TITLE, template: `%s — ${siteConfig.name}` },
  description:
    "Forward Deployed Engineer. I embed with your team, turn an ambiguous problem into a deployed system running on your real data, and stay until it's adopted.",
  keywords: [
    "forward deployed engineer",
    "FDE",
    "solutions engineer",
    "embedded engineer",
    "systems integration",
    "AI deployment",
    "LLM integration",
    "Next.js developer",
    "Rails API",
    "customer-facing engineer",
  ],
  authors: [
    { name: siteConfig.name, url: `https://github.com/${siteConfig.github}` },
  ],
  openGraph: {
    title: SITE_TITLE,
    siteName: siteConfig.name,
    description:
      "I deploy into your stack and ship until the metric moves. Ambiguous problem → live system on your real data.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: "I deploy into your stack and ship until the metric moves.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <body className="h-full bg-[#fafaff] text-[#0f172a] antialiased overflow-x-hidden">
        {/* Drifting colour wash behind everything — the thing that keeps a
            light page from reading as blank paper. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <div className="mesh-bg" aria-hidden="true" />
        <div className="noise-overlay" aria-hidden="true" />
        <CustomCursor />
        <Navigation />
        <main>{children}</main>
        <ChatWidget />
      </body>
    </html>
  );
}
