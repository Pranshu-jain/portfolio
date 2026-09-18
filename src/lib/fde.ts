/**
 * The Forward Deployed Engineer layer.
 *
 * Everything a visitor needs to conclude "this person is an FDE" lives here:
 * the competency dimensions (rendered as the radar), the engagement loop, the
 * integration surface, and the operating doctrine. Sections read from this file
 * so the narrative stays consistent across the site.
 *
 * Rule for this file: no invented figures, no implied customers. Anything
 * numeric traces back to a build recorded in `./projects.ts`.
 */

import { featuredProjects } from "./projects";

/** A single axis on the capability radar. */
export type Dimension = {
  id: string;
  label: string;
  /** Terse form used for the radar axis, where space is tight. */
  axis: string;
  /** Two-to-four word gloss shown under the label. */
  short: string;
  /**
   * Relative emphasis across the eight axes, 0–100. This drives the radar's
   * geometry only — it is deliberately never shown as a figure, because a
   * self-assessed number reads as precision nobody can check. The evidence
   * list is what actually makes the case.
   */
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
      "Customers describe symptoms, not specs. I watch the actual workflow and leave with a one-page spec, a named success metric, and an explicit list of what we are not building.",
    evidence: [
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
      "A demo on a real URL ends more arguments than a month of meetings. I get a thin end-to-end slice deployed early, so feedback is about the product instead of the mockup.",
    evidence: [
      "Full-stack e-commerce platform — catalog, cart, Stripe checkout, JWT auth — shipped self-contained",
      "10,000-employee seed dataset generated in ~2.4s so demos run on realistic volume from day one",
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
      "The prototype is the easy half. Hardening is error paths, access control, indexes, tests, and the runbook that lets someone else operate it at 3am.",
    evidence: [
      "At Builder.ai: API response times cut 70% by eliminating N+1 queries; test coverage raised from 40% to 80%",
      "Sub-200ms queries on a 10,000-record dataset via indexed PostgreSQL, not caching tricks",
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
      "Forward deployment means writing code in someone else's repo, against someone else's API, under someone else's conventions. I read the codebase before I touch it.",
    evidence: [
      "Rails service layer bridging in-app lifecycle events to Iterable's REST API",
      "Decoupled Rails 7 API + Next.js frontend joined by a versioned JSON contract",
    ],
  },
  {
    id: "data",
    label: "Data & Pipelines",
    axis: "Data",
    short: "Modelled, indexed, queryable",
    score: 85,
    color: "#f59e0b",
    detail:
      "Real data is messy, high-volume, and never shaped like the schema you'd have designed. I model it, index it, and build the layer that turns it into something a decision-maker can act on.",
    evidence: [
      "At Bandgi Technologies: Spark/PySpark → Airflow → dbt → Snowflake/BigQuery pipeline feeding live dashboards",
      "Five analytical views over a generated 10,000-employee compensation dataset",
    ],
  },
  {
    id: "ai",
    label: "AI Deployment",
    axis: "AI",
    short: "LLMs that survive users",
    score: 93,
    color: "#6366f1",
    // TODO: the original copy also claimed failure handling, cost control and
    // API-down fallbacks. Restore once a shown project demonstrates them.
    detail:
      "Wiring an LLM into a demo takes an afternoon. Deploying one means grounding it in real data — plus the judgment to know when the answer isn't a model at all.",
    evidence: [
      "At Bandgi Technologies: AI assistant (LangChain + LangGraph, RAG) answering natural-language questions grounded in platform data",
      "The chat assistant on this site: qualifies inbound leads and turns the conversation into a structured summary",
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
      "Half the role is not engineering. It's the honest 'that will take three weeks, here's why', and the written update that keeps a room aligned without a meeting.",
    evidence: [
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
      "Shipped is not the finish line — adopted is. I stay attached through rollout, watch what real usage breaks, and iterate until the agreed metric moves.",
    evidence: [
      "End-to-end ownership: discovery, build, deploy, rollout, iteration",
      "Handoff means docs and a walkthrough — the team owns it after me, not depends on me",
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

/**
 * Terminal-style field log. Every line traces to the Iterable integration
 * recorded in `src/lib/projects.ts`. It shows the method, not a client
 * engagement — no line may imply a customer or a team that adopted it.
 */
export const fieldLog: { cmd: string; out: string; tone: "ok" | "info" | "warn" }[] = [
  { cmd: "fde scope --integration iterable", out: "target: an existing rails app. design for code I don't own.", tone: "info" },
  { cmd: "fde observe --campaigns", out: "problem: onboarding + re-engagement fire on calendar time, not behaviour", tone: "warn" },
  { cmd: "fde map --constraints", out: "cannot change app behaviour · cannot block a user request · fail-open if Iterable is down", tone: "warn" },
  { cmd: "fde spec --one-page", out: "goal: campaigns react to what users actually do in-product", tone: "ok" },
  { cmd: "rails g service iterable/event_dispatcher", out: "lifecycle events tapped at well-defined seams", tone: "info" },
  { cmd: "fde integrate --vendor iterable --contract v1", out: "event contracts versioned · downstream campaigns won't silently break", tone: "ok" },
  { cmd: "fde verify --fail-open", out: "iterable unreachable → user request unaffected. requirement met.", tone: "ok" },
  { cmd: "fde handoff --pattern reusable", out: "service pattern is vendor-agnostic · reusable for the next integration.", tone: "info" },
];

/**
 * The surfaces a forward deployment actually has to plug into.
 *
 * Rule: only list what a shown project or a role in `./experience.ts` backs
 * up. If a tool isn't demonstrated somewhere on this site, it doesn't go here.
 */
export const integrationSurface: {
  category: string;
  color: string;
  items: string[];
  note: string;
}[] = [
  {
    category: "Application & APIs",
    color: "#00d4ff",
    items: ["Ruby on Rails", "React / Next.js", "REST / GraphQL", "WebSockets"],
    note: "A versioned contract between the API and whatever consumes it.",
  },
  {
    category: "Data Stores & Jobs",
    color: "#7c3aed",
    items: ["PostgreSQL", "Redis", "Sidekiq"],
    note: "Indexed for the query you actually run, not the one you imagined.",
  },
  {
    category: "Identity, Payments & Messaging",
    color: "#22c55e",
    items: ["JWT", "OAuth 2.0", "Stripe", "Iterable"],
    note: "Never hand-rolled. Auth fails closed; event contracts are versioned.",
  },
  {
    category: "Data Pipelines",
    color: "#ff6b35",
    items: ["Python", "PySpark", "Airflow", "dbt", "Snowflake", "BigQuery"],
    note: "Spark → Airflow → dbt → warehouse, feeding live dashboards.",
  },
  {
    category: "AI Layer",
    color: "#6366f1",
    // TODO: "Evals", "cost ceilings" and "fallbacks" were removed from this
    // card — add them back only once a shown project demonstrates them.
    items: ["LangChain", "LangGraph", "RAG", "OpenAI API"],
    note: "Grounded in the platform's own data — answers trace back to a source.",
  },
  {
    category: "Runtime & Deploy",
    color: "#f59e0b",
    items: ["Docker", "Vercel", "AWS", "Heroku"],
    note: "Their pipeline, their conventions — I adapt to the stack I land in.",
  },
];

/**
 * Operating doctrine — how the role is actually practised. Four rules, kept
 * short: this renders on /about, below the factual intro.
 */
export const doctrine: { n: string; title: string; desc: string; color: string }[] = [
  {
    n: "01",
    title: "The constraint is the spec",
    desc: "The legacy system that can't be touched, the rule that can't be broken, the team that maintains it after I leave — those define the solution more than the feature list does.",
    color: "#7c3aed",
  },
  {
    n: "02",
    title: "A slice on day one beats a plan on day thirty",
    desc: "Deployed software is the only artifact that tells the truth. I ship a narrow end-to-end path early and let it correct the roadmap.",
    color: "#22c55e",
  },
  {
    n: "03",
    title: "Instrument it or it didn't happen",
    desc: "'Is it working?' should have a number, not an opinion. I agree on the metric before building.",
    color: "#ff6b35",
  },
  {
    n: "04",
    title: "Hand off working, not dependent",
    desc: "The work succeeds when the team can operate, extend, and debug it without me. Docs and a walkthrough are deliverables.",
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
      // TODO: was "LLM features deployed with fallbacks and cost ceilings" —
      // restore once a shown project demonstrates fallbacks / cost controls.
      "LLM features grounded in your own data (RAG)",
      "Versioned contracts between services",
      "Retainer for the systems I've deployed",
    ],
    color: "#ff6b35",
    highlight: false,
  },
];

/**
 * Headline proof numbers. `value` is animated by CountUp; `prefix`/`suffix`
 * are literal.
 *
 * Every figure here is traceable to a build recorded in
 * `src/lib/projects.ts` — nothing self-reported, nothing unfalsifiable. If you
 * add a metric, it has to be checkable from the dossiers.
 */
export const proofMetrics: {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  sub: string;
}[] = [
  {
    // Derived, so this stays true as the build list grows.
    value: featuredProjects.length,
    label: "Projects shipped",
    sub: "Source on GitHub",
  },
  {
    // Seeded demo data, not production records — the label has to say so.
    value: 10000,
    label: "Record demo dataset",
    sub: "Generated seed data · indexed PostgreSQL",
  },
  {
    value: 200,
    prefix: "<",
    suffix: "ms",
    label: "Query latency at that scale",
    sub: "Across five analytical views",
  },
  {
    value: 0,
    label: "External services required",
    sub: "Self-contained storefront, payments included",
  },
];
