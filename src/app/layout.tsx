import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import CustomCursor from "@/components/CustomCursor";
import ChatWidget from "@/components/ChatWidget";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Pranshu — Forward Deployed Engineer",
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
    { name: "Pranshu", url: "https://github.com/Pranshu-jain" },
  ],
  openGraph: {
    title: "Pranshu — Forward Deployed Engineer",
    description:
      "I deploy into your stack and ship until the metric moves. Ambiguous problem → live system on your real data.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pranshu — Forward Deployed Engineer",
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
      <body className="h-full bg-[#050505] text-[#f8fafc] antialiased overflow-x-hidden">
        <div className="noise-overlay" aria-hidden="true" />
        <CustomCursor />
        <Navigation />
        <main>{children}</main>
        <ChatWidget />
      </body>
    </html>
  );
}
