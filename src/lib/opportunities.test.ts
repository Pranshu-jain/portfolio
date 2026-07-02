import { describe, it, expect } from "vitest";
import {
  matchOpportunities,
  isDevRole,
  filterCandidates,
  formatSalaryRange,
  type Candidate,
} from "./opportunities";

function cand(over: Partial<Candidate> = {}): Candidate {
  return {
    title: "Backend Engineer",
    company: "Acme",
    url: "https://x/" + Math.random().toString(36).slice(2),
    tags: ["react"],
    rate: null,
    date: null,
    source: "RemoteOK",
    ...over,
  };
}

describe("formatSalaryRange", () => {
  it("formats a range, single value, and treats <=0 as absent", () => {
    expect(formatSalaryRange(100000, 150000)).toBe("$100,000–$150,000");
    expect(formatSalaryRange(90000, 0)).toBe("$90,000");
    expect(formatSalaryRange(0, 0)).toBeNull();
    expect(formatSalaryRange(null, null)).toBeNull();
  });
});

describe("filterCandidates — multi-source", () => {
  it("de-duplicates by URL across sources (keeps one)", () => {
    const res = filterCandidates(
      [
        cand({ url: "https://dup", source: "RemoteOK", tags: ["react"] }),
        cand({ url: "https://dup", source: "Remotive", tags: ["react", "node"] }),
      ],
      ["react", "node"],
    );
    expect(res).toHaveLength(1);
  });

  it("preserves the source field on results", () => {
    const res = filterCandidates(
      [cand({ source: "Remotive", tags: ["python"], title: "Data Engineer" })],
      ["python"],
    );
    expect(res[0].source).toBe("Remotive");
  });

  it("applies the same relevance rule regardless of source", () => {
    const res = filterCandidates(
      [
        cand({ title: "Delivery Driver", source: "Remotive", tags: ["react"] }),
        cand({ title: "Senior Engineer", source: "Remotive", tags: ["react"] }),
      ],
      ["react"],
    );
    expect(res.map((o) => o.title)).toEqual(["Senior Engineer"]);
  });
});

const LEGAL = { legal: "notice" };
function job(
  position: string,
  tags: string[],
  url?: string,
  extra: Record<string, unknown> = {},
) {
  return { position, company: "Acme", tags, url, ...extra };
}

describe("isDevRole", () => {
  it("true for engineering titles", () => {
    expect(isDevRole("Senior Backend Engineer")).toBe(true);
    expect(isDevRole("Full-Stack Developer")).toBe(true);
  });
  it("false for non-dev / denylisted titles", () => {
    expect(isDevRole("Delivery Driver")).toBe(false);
    expect(isDevRole("Product Manager")).toBe(false);
    expect(isDevRole("Sales Development Rep")).toBe(false); // sales denylisted
  });
});

describe("matchOpportunities — tightness", () => {
  it("skips the legal-notice element and non-jobs", () => {
    const res = matchOpportunities(
      [LEGAL, 5, null, job("Backend Engineer", ["react"], "https://x/1")],
      ["react"],
    );
    expect(res).toHaveLength(1);
    expect(res[0].title).toBe("Backend Engineer");
  });

  it("drops a denylisted title even when a skill tag matches", () => {
    // the exact false positive we're fixing: delivery driver tagged 'ruby'
    const res = matchOpportunities(
      [job("Delivery Driver Bristol", ["ruby"], "https://x/d")],
      ["ruby"],
    );
    expect(res).toHaveLength(0);
  });

  it("keeps a dev-titled job with a single skill match", () => {
    const res = matchOpportunities(
      [job("React Developer", ["react", "aws"], "https://x/r")],
      ["react"],
    );
    expect(res.map((o) => o.title)).toEqual(["React Developer"]);
    expect(res[0].matched).toEqual(["react"]);
  });

  it("drops a non-dev title with only ONE skill match", () => {
    const res = matchOpportunities(
      [job("Business Operations Associate", ["python", "excel"], "https://x/b")],
      ["python"],
    );
    expect(res).toHaveLength(0);
  });

  it("keeps a non-dev title when it matches TWO+ skills", () => {
    const res = matchOpportunities(
      [job("Growth Marketer", ["python", "node", "seo"], "https://x/g")],
      ["python", "node"],
    );
    expect(res).toHaveLength(1);
    expect(res[0].matched.sort()).toEqual(["node", "python"]);
  });

  it("drops sales titles that contain 'development' (not engineering)", () => {
    const res = matchOpportunities(
      [job("Business Development Representative", ["ruby"], "https://x/bdr")],
      ["ruby"],
    );
    expect(res).toHaveLength(0);
  });

  it("ranks dev-titled + more-matched first", () => {
    const res = matchOpportunities(
      [
        job("Data Analyst", ["python", "sql"], "https://x/a", { date: "2024-02-01" }),
        job("Software Engineer", ["python"], "https://x/e", { date: "2024-01-01" }),
      ],
      ["python", "sql"],
    );
    // engineer: score = 1 match + 2 dev bonus = 3; analyst: 2 matches + 0 = 2
    expect(res[0].title).toBe("Software Engineer");
  });

  it("drops jobs with no apply URL", () => {
    const res = matchOpportunities(
      [job("Backend Engineer", ["react"], undefined)],
      ["react"],
    );
    expect(res).toHaveLength(0);
  });

  it("prefers apply_url over url", () => {
    const res = matchOpportunities(
      [job("Backend Engineer", ["react"], "https://x/list", { apply_url: "https://x/apply" })],
      ["react"],
    );
    expect(res[0].url).toBe("https://x/apply");
  });

  it("formats rate range and treats 0 salary as absent", () => {
    const res = matchOpportunities(
      [
        job("Backend Engineer", ["react"], "https://x/p", { salary_min: 100000, salary_max: 150000 }),
        job("Frontend Engineer", ["react"], "https://x/z", { salary_min: 0, salary_max: 0 }),
      ],
      ["react"],
    );
    expect(res.find((o) => o.title === "Backend Engineer")?.rate).toBe("$100,000–$150,000");
    expect(res.find((o) => o.title === "Frontend Engineer")?.rate).toBeNull();
  });

  it("with no skills, returns only dev-titled roles", () => {
    const res = matchOpportunities(
      [
        job("Senior Engineer", ["x"], "https://x/a"),
        job("Marketing Lead", ["y"], "https://x/b"),
      ],
      [],
    );
    expect(res.map((o) => o.title)).toEqual(["Senior Engineer"]);
  });

  it("empty / malformed input yields [], never throws", () => {
    expect(matchOpportunities([])).toEqual([]);
    expect(matchOpportunities(null)).toEqual([]);
    expect(matchOpportunities("garbage")).toEqual([]);
  });

  it("respects the limit", () => {
    const jobs = Array.from({ length: 30 }, (_, i) =>
      job("Engineer " + i, ["react"], "https://x/" + i),
    );
    expect(matchOpportunities(jobs, ["react"], 10)).toHaveLength(10);
  });
});
