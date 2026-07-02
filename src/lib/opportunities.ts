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

/**
 * Return opportunities whose tags overlap the user's skills, ranked by number
 * of matched skills then recency. If `skills` is empty, returns recent jobs
 * unranked-by-match. Tolerant of the legal-notice element and malformed rows.
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
    const tags = Array.isArray(job.tags)
      ? job.tags.filter((t): t is string => typeof t === "string")
      : [];
    const matched = mine.size
      ? [...new Set(tags.map(normalize))].filter((t) => mine.has(t))
      : [];
    // When the user has skills, only keep jobs that match at least one.
    if (mine.size && matched.length === 0) continue;

    const url = job.apply_url || job.url;
    if (typeof url !== "string" || !url) continue; // no way to apply → skip

    mapped.push({
      title: job.position!.trim(),
      company: (job.company ?? "").trim() || "Unknown",
      url,
      tags,
      matched,
      rate: rateLabel(job),
      date: typeof job.date === "string" ? job.date : null,
      _score: matched.length,
    });
  }

  mapped.sort(
    (a, b) => b._score - a._score || (b.date ?? "").localeCompare(a.date ?? ""),
  );

  return mapped.slice(0, limit).map(({ _score, ...o }) => o);
}
