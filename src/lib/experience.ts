/**
 * Work history — the "Where I've shipped" section and the About intro.
 *
 * Rule for this file: verified facts only, described in text. No client names,
 * no screenshots, no internal data. If it isn't confirmed, it carries a TODO.
 */
export type Role = {
  id: string;
  company: string;
  title: string;
  dates: string;
  /** One line on what the product is. */
  product: string;
  /** One line for the About intro. */
  summary: string;
  /** Outcome-first, two or three. */
  bullets: string[];
  color: string;
};

export const experience: Role[] = [
  {
    id: "bandgi",
    company: "Bandgi Technologies",
    // TODO(confirm): exact current title at Bandgi Technologies.
    title: "Software Engineer",
    dates: "Mar 2024 – Present",
    product:
      "An inspection and audit platform for field teams, on web and mobile.",
    summary:
      "AI assistant, conflict-safe web–mobile sync, and the data pipeline behind an inspection and audit platform.",
    bullets: [
      "Field auditors query inspection and audit data in natural language — an AI assistant (LangChain + LangGraph, RAG) grounded in platform data.",
      "Field work survives low connectivity: engineered conflict-safe sync between web and mobile.",
      "Live dashboards fed by a Spark/PySpark → Airflow → dbt → Snowflake/BigQuery pipeline, on top of REST/GraphQL APIs backed by PostgreSQL, Redis and Sidekiq jobs.",
    ],
    color: "#0284c7",
  },
  {
    id: "builder-ai",
    company: "Builder.ai",
    // TODO(confirm): exact title at Builder.ai.
    title: "Software Engineer",
    dates: "Apr 2023 – Mar 2024",
    product:
      "A customer prototyping platform with multi-screen client approval workflows.",
    summary:
      "Performance, test coverage, and approval workflows on a customer prototyping platform.",
    bullets: [
      "Cut prototype API response times by 70% by eliminating N+1 queries.",
      "Raised automated test coverage from 40% to 80% (RSpec, SimpleCov).",
      "Shipped review_mode and delinking for multi-screen client approval workflows, with real-time updates over WebSockets.",
    ],
    color: "#7c3aed",
  },
  {
    id: "protonshub",
    company: "Protonshub Technologies",
    title: "Software Engineer",
    dates: "Jan 2022 – Apr 2023",
    product:
      "OPS and CRM portals for order management, scheduling, and lead/deal tracking.",
    summary: "OPS and CRM portals in Rails + React, deployed to AWS and Heroku.",
    bullets: [
      "Built OPS and CRM portals (Rails + React) covering order management, scheduling, and lead/deal tracking.",
      "Deployed to AWS and Heroku.",
    ],
    color: "#f97316",
  },
];
