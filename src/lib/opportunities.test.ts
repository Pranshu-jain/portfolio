import { describe, it, expect } from "vitest";
import { matchOpportunities } from "./opportunities";

const LEGAL = { legal: "notice" };
function job(
  position: string,
  tags: string[],
  url?: string,
  extra: Record<string, unknown> = {},
) {
  return { position, company: "Acme", tags, url, ...extra };
}

describe("matchOpportunities", () => {
  it("skips the legal-notice element and non-jobs", () => {
    const res = matchOpportunities([LEGAL, 5, null, job("Dev", ["react"], "https://x/1")]);
    expect(res).toHaveLength(1);
    expect(res[0].title).toBe("Dev");
  });

  it("keeps only jobs matching the user's skills", () => {
    const res = matchOpportunities(
      [
        job("A", ["react", "node"], "https://x/a"),
        job("B", ["php"], "https://x/b"),
      ],
      ["react"],
    );
    expect(res.map((o) => o.title)).toEqual(["A"]);
    expect(res[0].matched).toContain("react");
  });

  it("ranks by number of matched skills, then recency", () => {
    const res = matchOpportunities(
      [
        job("One", ["react"], "https://x/1", { date: "2024-01-01" }),
        job("Two", ["react", "typescript"], "https://x/2", { date: "2024-01-02" }),
      ],
      ["react", "typescript"],
    );
    expect(res[0].title).toBe("Two"); // 2 matches beats 1
  });

  it("drops jobs with no apply URL (can't apply)", () => {
    const res = matchOpportunities([job("NoUrl", ["react"], undefined)], ["react"]);
    expect(res).toHaveLength(0);
  });

  it("prefers apply_url over url", () => {
    const res = matchOpportunities(
      [job("A", ["react"], "https://x/list", { apply_url: "https://x/apply" })],
      ["react"],
    );
    expect(res[0].url).toBe("https://x/apply");
  });

  it("formats rate range and treats 0 salary as absent", () => {
    const res = matchOpportunities(
      [
        job("Paid", ["react"], "https://x/p", { salary_min: 100000, salary_max: 150000 }),
        job("Zero", ["react"], "https://x/z", { salary_min: 0, salary_max: 0 }),
      ],
      ["react"],
    );
    const paid = res.find((o) => o.title === "Paid");
    const zero = res.find((o) => o.title === "Zero");
    expect(paid?.rate).toBe("$100,000–$150,000");
    expect(zero?.rate).toBeNull();
  });

  it("with no skills, returns recent jobs (no match filter)", () => {
    const res = matchOpportunities(
      [job("A", ["x"], "https://x/a"), job("B", ["y"], "https://x/b")],
      [],
    );
    expect(res).toHaveLength(2);
  });

  it("empty / malformed input yields [], never throws", () => {
    expect(matchOpportunities([])).toEqual([]);
    expect(matchOpportunities(null)).toEqual([]);
    expect(matchOpportunities("garbage")).toEqual([]);
  });

  it("respects the limit", () => {
    const jobs = Array.from({ length: 30 }, (_, i) =>
      job("J" + i, ["react"], "https://x/" + i),
    );
    expect(matchOpportunities(jobs, ["react"], 10)).toHaveLength(10);
  });
});
