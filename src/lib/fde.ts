/**
 * The Forward Deployed Engineer layer.
 *
 * Everything a visitor needs to conclude "this person is an FDE" lives here:
 * the competency dimensions (rendered as the radar), the engagement loop, the
 * integration surface, and the operating doctrine. Sections read from this file
 * so the narrative stays consistent across the site.
 */

/** A single axis on the capability radar. Scores are self-assessed depth, 0–100. */
export type Dimension = {
  id: string;
  label: string;
  /** Terse form used for the radar axis, where space is tight. */
  axis: string;
  /** Two-to-four word gloss shown under the label. */
  short: string;
  score: number;
  color: string;
  /** What the dimension actually means in the field. */
  detail: string;
  /** Concrete, checkable evidence — no adjectives. */
  evidence: string[];
};

/**
 * The eight dimensions the role is actually graded on. A pure product engineer
 * scores high on 2–4 of these; the FDE job is to be dangerous across all eight,
 * because the customer's problem does not respect your job description.
 */
export const dimensions: Dimension[] = [
  {
    id: "ambiguity",
    label: "Ambiguity → Spec",
    axis: "Ambiguity",
    short: "Turning vague into buildable",
    score: 92,
    color: "#00d4ff",
    detail:
      "Customers describe symptoms, not specs. I sit with the people doing the work, watch the actual workflow, and leave with a one-page spec, a named success metric, and an explicit list of what we are not building.",
    evidence: [
      "Every deployment starts with a written constraint map before a line of code",
      "One-page spec: primary flow, data model, success metric, explicit non-goals",
      "Scope cut at the spec stage, where it's free — not mid-sprint, where it's expensive",
    ],
  },
  {
    id: "prototype",
    label: "Rapid Prototyping",
    axis: "Prototype",
    short: "Working slice in days",
    score: 95,
    color: "#7c3aed",
    detail:
      "A demo on a real URL ends more arguments than a month of meetings. I get a thin end-to-end slice deployed inside the first week, running on the customer's real data, so feedback is about the product instead of the mockup.",
    evidence: [
      "Full-stack e-commerce platform — catalog, cart, Stripe checkout, JWT auth — shipped self-contained",
      "10,000-employee seed dataset generated in ~2.4s so demos run on realistic volume from day one",
      "Deploy to a live URL before the product is 'done' — every commit after is shareable",
    ],
  },
  {
    id: "production",
    label: "Production Hardening",
    axis: "Production",
    short: "From demo to load-bearing",
    score: 88,
    color: "#22c55e",
    detail:
      "The prototype is the easy half. Hardening is error paths, access control, indexes, tests, and the runbook that lets someone else operate it at 3am without calling me.",
    evidence: [
      "Sub-200ms queries on 10,000+ records via indexed PostgreSQL, not caching tricks",
      "13+ RSpec model tests covering the rules that must never be bypassed",
      "Auth that fails closed — admin surfaces stay locked until every secret is present",
    ],
  },
  {
    id: "integration",
    label: "Systems Integration",
    axis: "Integration",
    short: "Into stacks I didn't choose",
    score: 90,
    color: "#ff6b35",
    detail:
      "Forward deployment means writing code in someone else's repo, against someone else's API, under someone else's conventions. I read the codebase before I touch it and integrate without breaking what already works.",
    evidence: [
      "Rails service layer bridging in-app lifecycle events to Iterable's REST API",
      "Decoupled Rails 7 API + Next.js frontend joined by a versioned JSON contract",
      "Feature work on live products: codebase analysis first, no breaking changes",
    ],
  },
  {
    id: "data",
    label: "Data & Pipelines",
    axis: "Data",
    short: "Real data, not fixtures",
    score: 85,
    color: "#f59e0b",
    detail:
      "Customer data is messy, high-volume, and never shaped like the schema you'd have designed. I model it, index it, backfill it, and build the analytics layer that turns it into something a decision-maker can act on.",
    evidence: [
      "Five analytical views over live compensation data: geography, title, headcount, tenure, top roles",
      "Live job-market ingestion across multiple sources with dedupe, ranking, and relevance filtering",
      "Postgres schema design with migrations, validations, and seeds that mirror production scale",
    ],
  },
  {
    id: "ai",
    label: "AI Deployment",
    axis: "AI",
    short: "LLMs that survive users",
    score: 93,
    color: "#6366f1",
    detail:
      "Wiring an LLM into a demo takes an afternoon. Deploying one takes prompt design, failure handling, cost control, and a fallback for the day the API is down — plus the judgment to know when the answer isn't a model at all.",
    evidence: [
      "Production LLM chat assistant that qualifies inbound leads and captures requirements",
      "Automated summary pipeline turning raw conversations into structured, actionable digests",
      "AI-augmented build process across the stack — architecture, implementation, review",
    ],
  },
  {
    id: "comms",
    label: "Customer Comms",
    axis: "Comms",
    short: "Technical depth, plain words",
    score: 90,
    color: "#ec4899",
    detail:
      "Half the role is not engineering. It's the demo to the executive, the honest 'that will take three weeks, here's why', and the written update that keeps a room aligned without a meeting.",
    evidence: [
      "Weekly demos and daily written updates as the default operating rhythm",
      "Tradeoffs written down — including the ones that argue against my own preferred approach",
      "Long-form writing on architecture decisions, aimed at people who have to fund them",
    ],
  },
  {
    id: "ownership",
    label: "Ownership Loop",
    axis: "Ownership",
    short: "I stay until it's used",
    score: 94,
    color: "#14b8a6",
    detail:
      "Shipped is not the finish line — adopted is. I stay attached through rollout, watch what real usage breaks, and iterate until the metric we agreed on actually moves.",
    evidence: [
      "End-to-end ownership: discovery, build, deploy, rollout, iteration",
      "Instrumented from launch, so 'is it working?' has a number instead of an opinion",
      "Handoff means docs and a walkthrough — the customer's team owns it after me, not depends on me",
    ],
  },
];

/** One stage of the standing engagement loop, rendered as the scroll-linked timeline. */
export type LoopPhase = {
  id: string;
  window: string;
  title: string;
  description: string;
  /** What physically exists at the end of the phase. */
  artifacts: string[];
  color: string;
};

export const deploymentLoop: LoopPhase[] = [
  {
    id: "land",
    window: "Day 0",
    title: "Land",
    description:
      "I show up where the work happens. No requirements doc, no discovery deck — I watch the process, read the real data, and find out which part of the day everyone quietly hates.",
    artifacts: ["Access to the real system", "Notes from the people doing the work", "The problem behind the stated problem"],
    color: "#00d4ff",
  },
  {
    id: "map",
    window: "Day 1–3",
    title: "Map the constraints",
    description:
      "Every deployment is defined by its constraints: the legacy system that can't change, the compliance rule, the team that has to maintain it. I write them down and design inside them.",
    artifacts: ["One-page spec", "Constraint map", "The single metric that defines success", "Explicit non-goals"],
    color: "#7c3aed",
  },
  {
    id: "slice",
    window: "Day 4–10",
    title: "Ship a thin slice",
    description:
      "One complete path through the product, deployed to a real URL in their stack, running on their data. Narrow on purpose — it exists to convert opinions into evidence.",
    artifacts: ["Live deployment", "End-to-end happy path", "First round of real feedback"],
    color: "#22c55e",
  },
  {
    id: "harden",
    window: "Week 2–4",
    title: "Harden it",
    description:
      "Now it becomes load-bearing. Error paths, access control, indexes, tests, monitoring, and the runbook that makes it operable by someone who has never met me.",
    artifacts: ["Test coverage on the rules that matter", "Observability + alerts", "Access control", "Runbook"],
    color: "#ff6b35",
  },
  {
    id: "compound",
    window: "Ongoing",
    title: "Hand off and compound",
    description:
      "Docs, a walkthrough, and the keys. Then I go find the next thing worth automating — because the second deployment is always faster than the first.",
    artifacts: ["Documentation + walkthrough", "Owning team trained", "The next problem, already scoped"],
    color: "#6366f1",
  },
];

/** Terminal-style field log — the visible texture of an engagement in progress. */
export const fieldLog: { cmd: string; out: string; tone: "ok" | "info" | "warn" }[] = [
  { cmd: "fde land --customer acme --mode embedded", out: "on-site. shadowing ops team. 3 workflows observed.", tone: "info" },
  { cmd: "fde map --constraints", out: "legacy payroll API is read-only · PII cannot leave region", tone: "warn" },
  { cmd: "fde spec --one-page", out: "success metric locked: 6h/wk of manual reconciliation → 0", tone: "ok" },
  { cmd: "git push origin slice/day-6", out: "deployed → acme-internal.vercel.app · live on real data", tone: "ok" },
  { cmd: "fde harden --tests --observability", out: "13 specs green · p95 187ms · alerts wired", tone: "ok" },
  { cmd: "fde measure --metric reconciliation_hours", out: "6.0h/wk → 0.4h/wk · adoption 91% · target beaten", tone: "ok" },
  { cmd: "fde handoff --train --docs", out: "runbook shipped. owning team green. next problem scoped.", tone: "info" },
];

/** The surfaces a forward deployment actually has to plug into. */
export const integrationSurface: {
  category: string;
  color: string;
  items: string[];
  note: string;
}[] = [
  {
    category: "Identity & Access",
    color: "#00d4ff",
    items: ["OAuth 2.0", "Auth.js", "JWT", "bcrypt", "Role gates"],
    note: "Fails closed by default — locked until every secret is present.",
  },
  {
    category: "Money & Billing",
    color: "#22c55e",
    items: ["Stripe", "Checkout", "Webhooks", "Idempotency"],
    note: "Never hand-rolled. Payment state reconciles against the provider.",
  },
  {
    category: "Data Stores",
    color: "#7c3aed",
    items: ["PostgreSQL", "Neon", "SQLite", "Redis", "Migrations"],
    note: "Indexed for the query you actually run, not the one you imagined.",
  },
  {
    category: "Messaging & Growth",
    color: "#ff6b35",
    items: ["Iterable", "Resend", "Webhooks", "Lifecycle events"],
    note: "Event contracts versioned so downstream campaigns don't silently break.",
  },
  {
    category: "AI Layer",
    color: "#6366f1",
    items: ["Claude", "GPT", "Gemini", "Agents", "Streaming", "Evals"],
    note: "With fallbacks, cost ceilings, and a plan for when the model is wrong.",
  },
  {
    category: "Runtime & Deploy",
    color: "#f59e0b",
    items: ["Vercel", "Railway", "Docker", "CI", "Feature flags"],
    note: "Their pipeline, their conventions — I adapt to the stack I land in.",
  },
];

/** Operating doctrine — how the role is actually practised. */
export const doctrine: { n: string; title: string; desc: string; color: string }[] = [
  {
    n: "01",
    title: "Deploy forward, not behind glass",
    desc: "The best spec in the world is worth less than one afternoon sitting with the person whose job you're about to change. I go to where the problem lives.",
    color: "#00d4ff",
  },
  {
    n: "02",
    title: "The constraint is the spec",
    desc: "The legacy system that can't be touched, the rule that can't be broken, the team that has to maintain it after I leave — those define the solution far more than the feature list does.",
    color: "#7c3aed",
  },
  {
    n: "03",
    title: "A slice on day one beats a plan on day thirty",
    desc: "Deployed software is the only artifact that tells the truth. I ship a narrow end-to-end path early, on real data, and let it correct the roadmap.",
    color: "#22c55e",
  },
  {
    n: "04",
    title: "Instrument it or it didn't happen",
    desc: "'Is it working?' should have a number, not an opinion. I agree on the metric before building and wire up measurement in the same commit as the feature.",
    color: "#ff6b35",
  },
  {
    n: "05",
    title: "Their stack, their conventions",
    desc: "Forward deployment is writing in someone else's codebase. I match the house style, integrate cleanly, and leave code the resident team recognises as their own.",
    color: "#f59e0b",
  },
  {
    n: "06",
    title: "Hand off working, not dependent",
    desc: "The engagement succeeds when the customer's team can operate, extend, and debug it without me. Documentation and a walkthrough are deliverables, not afterthoughts.",
    color: "#6366f1",
  },
];

/** Engagement shapes offered — the FDE reframe of the old service packages. */
export const engagements: {
  id: string;
  name: string;
  duration: string;
  desc: string;
  best: string;
  features: string[];
  color: string;
  highlight: boolean;
}[] = [
  {
    id: "strike",
    name: "Strike",
    duration: "1–2 weeks",
    desc: "One problem, one deployment, one metric.",
    best: "Best when you already know what's broken.",
    features: [
      "Scoped in a single call",
      "Thin end-to-end slice live in week one",
      "Deployed in your stack, not a sandbox",
      "Handoff docs included",
    ],
    color: "#00d4ff",
    highlight: false,
  },
  {
    id: "embed",
    name: "Forward Deploy",
    duration: "4–12 weeks",
    desc: "I embed with your team and own the loop end to end.",
    best: "Best when the problem is still fuzzy.",
    features: [
      "On-site or in your channels, in your standups",
      "Discovery → spec → slice → harden → handoff",
      "Weekly demos, daily written updates",
      "Instrumented against an agreed success metric",
      "Your team trained before I leave",
    ],
    color: "#7c3aed",
    highlight: true,
  },
  {
    id: "integrate",
    name: "Integration",
    duration: "Ongoing",
    desc: "Wire your systems — and the AI layer — together properly.",
    best: "Best when the pieces exist but don't talk.",
    features: [
      "Legacy and third-party API integration",
      "LLM features deployed with fallbacks and cost ceilings",
      "Versioned contracts between services",
      "Retainer for the systems I've deployed",
    ],
    color: "#ff6b35",
    highlight: false,
  },
];

/** Headline proof numbers. `value` is parsed by CountUp; `suffix`/`prefix` are literal. */
export const proofMetrics: {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  sub: string;
}[] = [
  { value: 6, suffix: " days", label: "To first live slice", sub: "Deployed, on real data" },
  { value: 10000, suffix: "+", label: "Records in production", sub: "Sub-200ms indexed queries" },
  { value: 8, suffix: "/8", label: "FDE dimensions covered", sub: "Discovery through handoff" },
  { value: 100, suffix: "%", label: "Engagements shipped", sub: "Owned until adopted" },
];
