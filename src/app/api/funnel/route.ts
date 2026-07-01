import { NextRequest, NextResponse } from "next/server";
import { listEntries, createEntry, type FunnelInput } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const entries = await listEntries();
    return NextResponse.json({ entries });
  } catch (err) {
    console.error("[funnel] list failed", err);
    return NextResponse.json(
      { error: "Could not load entries" },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  let body: Partial<FunnelInput>;
  try {
    body = (await req.json()) as Partial<FunnelInput>;
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  if (typeof body.platform !== "string" || body.platform.trim() === "") {
    return NextResponse.json(
      { error: "platform is required" },
      { status: 400 },
    );
  }
  try {
    const entry = await createEntry({
      platform: body.platform.trim(),
      account_status: body.account_status,
      stage: body.stage,
      rate_seen: body.rate_seen ?? null,
      requirements: Array.isArray(body.requirements)
        ? body.requirements
        : [],
      notes: body.notes ?? null,
    });
    return NextResponse.json({ entry }, { status: 201 });
  } catch (err) {
    console.error("[funnel] create failed", err);
    return NextResponse.json(
      { error: "Could not create entry" },
      { status: 500 },
    );
  }
}
