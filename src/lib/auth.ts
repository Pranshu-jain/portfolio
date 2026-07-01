// Signed-cookie auth for the single-user /admin dashboard.
//
// Runs in BOTH the Edge middleware and Node route handlers, so it uses only
// Web Crypto (crypto.subtle) — never node:crypto. Fail-closed: if the required
// env vars are unset, signing throws and verification returns false, so a
// misconfigured deploy denies access rather than granting it.

export const SESSION_COOKIE = "admin_session";
export const DEFAULT_MAX_AGE_MS = 30 * 24 * 60 * 60 * 1000; // 30 days

function base64urlFromBytes(bytes: Uint8Array): string {
  let bin = "";
  for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function base64urlEncode(text: string): string {
  return base64urlFromBytes(new TextEncoder().encode(text));
}

function base64urlDecode(b64url: string): string {
  const b64 = b64url.replace(/-/g, "+").replace(/_/g, "/");
  const bin = atob(b64);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return new TextDecoder().decode(bytes);
}

/** Constant-time string comparison. Returns false on length mismatch. */
export function constantTimeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

async function hmac(payloadB64: string, secret: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(payloadB64),
  );
  return base64urlFromBytes(new Uint8Array(sig));
}

/**
 * Create a signed session token: `<base64url(payload)>.<base64url(hmac)>`.
 * Throws if ADMIN_SESSION_SECRET is unset (fail-closed).
 */
export async function signSession(
  nowMs: number,
  maxAgeMs: number = DEFAULT_MAX_AGE_MS,
): Promise<string> {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) throw new Error("ADMIN_SESSION_SECRET is not set");
  const payloadB64 = base64urlEncode(
    JSON.stringify({ iat: nowMs, exp: nowMs + maxAgeMs }),
  );
  const sig = await hmac(payloadB64, secret);
  return `${payloadB64}.${sig}`;
}

/**
 * Verify a session token: signature must match and it must not be expired.
 * Returns false (never throws) on any malformed/tampered/expired input or if
 * ADMIN_SESSION_SECRET is unset.
 */
export async function verifySession(
  token: string | undefined | null,
  nowMs: number,
): Promise<boolean> {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret || !token) return false;
  const parts = token.split(".");
  if (parts.length !== 2) return false;
  const [payloadB64, sig] = parts;
  let expected: string;
  try {
    expected = await hmac(payloadB64, secret);
  } catch {
    return false;
  }
  if (!constantTimeEqual(sig, expected)) return false;
  try {
    const payload = JSON.parse(base64urlDecode(payloadB64)) as {
      exp?: number;
    };
    if (typeof payload.exp !== "number") return false;
    return nowMs <= payload.exp;
  } catch {
    return false;
  }
}

/**
 * Constant-time check of a submitted password against ADMIN_PASSWORD.
 * Returns false if ADMIN_PASSWORD is unset (fail-closed).
 */
export function verifyPassword(input: string): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  return constantTimeEqual(input, expected);
}
