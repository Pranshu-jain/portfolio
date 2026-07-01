import { describe, it, expect, beforeEach, afterEach } from "vitest";
import {
  signSession,
  verifySession,
  verifyPassword,
  constantTimeEqual,
  DEFAULT_MAX_AGE_MS,
} from "./auth";

const NOW = 1_000_000_000_000;

describe("constantTimeEqual", () => {
  it("true for equal strings", () => {
    expect(constantTimeEqual("hunter2", "hunter2")).toBe(true);
  });
  it("false for different strings of same length", () => {
    expect(constantTimeEqual("aaaaaaa", "aaaaaab")).toBe(false);
  });
  it("false for different lengths", () => {
    expect(constantTimeEqual("abc", "abcd")).toBe(false);
  });
});

describe("session sign/verify", () => {
  beforeEach(() => {
    process.env.ADMIN_SESSION_SECRET = "test-secret-value";
  });
  afterEach(() => {
    delete process.env.ADMIN_SESSION_SECRET;
  });

  it("signs then verifies a fresh token", async () => {
    const token = await signSession(NOW);
    expect(await verifySession(token, NOW + 1000)).toBe(true);
  });

  it("rejects an expired token", async () => {
    const token = await signSession(NOW, 1000);
    expect(await verifySession(token, NOW + 2000)).toBe(false);
  });

  it("rejects a tampered signature", async () => {
    const token = await signSession(NOW);
    const tampered = token.slice(0, -1) + (token.endsWith("a") ? "b" : "a");
    expect(await verifySession(tampered, NOW)).toBe(false);
  });

  it("rejects a tampered payload (exp extended)", async () => {
    const token = await signSession(NOW, 1000);
    const [, sig] = token.split(".");
    const forged =
      Buffer.from(JSON.stringify({ iat: NOW, exp: NOW + 1e12 }))
        .toString("base64")
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/, "") +
      "." +
      sig;
    expect(await verifySession(forged, NOW)).toBe(false);
  });

  it("rejects malformed tokens", async () => {
    expect(await verifySession("", NOW)).toBe(false);
    expect(await verifySession("no-dot", NOW)).toBe(false);
    expect(await verifySession("a.b.c", NOW)).toBe(false);
    expect(await verifySession(undefined, NOW)).toBe(false);
  });

  it("fails closed when the secret is unset", async () => {
    const token = await signSession(NOW);
    delete process.env.ADMIN_SESSION_SECRET;
    expect(await verifySession(token, NOW)).toBe(false);
  });

  it("signSession throws when secret is unset", async () => {
    delete process.env.ADMIN_SESSION_SECRET;
    await expect(signSession(NOW)).rejects.toThrow();
  });

  it("default max age is 30 days", () => {
    expect(DEFAULT_MAX_AGE_MS).toBe(30 * 24 * 60 * 60 * 1000);
  });
});

describe("verifyPassword", () => {
  afterEach(() => {
    delete process.env.ADMIN_PASSWORD;
  });
  it("true for correct password", () => {
    process.env.ADMIN_PASSWORD = "correct horse";
    expect(verifyPassword("correct horse")).toBe(true);
  });
  it("false for wrong password", () => {
    process.env.ADMIN_PASSWORD = "correct horse";
    expect(verifyPassword("battery staple")).toBe(false);
  });
  it("fails closed when ADMIN_PASSWORD is unset", () => {
    expect(verifyPassword("anything")).toBe(false);
  });
});
