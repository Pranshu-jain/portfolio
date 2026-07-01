import { describe, it, expect } from "vitest";
import { rankDemand, isJob } from "./demand";

const LEGAL = { legal: "See https://remoteok.com/api for terms" };

function job(position: string, tags: string[], salary_min?: number, salary_max?: number) {
  return { position, company: "Acme", tags, salary_min, salary_max };
}

describe("isJob", () => {
  it("rejects the legal-notice element", () => {
    expect(isJob(LEGAL)).toBe(false);
  });
  it("rejects non-objects and empty positions", () => {
    expect(isJob(null)).toBe(false);
    expect(isJob("nope")).toBe(false);
    expect(isJob(42)).toBe(false);
    expect(isJob({ position: "   " })).toBe(false);
  });
  it("accepts a real job", () => {
    expect(isJob(job("Rails Dev", ["rails"]))).toBe(true);
  });
});

describe("rankDemand", () => {
  it("skips the leading legal-notice element", () => {
    const res = rankDemand([LEGAL, job("Dev", ["rails"])]);
    expect(res.totalJobs).toBe(1);
  });

  it("ranks skills by frequency, desc", () => {
    const res = rankDemand([
      LEGAL,
      job("A", ["react", "typescript"]),
      job("B", ["react", "next"]),
      job("C", ["react"]),
    ]);
    expect(res.skills[0]).toMatchObject({ tag: "react", count: 3 });
    expect(res.skills.map((s) => s.tag)).toContain("typescript");
  });

  it("flags the user's own skills (case-insensitive)", () => {
    const res = rankDemand([job("A", ["React", "Go"])], ["react", "rails"]);
    const react = res.skills.find((s) => s.tag === "react");
    const go = res.skills.find((s) => s.tag === "go");
    expect(react?.mine).toBe(true);
    expect(go?.mine).toBe(false);
  });

  it("counts a skill once per posting even if duplicated", () => {
    const res = rankDemand([job("A", ["react", "React", "REACT"])]);
    expect(res.skills[0]).toMatchObject({ tag: "react", count: 1 });
  });

  it("computes rate stats only from jobs with salary", () => {
    const res = rankDemand([
      job("A", ["x"], 100000, 150000),
      job("B", ["x"], 80000, 120000),
      job("C", ["x"]), // no salary
    ]);
    expect(res.rates.withSalary).toBe(2);
    expect(res.rates.min).toBe(80000);
    expect(res.rates.max).toBe(150000);
    expect(res.rates.median).not.toBeNull();
  });

  it("treats RemoteOK's 0 salaries as absent (not $0)", () => {
    const res = rankDemand([
      job("A", ["x"], 0, 0),
      job("B", ["x"], 0, 0),
      job("C", ["x"], 100000, 140000),
    ]);
    expect(res.rates.withSalary).toBe(1);
    expect(res.rates.min).toBe(100000);
    expect(res.rates.max).toBe(140000);
  });

  it("handles a single-sided salary", () => {
    const res = rankDemand([job("A", ["x"], 90000, undefined)]);
    expect(res.rates.withSalary).toBe(1);
    expect(res.rates.min).toBe(90000);
    expect(res.rates.max).toBe(90000);
  });

  it("empty / malformed input yields an empty result, never throws", () => {
    expect(rankDemand([])).toEqual({
      totalJobs: 0,
      skills: [],
      rates: { withSalary: 0, min: null, max: null, median: null },
    });
    expect(rankDemand(null).totalJobs).toBe(0);
    expect(rankDemand("garbage").totalJobs).toBe(0);
    expect(rankDemand([null, 5, "x", { position: "A" }]).totalJobs).toBe(1);
  });

  it("respects the limit", () => {
    const tags = Array.from({ length: 30 }, (_, i) => `skill${i}`);
    const res = rankDemand([job("A", tags)], [], 10);
    expect(res.skills).toHaveLength(10);
  });
});
