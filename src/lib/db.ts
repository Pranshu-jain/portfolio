// Neon Postgres access for the funnel tracker. Centralizes all SQL so routes
// stay thin (DRY). Uses the serverless HTTP driver, which works in Vercel
// serverless/edge functions.

import { neon } from "@neondatabase/serverless";

export interface FunnelEntry {
  id: string;
  platform: string;
  account_status: string; // none|created|vetting|approved|rejected
  stage: string; // applied|interview|offer|won|lost
  rate_seen: string | null;
  requirements: string[];
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface FunnelInput {
  platform: string;
  account_status?: string;
  stage?: string;
  rate_seen?: string | null;
  requirements?: string[];
  notes?: string | null;
}

type Sql = ReturnType<typeof neon>;
let _sql: Sql | null = null;

function getSql(): Sql {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL is not set");
  if (!_sql) _sql = neon(url);
  return _sql;
}

let ensured = false;
/** Idempotent table creation; runs at most once per warm instance. */
export async function ensureFunnelTable(): Promise<void> {
  if (ensured) return;
  const sql = getSql();
  await sql`
    CREATE TABLE IF NOT EXISTS funnel_entries (
      id             uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      platform       text NOT NULL,
      account_status text NOT NULL DEFAULT 'none',
      stage          text NOT NULL DEFAULT 'applied',
      rate_seen      text,
      requirements   text[] NOT NULL DEFAULT '{}',
      notes          text,
      created_at     timestamptz NOT NULL DEFAULT now(),
      updated_at     timestamptz NOT NULL DEFAULT now()
    )
  `;
  ensured = true;
}

export async function listEntries(): Promise<FunnelEntry[]> {
  await ensureFunnelTable();
  const sql = getSql();
  const rows = (await sql`
    SELECT * FROM funnel_entries ORDER BY updated_at DESC
  `) as unknown as FunnelEntry[];
  return rows;
}

export async function createEntry(input: FunnelInput): Promise<FunnelEntry> {
  await ensureFunnelTable();
  const sql = getSql();
  const rows = (await sql`
    INSERT INTO funnel_entries (platform, account_status, stage, rate_seen, requirements, notes)
    VALUES (
      ${input.platform},
      ${input.account_status ?? "none"},
      ${input.stage ?? "applied"},
      ${input.rate_seen ?? null},
      ${input.requirements ?? []},
      ${input.notes ?? null}
    )
    RETURNING *
  `) as unknown as FunnelEntry[];
  return rows[0];
}

/** Partial update: undefined fields keep their current value (COALESCE). */
export async function updateEntry(
  id: string,
  patch: Partial<FunnelInput>,
): Promise<FunnelEntry | null> {
  await ensureFunnelTable();
  const sql = getSql();
  const rows = (await sql`
    UPDATE funnel_entries SET
      platform       = COALESCE(${patch.platform ?? null}, platform),
      account_status = COALESCE(${patch.account_status ?? null}, account_status),
      stage          = COALESCE(${patch.stage ?? null}, stage),
      rate_seen      = COALESCE(${patch.rate_seen ?? null}, rate_seen),
      requirements   = COALESCE(${patch.requirements ?? null}, requirements),
      notes          = COALESCE(${patch.notes ?? null}, notes),
      updated_at     = now()
    WHERE id = ${id}
    RETURNING *
  `) as unknown as FunnelEntry[];
  return rows[0] ?? null;
}

export async function deleteEntry(id: string): Promise<boolean> {
  await ensureFunnelTable();
  const sql = getSql();
  const rows = (await sql`DELETE FROM funnel_entries WHERE id = ${id} RETURNING id`) as unknown as {
    id: string;
  }[];
  return rows.length > 0;
}
