// Opportunity source adapters. Each fetches a PERMITTED public feed and
// normalizes it to Candidate[]. No scraping of gated platforms (LinkedIn,
// Wellfound, Upwork) — those prohibit it and would risk the accounts.
//
// To add a source: implement fetch() → Candidate[] and register it in SOURCES.

import { type Candidate, remoteOKToCandidates } from "./opportunities";

const UA = "Mozilla/5.0 (compatible; portfolio-admin/1.0)";

export interface Source {
  id: string;
  label: string;
  attribution?: string; // required credit line, if the feed's terms ask for one
  fetch: () => Promise<Candidate[]>;
}

// --- RemoteOK (public JSON API) ---
const remoteok: Source = {
  id: "remoteok",
  label: "RemoteOK",
  fetch: async () => {
    const res = await fetch("https://remoteok.com/api", {
      headers: { "User-Agent": UA, Accept: "application/json" },
      next: { revalidate: 3600 },
    });
    if (!res.ok) throw new Error(`RemoteOK ${res.status}`);
    return remoteOKToCandidates(await res.json());
  },
};

// --- Remotive (public JSON API; terms require attribution + link-back) ---
interface RemotiveJob {
  title?: string;
  company_name?: string;
  url?: string;
  tags?: unknown;
  salary?: string;
  publication_date?: string;
}
const remotive: Source = {
  id: "remotive",
  label: "Remotive",
  attribution: "Jobs by Remotive (remotive.com)",
  fetch: async () => {
    const res = await fetch(
      "https://remotive.com/api/remote-jobs?limit=100",
      { headers: { "User-Agent": UA, Accept: "application/json" }, next: { revalidate: 3600 } },
    );
    if (!res.ok) throw new Error(`Remotive ${res.status}`);
    const data = (await res.json()) as { jobs?: RemotiveJob[] };
    const jobs = Array.isArray(data.jobs) ? data.jobs : [];
    const out: Candidate[] = [];
    for (const j of jobs) {
      if (typeof j.title !== "string" || !j.title.trim()) continue;
      if (typeof j.url !== "string" || !j.url) continue;
      out.push({
        title: j.title.trim(),
        company: (j.company_name ?? "").trim() || "Unknown",
        url: j.url,
        tags: Array.isArray(j.tags)
          ? (j.tags.filter((t) => typeof t === "string") as string[])
          : [],
        rate: typeof j.salary === "string" && j.salary.trim() ? j.salary.trim() : null,
        date: typeof j.publication_date === "string" ? j.publication_date : null,
        source: "Remotive",
      });
    }
    return out;
  },
};

export const SOURCES: Record<string, Source> = { remoteok, remotive };

export const DEFAULT_SOURCE_IDS = Object.keys(SOURCES);
