// Pure parsing + ranking of RemoteOK's public feed.
//
// RemoteOK's API (https://remoteok.com/api) returns an array whose FIRST element
// is a legal-notice object (no `position`), followed by job objects. Everything
// here is pure and deterministic so it can be unit-tested without network.

export interface RemoteOKJob {
  position?: string;
  company?: string;
  tags?: string[];
  salary_min?: number;
  salary_max?: number;
  url?: string;
  date?: string;
}

export interface SkillCount {
  tag: string;
  count: number;
  mine: boolean; // overlaps one of the user's skills
}

export interface DemandResult {
  totalJobs: number;
  skills: SkillCount[]; // ranked by count desc
  rates: {
    withSalary: number;
    min: number | null;
    max: number | null;
    median: number | null;
  };
}

/** A RemoteOK entry is a job iff it's an object with a non-empty position string. */
export function isJob(entry: unknown): entry is RemoteOKJob {
  return (
    typeof entry === "object" &&
    entry !== null &&
    typeof (entry as RemoteOKJob).position === "string" &&
    (entry as RemoteOKJob).position!.trim().length > 0
  );
}

function normalizeSkill(tag: string): string {
  return tag.trim().toLowerCase();
}

function median(values: number[]): number | null {
  if (values.length === 0) return null;
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0
    ? Math.round((sorted[mid - 1] + sorted[mid]) / 2)
    : sorted[mid];
}

/**
 * Rank in-demand skills and compute rate stats from a raw RemoteOK response.
 * Tolerant of the legal-notice element, non-objects, and missing fields.
 */
export function rankDemand(
  raw: unknown,
  mySkills: string[] = [],
  limit = 20,
): DemandResult {
  const mine = new Set(mySkills.map(normalizeSkill));
  const entries = Array.isArray(raw) ? raw : [];
  const jobs = entries.filter(isJob);

  const counts = new Map<string, number>();
  for (const job of jobs) {
    if (!Array.isArray(job.tags)) continue;
    // de-dupe tags within a single posting so one job counts a skill once
    const seen = new Set<string>();
    for (const rawTag of job.tags) {
      if (typeof rawTag !== "string") continue;
      const tag = normalizeSkill(rawTag);
      if (!tag || seen.has(tag)) continue;
      seen.add(tag);
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }

  const skills: SkillCount[] = [...counts.entries()]
    .map(([tag, count]) => ({ tag, count, mine: mine.has(tag) }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag))
    .slice(0, limit);

  const midpoints: number[] = [];
  let min: number | null = null;
  let max: number | null = null;
  let withSalary = 0;
  for (const job of jobs) {
    // RemoteOK uses 0 (not null) to mean "no salary given", so treat any
    // non-positive value as absent.
    const lo =
      typeof job.salary_min === "number" && job.salary_min > 0
        ? job.salary_min
        : null;
    const hi =
      typeof job.salary_max === "number" && job.salary_max > 0
        ? job.salary_max
        : null;
    if (lo === null && hi === null) continue;
    withSalary++;
    const effLo = lo ?? hi!;
    const effHi = hi ?? lo!;
    min = min === null ? effLo : Math.min(min, effLo);
    max = max === null ? effHi : Math.max(max, effHi);
    midpoints.push(Math.round((effLo + effHi) / 2));
  }

  return { totalJobs: jobs.length, skills, rates: { withSalary, min, max, median: median(midpoints) } };
}
