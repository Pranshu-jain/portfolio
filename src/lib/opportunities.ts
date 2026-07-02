// Source-agnostic opportunity matching. Adapters (see sources.ts) normalize each
// permitted feed into Candidate[]; filterCandidates applies the relevance rule
// uniformly. No scraping of gated platforms; each result has a real apply URL.

import { isJob, type RemoteOKJob } from "./demand";

/** Normalized opening from any source, before relevance filtering. */
export interface Candidate {
  title: string;
  company: string;
  url: string; // external apply/listing URL
  tags: string[];
  rate: string | null;
  date: string | null;
  source: string; // e.g. "RemoteOK", "Remotive"
}

export interface Opportunity extends Candidate {
  matched: string[]; // tags overlapping the user's skills
}

function normalize(s: string): string {
  return s.trim().toLowerCase();
}

/** Format a numeric salary range; non-positive values are treated as absent. */
export function formatSalaryRange(
  min?: number | null,
  max?: number | null,
): string | null {
  const lo = typeof min === "number" && min > 0 ? min : null;
  const hi = typeof max === "number" && max > 0 ? max : null;
  if (lo === null && hi === null) return null;
  const fmt = (n: number) => "$" + n.toLocaleString();
  if (lo !== null && hi !== null && lo !== hi) return `${fmt(lo)}–${fmt(hi)}`;
  return fmt((lo ?? hi) as number);
}

// Title looks like an actual engineering role. Match "developer" (not bare
// "develop", which also hits "business development").
const DEV_TITLE =
  /\b(developer|engineer|programmer|full[\s-]?stack|back[\s-]?end|front[\s-]?end|software|architect|sre|dev[\s-]?ops|data\s?eng|ml\s?eng|ai\s?eng)/i;
// Obviously non-engineering roles that feeds sometimes tag with a stray tech tag.
const DENY_TITLE =
  /\b(driver|delivery|sales|recruit|business development|representative|account manager|customer support|support agent|nurse|teacher|barista|warehouse|virtual assistant|social media|content writer|copywriter)\b/i;

export function isDevRole(title: string): boolean {
  return DEV_TITLE.test(title) && !DENY_TITLE.test(title);
}

interface RemoteOKJobFull extends RemoteOKJob {
  url?: string;
  apply_url?: string;
}

/** Map a raw RemoteOK API response to normalized candidates. */
export function remoteOKToCandidates(raw: unknown): Candidate[] {
  const entries = Array.isArray(raw) ? raw : [];
  const out: Candidate[] = [];
  for (const entry of entries) {
    if (!isJob(entry)) continue;
    const job = entry as RemoteOKJobFull;
    const url = job.apply_url || job.url;
    if (typeof url !== "string" || !url) continue;
    out.push({
      title: job.position!.trim(),
      company: (job.company ?? "").trim() || "Unknown",
      url,
      tags: Array.isArray(job.tags)
        ? job.tags.filter((t): t is string => typeof t === "string")
        : [],
      rate: formatSalaryRange(job.salary_min, job.salary_max),
      date: typeof job.date === "string" ? job.date : null,
      source: "RemoteOK",
    });
  }
  return out;
}

/**
 * Filter + rank normalized candidates into relevant engineering opportunities.
 *
 * Tightness rule (kills false positives like "Delivery Driver [ruby]"):
 *   - Never keep a denylisted non-dev title.
 *   - Dev-looking title  → keep if it matches ≥1 skill.
 *   - Other title        → keep only if it matches ≥2 skills.
 * With no skills provided, only dev-titled roles are returned.
 * De-duplicated by URL; ranked by (dev-title bonus + matched count), then recency.
 */
export function filterCandidates(
  candidates: Candidate[],
  skills: string[] = [],
  limit = 25,
): Opportunity[] {
  const mine = new Set(skills.map(normalize));
  const seen = new Set<string>();
  const scored: (Opportunity & { _score: number })[] = [];

  for (const c of candidates) {
    if (!c.url || seen.has(c.url)) continue;
    if (DENY_TITLE.test(c.title)) continue;

    const matched = mine.size
      ? [...new Set(c.tags.map(normalize))].filter((t) => mine.has(t))
      : [];
    const devTitle = DEV_TITLE.test(c.title);

    if (mine.size) {
      if (!(devTitle ? matched.length >= 1 : matched.length >= 2)) continue;
    } else if (!devTitle) {
      continue;
    }

    seen.add(c.url);
    scored.push({ ...c, matched, _score: matched.length + (devTitle ? 2 : 0) });
  }

  scored.sort(
    (a, b) => b._score - a._score || (b.date ?? "").localeCompare(a.date ?? ""),
  );
  return scored.slice(0, limit).map(({ _score, ...o }) => o);
}

/** RemoteOK convenience wrapper (used by the RemoteOK source + tests). */
export function matchOpportunities(
  raw: unknown,
  skills: string[] = [],
  limit = 25,
): Opportunity[] {
  return filterCandidates(remoteOKToCandidates(raw), skills, limit);
}
