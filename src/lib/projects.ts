export const featuredProjects = [
  {
    id: "salary-management",
    emoji: "💼",
    title: "Salary Management System",
    shortDesc:
      "Production-quality HR platform managing 10,000+ employees with compensation analytics — Rails 7 API + Next.js 16.",
    description:
      "A production-quality, full-stack salary management platform built for HR managers. Handles 10,000+ employee records with full CRUD, pagination, search, and 5 deep analytical views: salary by country, by job title, department headcount, tenure distribution, and top-paying roles.",
    problem:
      "HR teams drowning in manual payroll data — no visibility into compensation trends, headcount distribution, or salary equity across departments and countries",
    solution:
      "Decoupled Rails 7 API + Next.js 16 frontend with 5 real-time analytical dashboards, paginated employee CRUD, full test coverage, and a seed system that generates 10,000 employees in ~2.4s",
    impact:
      "Manages 10,000+ employees · Sub-200ms queries via indexed PostgreSQL · 13+ RSpec model tests · Production-ready architecture",
    tags: ["Rails 7", "Ruby", "Next.js 16", "TypeScript", "PostgreSQL", "TanStack Query", "Recharts", "RSpec"],
    github: "https://github.com/Pranshu-jain/salary-management",
    demo: "https://salary-management-ui-lake.vercel.app",
    color: "#7c3aed",
    accentColor: "rgba(124,58,237,0.08)",
    featured: true,
  },
  {
    id: "ecommerce-platform",
    emoji: "🛒",
    title: "E-Commerce Platform",
    shortDesc:
      "Full-stack storefront with Stripe payments, JWT auth, product catalog, cart, and checkout — Next.js + SQLite.",
    description:
      "A complete, self-contained e-commerce platform built with Next.js, TypeScript, and SQLite. Features full product management, cart state, Stripe-powered checkout, JWT authentication, and image optimization — no third-party commerce layer needed.",
    problem:
      "Most e-commerce starters require heavy third-party services or bloated frameworks — making customization slow and deployment complex",
    solution:
      "Fully custom full-stack Next.js app with SQLite (via better-sqlite3), server-side JWT auth, Stripe integration, and image processing — all in one deployable codebase",
    impact:
      "Complete cart-to-checkout flow · Stripe payment processing · JWT auth with bcrypt · Zero external CMS dependencies",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "SQLite", "Stripe", "JWT", "bcryptjs", "Sharp"],
    github: "https://github.com/Pranshu-jain/ecommerce-platform",
    demo: "https://ecommerce-platform-phi-five.vercel.app",
    color: "#00d4ff",
    accentColor: "rgba(0,212,255,0.08)",
    featured: true,
  },
  {
    id: "iterable-integration",
    emoji: "📡",
    title: "Iterable Marketing Integration",
    shortDesc:
      "Ruby/Rails service that syncs user lifecycle events with Iterable for automated marketing workflows.",
    description:
      "A Ruby on Rails integration service that bridges application events with Iterable — a growth marketing platform. Enables real-time user event tracking, automated email/push lifecycle triggers, and list management through Iterable's REST API.",
    problem:
      "Product teams unable to trigger timely, personalised marketing messages based on real user behaviour inside the application",
    solution:
      "Ruby service layer that intercepts key user lifecycle events and pushes them to Iterable via REST, enabling automated campaigns, onboarding sequences, and re-engagement flows",
    impact:
      "Automated user lifecycle triggers · Real-time event sync · Reusable service pattern for future integrations",
    tags: ["Ruby", "Rails", "REST API", "Iterable", "Marketing Automation", "Webhooks"],
    github: "https://github.com/Pranshu-jain/IterableIntegration",
    demo: "https://github.com/Pranshu-jain/IterableIntegration",
    color: "#ff6b35",
    accentColor: "rgba(255,107,53,0.08)",
    featured: true,
  },
];

export const allProjects = [
  ...featuredProjects,
  {
    id: "brain",
    emoji: "🧠",
    title: "Brain — Courses Platform",
    shortDesc: "An online courses site for structured learning.",
    description: "A courses website for hosting and delivering structured learning content.",
    problem: "No lightweight course hosting solution for small creators",
    solution: "Simple courses platform with structured content delivery",
    impact: "Functional courses site deployed",
    tags: ["Web", "Courses", "Content"],
    github: "https://github.com/Pranshu-jain/Brain",
    demo: "https://github.com/Pranshu-jain/Brain",
    color: "#22c55e",
    accentColor: "rgba(34,197,94,0.08)",
    featured: false,
  },
];

export const blogPosts = [
  {
    slug: "ship-mvp-days-not-months",
    title: "How I Ship MVPs in Days Using AI",
    excerpt:
      "The exact workflow I use to go from idea to deployed product in under 2 weeks — using AI at every step of the stack.",
    date: "2024-12-01",
    readTime: "5 min",
    tags: ["AI", "Productivity", "Startup"],
    featured: true,
  },
  {
    slug: "rails-nextjs-decoupled-architecture",
    title: "Rails API + Next.js: The Decoupled Stack I Keep Reaching For",
    excerpt:
      "Why I keep building with Rails on the backend and Next.js on the frontend — and the exact pattern that makes it work at scale.",
    date: "2024-11-15",
    readTime: "7 min",
    tags: ["Rails", "Next.js", "Architecture"],
    featured: true,
  },
  {
    slug: "startup-tech-stack-2025",
    title: "The Startup Tech Stack I Use in 2025",
    excerpt:
      "Next.js, Rails, PostgreSQL, Stripe, Resend — the exact stack that lets me move fast without accumulating tech debt.",
    date: "2024-11-01",
    readTime: "6 min",
    tags: ["Startup", "Tech Stack", "Next.js"],
    featured: false,
  },
];
