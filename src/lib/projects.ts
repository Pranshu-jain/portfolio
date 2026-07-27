/**
 * Deployments, told the way an FDE reports them: the context I landed in, the
 * constraint that shaped the design, what actually shipped, and the outcome
 * with a number attached. `problem`/`solution`/`impact` are kept for the
 * shorter surfaces that only need one line each.
 */
export type Deployment = {
  id: string;
  emoji: string;
  title: string;
  shortDesc: string;
  description: string;
  problem: string;
  solution: string;
  impact: string;
  /** Who I was deployed into and what state it was in. */
  context: string;
  /** My scope of ownership on the engagement. */
  role: string;
  /** The binding constraint — the thing that made the obvious answer wrong. */
  constraint: string;
  /** Concrete artifacts left behind. */
  shipped: string[];
  /** Measurable result. `value` is rendered as the headline figure. */
  outcome: { metric: string; value: string }[];
  /** Systems this deployment had to plug into. */
  surfaces: string[];
  tags: string[];
  github: string;
  demo: string;
  color: string;
  accentColor: string;
  featured: boolean;
};

export const featuredProjects: Deployment[] = [
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
    context:
      "An HR function running compensation for 10,000+ people out of spreadsheets — no view of salary equity, headcount distribution, or tenure across departments and countries.",
    role: "Sole engineer — discovery, architecture, build, deploy, handoff",
    constraint:
      "Compensation data is sensitive and high-volume. The analytics had to be fast enough to explore live in a leadership meeting, and every rule that touched pay had to be testable — so caching tricks and denormalised shortcuts were off the table.",
    shipped: [
      "Decoupled Rails 7 JSON API with a versioned contract, consumed by a Next.js 16 frontend",
      "Five analytical views: salary by country, by job title, department headcount, tenure distribution, top-paying roles",
      "Paginated employee CRUD with search across the full 10,000-record set",
      "Indexed PostgreSQL schema plus a seed system that reproduces production scale in ~2.4s",
      "RSpec coverage on the model rules that must never be bypassed",
    ],
    outcome: [
      { metric: "Records in production", value: "10,000+" },
      { metric: "Query latency", value: "<200ms" },
      { metric: "Seed to full scale", value: "~2.4s" },
    ],
    surfaces: ["Rails 7 API", "PostgreSQL", "Next.js 16", "TanStack Query", "RSpec"],
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
    context:
      "A storefront blocked on commerce platforms — every customisation meant fighting a hosted layer, and every deploy meant coordinating three vendors.",
    role: "Sole engineer — full stack, payments, deploy",
    constraint:
      "No external CMS and no hosted commerce layer: the whole thing had to deploy as one self-contained app a small team could operate. That ruled out the usual escape hatches, while the money path still had to be correct on the first try.",
    shipped: [
      "Full-stack Next.js storefront: catalog, cart state, checkout, order flow",
      "Stripe-powered payments with server-side verification",
      "JWT authentication with bcrypt hashing, no third-party identity provider",
      "SQLite via better-sqlite3 — single-file datastore, zero external services",
      "Sharp-based image pipeline so product media stays fast without a CDN contract",
    ],
    outcome: [
      { metric: "External services required", value: "0" },
      { metric: "Cart-to-checkout", value: "complete" },
      { metric: "Deploy surface", value: "1 app" },
    ],
    surfaces: ["Stripe", "SQLite", "JWT", "Sharp", "Vercel"],
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
    context:
      "A growth team running campaigns blind: Iterable had no idea what users were doing inside the product, so onboarding and re-engagement fired on calendar time instead of behaviour.",
    role: "Integration engineer — inside an existing production Rails app",
    constraint:
      "This was someone else's live codebase. The integration could not change application behaviour, could not block a user request, and could not take the app down if Iterable was slow or unavailable. Fail-open was the hard requirement.",
    shipped: [
      "Ruby service layer intercepting key user lifecycle events at well-defined seams",
      "REST push to Iterable with event contracts versioned so campaigns don't silently break",
      "List and subscriber management wired to in-app state",
      "A reusable integration pattern the resident team applied to later vendors",
    ],
    outcome: [
      { metric: "Campaign triggers", value: "behaviour-driven" },
      { metric: "Event sync", value: "real-time" },
      { metric: "App behaviour changed", value: "none" },
    ],
    surfaces: ["Iterable REST API", "Rails", "Webhooks", "Lifecycle events"],
    tags: ["Ruby", "Rails", "REST API", "Iterable", "Marketing Automation", "Webhooks"],
    github: "https://github.com/Pranshu-jain/IterableIntegration",
    demo: "https://github.com/Pranshu-jain/IterableIntegration",
    color: "#ff6b35",
    accentColor: "rgba(255,107,53,0.08)",
    featured: true,
  },
];

export const allProjects: Deployment[] = [
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
    context:
      "Small creators with course material and nowhere lightweight to host it — every option was either an enterprise LMS or a raw file dump.",
    role: "Sole engineer — build and deploy",
    constraint:
      "Had to stay small enough that a non-technical creator could run it without a platform contract or a maintenance budget.",
    shipped: [
      "Structured course and lesson content model",
      "Delivery site deployed and publicly reachable",
    ],
    outcome: [{ metric: "Hosting overhead", value: "minimal" }],
    surfaces: ["Web", "Static hosting"],
    tags: ["Web", "Courses", "Content"],
    github: "https://github.com/Pranshu-jain/Brain",
    demo: "https://github.com/Pranshu-jain/Brain",
    color: "#22c55e",
    accentColor: "rgba(34,197,94,0.08)",
    featured: false,
  },
];

export type BlogBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "list"; items: string[] };

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
  featured: boolean;
  content: BlogBlock[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "ship-mvp-days-not-months",
    title: "How I Ship MVPs in Days Using AI",
    excerpt:
      "The exact workflow I use to go from idea to deployed product in under 2 weeks — using AI at every step of the stack.",
    date: "2024-12-01",
    readTime: "5 min",
    tags: ["AI", "Productivity", "Startup"],
    featured: true,
    content: [
      {
        type: "paragraph",
        text: "Most teams treat an MVP like a small version of the real product. That's the trap. An MVP is a question — \"will anyone care about this?\" — and the only job of the build is to get you to the answer as fast as possible. With AI as a multiplier at every layer, I get there in days, not months.",
      },
      {
        type: "paragraph",
        text: "Here's the actual workflow I run, start to deployed product.",
      },
      { type: "heading", text: "1. Compress the idea into one sentence" },
      {
        type: "paragraph",
        text: "Before any code, I force the idea down to a single sentence: who it's for, what it does, and the one outcome it creates. If I can't write that sentence, the product isn't ready to build — it's ready to think about. This is the cheapest place to cut scope, so I cut hard here.",
      },
      { type: "heading", text: "2. Spec with AI, not in my head" },
      {
        type: "paragraph",
        text: "I use AI to turn that sentence into a tight spec: the core user flow, the data model, and the three screens that matter. The point isn't a perfect document — it's to surface the decisions I'd otherwise discover halfway through building, when they're expensive to change.",
      },
      {
        type: "list",
        items: [
          "One primary user flow, written as steps a real person takes",
          "A data model with just the tables the flow needs — nothing speculative",
          "The smallest set of screens that lets someone complete the flow",
        ],
      },
      { type: "heading", text: "3. Scaffold the boring 80%" },
      {
        type: "paragraph",
        text: "Auth, CRUD, forms, validation, API routes, the layout shell — this is solved-problem work, and AI writes it faster than I can type. I let it generate the scaffolding, then I review every line. AI is a fast junior engineer: brilliant at volume, needs supervision on judgment.",
      },
      { type: "heading", text: "4. Spend my time on the 20% that's actually the product" },
      {
        type: "paragraph",
        text: "The differentiated part — the thing the MVP exists to test — is where I go slow and hands-on. That's the logic no tutorial covers and no model has seen. Saving days on the boring 80% is what buys me the focus to get this part right.",
      },
      { type: "heading", text: "5. Ship to a real URL on day one" },
      {
        type: "paragraph",
        text: "I deploy before the product is \"done.\" A live URL changes how you think — it turns abstract debate into concrete feedback. Push to Vercel, wire up the database, and every commit after that is a real, shareable build. Nothing reveals a bad assumption faster than putting it in front of someone.",
      },
      { type: "heading", text: "The mindset that makes it work" },
      {
        type: "paragraph",
        text: "Speed isn't about cutting corners — it's about cutting scope. AI lets me build the complete version of a small idea instead of a half-built version of a big one. Ship the question, get the answer, then decide what to build for real.",
      },
    ],
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
    content: [
      {
        type: "paragraph",
        text: "I've built products as full-stack Rails monoliths, as all-in-one Next.js apps, and as a decoupled Rails API with a Next.js frontend. For most of the products I ship, the decoupled stack wins — and not for the reasons people usually give.",
      },
      { type: "heading", text: "Each tool does what it's actually good at" },
      {
        type: "paragraph",
        text: "Rails is still the fastest way I know to model a domain, enforce business rules, and get a real database schema with migrations, validations, and tests. Next.js is the best frontend experience I've used: server components, file-based routing, image optimization, and a deploy story that's hard to beat. Forcing one to do the other's job is where projects get slow.",
      },
      {
        type: "list",
        items: [
          "Rails owns the data, the business logic, and the rules that must never be bypassed",
          "Next.js owns the rendering, the routing, and the experience the user actually touches",
          "A clean JSON contract is the only thing between them",
        ],
      },
      { type: "heading", text: "The contract is the architecture" },
      {
        type: "paragraph",
        text: "The whole pattern lives or dies on the API contract. Rails exposes a versioned JSON API. The frontend treats it like any third-party service — typed responses, explicit error handling, no reaching into internals. Get this boundary right and the two sides can evolve independently. Get it wrong and you've just built a distributed monolith with extra network calls.",
      },
      { type: "heading", text: "Why decoupling earns its keep" },
      {
        type: "paragraph",
        text: "The real payoff shows up after the first version ships. The frontend can be redesigned end to end without touching business logic. The backend can change how data is stored without breaking a single screen. You can put a mobile app or a second client on the same API for free. And each side deploys on its own schedule.",
      },
      {
        type: "paragraph",
        text: "On the salary management platform I built this way, the Rails API handled 10,000+ employee records with indexed sub-200ms queries while the Next.js frontend rendered five analytical dashboards — and I could tune either side in isolation without fear of breaking the other.",
      },
      { type: "heading", text: "The honest tradeoffs" },
      {
        type: "paragraph",
        text: "This isn't free. You run two codebases, two deploys, and you handle CORS and auth across a boundary. For a tiny CRUD app, a Rails monolith or a single Next.js app is the right call — don't add a network hop you don't need. The decoupled stack pays off when the product has real domain logic on one side and a rich, evolving interface on the other.",
      },
      { type: "heading", text: "When I reach for it" },
      {
        type: "paragraph",
        text: "If the product has meaningful business rules, more than one kind of client on the horizon, or a UI that will be iterated on hard, I start decoupled. The clean separation is the thing that lets me — or a team — keep moving fast a year in, which is exactly when most architectures start to fight back.",
      },
    ],
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
    content: [
      {
        type: "paragraph",
        text: "The best startup stack is the one that lets you move fast today without writing checks your future self has to cash. After shipping a lot of products, I've converged on a default stack I reach for unless a project gives me a strong reason not to. Boring, proven, and fast — in that order.",
      },
      { type: "heading", text: "Frontend: Next.js + TypeScript + Tailwind" },
      {
        type: "paragraph",
        text: "Next.js is my default frontend. Server components, file-based routing, and first-class deploys mean I spend time on the product, not the plumbing. TypeScript catches the class of bugs that otherwise show up in production, and Tailwind lets me build a consistent design without a separate CSS architecture to maintain.",
      },
      { type: "heading", text: "Backend: Rails or Next API routes" },
      {
        type: "paragraph",
        text: "If the product has real domain logic, I reach for a Rails API — nothing models a business domain faster. If it's lighter, Next.js API routes keep everything in one codebase. The decision rule is simple: how much business logic lives on the server? A lot means Rails. A little means Next.",
      },
      { type: "heading", text: "Database: PostgreSQL" },
      {
        type: "paragraph",
        text: "PostgreSQL, almost always. It scales further than you think, the tooling is excellent, and you won't outgrow it before you find product-market fit. For small self-contained apps, SQLite is a genuinely good answer — I shipped a full Stripe-powered e-commerce platform on SQLite with zero external services.",
      },
      { type: "heading", text: "The supporting cast" },
      {
        type: "list",
        items: [
          "Stripe for payments — never build your own billing",
          "Resend for transactional email — clean API, no legacy baggage",
          "Vercel for frontend hosting and Railway for backend services",
          "An AI layer (LLMs, agents, automation) wired in wherever it removes real work",
        ],
      },
      { type: "heading", text: "What I deliberately avoid" },
      {
        type: "paragraph",
        text: "Microservices before you have a product. A custom auth system when a proven library exists. A bespoke component framework. The newest tool that's still finding its bugs. Premature optimization of any kind. Each of these feels productive and is actually debt — complexity you pay interest on every sprint.",
      },
      { type: "heading", text: "The principle underneath the list" },
      {
        type: "paragraph",
        text: "Pick tools that are boring enough to be reliable and modern enough to be fast. Spend your novelty budget on the product, not the stack. The stack is supposed to disappear so you can focus on the only thing that matters — shipping something people want.",
      },
    ],
  },
];
