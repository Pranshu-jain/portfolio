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
  title: "Pranshu — AI-First Developer & Startup Partner",
  description:
    "I build products in days, not months. AI-first developer, rapid execution engineer, and startup growth partner. Turn your idea into a shipped product fast.",
  keywords: [
    "AI developer",
    "startup partner",
    "Next.js developer",
    "full stack engineer",
    "automation specialist",
    "MVP development",
    "AI integrations",
    "rapid prototyping",
  ],
  authors: [{ name: "Pranshu", url: "https://github.com/pranshu007" }],
  openGraph: {
    title: "Pranshu — AI-First Developer & Startup Partner",
    description:
      "I build products in days, not months. AI-first developer & startup growth partner.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pranshu — AI-First Developer & Startup Partner",
    description: "I build products in days, not months.",
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
