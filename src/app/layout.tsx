import type { Metadata } from "next";
import { Archivo, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import SheetFrame from "@/components/SheetFrame";
import TitleBlock from "@/components/TitleBlock";
import ChatWidget from "@/components/ChatWidget";

/**
 * Archivo carries the width axis, so display type can be set expanded —
 * it reads machined rather than editorial, which is the note the whole
 * site plays. Plex was drawn for an engineering company and brings a
 * true mono sibling, which matters when half the page is annotation.
 */
const display = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-display",
  display: "swap",
});

const body = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Pranshu — Forward Deployed Engineer",
  description:
    "Forward Deployed Engineer. I work inside the constraint: your systems, your data, and the rules that can't move. Deployed and adopted, not demoed.",
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
  authors: [{ name: "Pranshu", url: "https://github.com/Pranshu-jain" }],
  openGraph: {
    title: "Pranshu — Forward Deployed Engineer",
    description:
      "I work inside the constraint: your systems, your data, and the rules that can't move.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pranshu — Forward Deployed Engineer",
    description: "I work inside the constraint.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${mono.variable}`}
    >
      <body className="antialiased">
        <SheetFrame />
        <Navigation />
        <main>{children}</main>
        <TitleBlock />
        <ChatWidget />
      </body>
    </html>
  );
}
