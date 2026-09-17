// TODO(confirm): final LinkedIn URL. Change it here only — the href and the
// visible label everywhere on the site are both derived from this constant.
const LINKEDIN_URL = "https://www.linkedin.com/in/pranshu-jain-2a492114a/";

export const siteConfig = {
  name: "Pranshu Jain",
  /** Canonical deployed origin — used for metadataBase and JSON-LD. */
  siteUrl: "https://portfolio-six-theta-gpq4no7ad9.vercel.app",
  // TODO(confirm): exact current job title at Bandgi Technologies. Used for
  // the JSON-LD Person `jobTitle`.
  jobTitle: "Software Engineer",
  experience: "4.5 years",
  location: "Based in India (IST) · 4+ hours overlap with UK/EU",
  proofLine:
    "4.5 years shipping Rails apps, data pipelines, and AI agents to production.",
  role: "Forward Deployed Engineer",
  tagline: "I deploy into your stack and ship until the metric moves.",
  description:
    "Forward Deployed Engineer. I embed with your team, turn an ambiguous problem into a deployed system running on your real data, and stay until it's adopted.",
  github: "Pranshu-jain",
  email: "jpranshu36@gmail.com",
  twitter: "https://twitter.com/pranshu_builds",
  linkedin: LINKEDIN_URL,
  /** Visible label, e.g. "/in/pranshu-jain-2a492114a" — derived, never typed. */
  linkedinLabel: new URL(LINKEDIN_URL).pathname.replace(/\/$/, ""),
  calendly: "https://calendly.com/jpranshu36",

  /** Rotating hero subtitles — each one a claim the page then backs up. */
  hero: [
    "Ambiguous problem → deployed system.",
    "Your stack. Your data. Your conventions.",
    "A live slice inside the first week.",
    "Shipped isn't done. Adopted is done.",
  ],

  // Headline proof numbers live in `lib/fde.ts` as `proofMetrics`, where they
  // are derived from the builds in `lib/projects.ts`. Not duplicated here.

  services: [
    {
      icon: "🛬",
      title: "Land & Scope",
      description:
        "On-site discovery that ends in a one-page spec, a constraint map, and an agreed success metric",
      color: "#00d4ff",
    },
    {
      icon: "🚀",
      title: "Deploy a Slice",
      description:
        "A thin end-to-end path live in your stack within the first week, running on your real data",
      color: "#7c3aed",
    },
    {
      icon: "🔌",
      title: "Systems Integration",
      description:
        "Legacy APIs, third-party services, and the AI layer wired together with versioned contracts",
      color: "#22c55e",
    },
    {
      icon: "🛡️",
      title: "Harden & Hand Off",
      description:
        "Tests, observability, access control, and the runbook that lets your team own it after I leave",
      color: "#ff6b35",
    },
  ],

  navLinks: [
    { href: "/#dimensions", label: "Dimensions" },
    { href: "/#builds", label: "Builds" },
    { href: "/#loop", label: "The Loop" },
    { href: "/about", label: "About" },
    { href: "/blog", label: "Field Notes" },
  ],

  // Used by the /admin demand panel to flag which in-demand skills overlap
  // with what Pranshu already offers (lowercased match against job-board tags).
  skills: [
    "react",
    "next",
    "nextjs",
    "typescript",
    "javascript",
    "node",
    "nodejs",
    "rails",
    "ruby",
    "python",
    "pyspark",
    "postgres",
    "postgresql",
    "sql",
    "ai",
    "llm",
    "tailwind",
    "stripe",
    "forward deployed",
    "solutions engineer",
    "integration",
  ],
};
