// Pure matching of client/contract opportunities from a permitted job source
// (RemoteOK's public feed) against the user's skills. No scraping of gated
// platforms; each result carries a real apply URL the user clicks through to.

import { isJob, type RemoteOKJob } from "./demand";

export interface Opportunity {
  title: string;
  company: string;
  url: string; // where to apply (external)
  tags: string[];
  matched: string[]; // tags overlapping the user's skills
  rate: string | null; // e.g. "$100,000–$150,000"
  date: string | null;
}

function normalize(s: string): string {
  return s.trim().toLowerCase();
}

function rateLabel(job: RemoteOKJob): string | null {
  const lo =
    typeof job.salary_min === "number" && job.salary_min > 0
      ? job.salary_min
      : null;
  const hi =
    typeof job.salary_max === "number" && job.salary_max > 0
      ? job.salary_max
      : null;
  if (lo === null && hi === null) return null;
  const fmt = (n: number) => "$" + n.toLocaleString();
  if (lo !== null && hi !== null && lo !== hi) return `${fmt(lo)}–${fmt(hi)}`;
  return fmt((lo ?? hi) as number);
}

interface RemoteOKJobFull extends RemoteOKJob {
  url?: string;
  apply_url?: string;
}

// Title looks like an actual engineering role. Match "developer" (not bare
// "develop", which also hits "business development").
const DEV_TITLE =
  /\b(developer|engineer|programmer|full[\s-]?stack|back[\s-]?end|front[\s-]?end|software|architect|sre|dev[\s-]?ops|data\s?eng|ml\s?eng|ai\s?eng)/i;
// Obviously non-engineering roles that RemoteOK sometimes tags with a stray tech tag.
const DENY_TITLE =
  /\b(driver|delivery|sales|recruit|business development|representative|account manager|customer support|support agent|nurse|teacher|barista|warehouse|virtual assistant|social media|content writer|copywriter)\b/i;

export function isDevRole(title: string): boolean {
  return DEV_TITLE.test(title) && !DENY_TITLE.test(title);
}

/**
 * Return relevant engineering opportunities matched to the user's skills.
 *
 * Tightness rule (kills false positives like "Delivery Driver [ruby]"):
 *   - Never keep a denylisted non-dev title.
 *   - Dev-looking title  → keep if it matches ≥1 skill.
 *   - Other title        → keep only if it matches ≥2 skills.
 * With no skills provided, only dev-titled roles are returned.
 * Ranked by (dev-title bonus + matched count), then recency.
 */
export function matchOpportunities(
  raw: unknown,
  skills: string[] = [],
  limit = 25,
): Opportunity[] {
  const mine = new Set(skills.map(normalize));
  const entries = Array.isArray(raw) ? raw : [];

  const mapped: (Opportunity & { _score: number })[] = [];
  for (const entry of entries) {
    if (!isJob(entry)) continue;
    const job = entry as RemoteOKJobFull;
    const title = job.position!.trim();
    if (DENY_TITLE.test(title)) continue; // clearly not an engineering gig

    const tags = Array.isArray(job.tags)
      ? job.tags.filter((t): t is string => typeof t === "string")
      : [];
    const matched = mine.size
      ? [...new Set(tags.map(normalize))].filter((t) => mine.has(t))
      : [];
    const devTitle = DEV_TITLE.test(title);

    // Relevance gate.
    if (mine.size) {
      if (!(devTitle ? matched.length >= 1 : matched.length >= 2)) continue;
    } else if (!devTitle) {
      continue; // no skills given → only surface dev-titled roles
    }

    const url = job.apply_url || job.url;
    if (typeof url !== "string" || !url) continue; // no way to apply → skip

    mapped.push({
      title,
      company: (job.company ?? "").trim() || "Unknown",
      url,
      tags,
      matched,
      rate: rateLabel(job),
      date: typeof job.date === "string" ? job.date : null,
      _score: matched.length + (devTitle ? 2 : 0),
    });
  }

  mapped.sort(
    (a, b) => b._score - a._score || (b.date ?? "").localeCompare(a.date ?? ""),
  );

  return mapped.slice(0, limit).map(({ _score, ...o }) => o);
}
