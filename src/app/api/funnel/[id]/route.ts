import { NextRequest, NextResponse } from "next/server";
import { updateEntry, deleteEntry, type FunnelInput } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  let body: Partial<FunnelInput>;
  try {
    body = (await req.json()) as Partial<FunnelInput>;
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  try {
    const entry = await updateEntry(id, body);
    if (!entry) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json({ entry });
  } catch (err) {
    console.error("[funnel] update failed", err);
    return NextResponse.json(
      { error: "Could not update entry" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  try {
    const ok = await deleteEntry(id);
    if (!ok) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[funnel] delete failed", err);
    return NextResponse.json(
      { error: "Could not delete entry" },
      { status: 500 },
    );
  }
}
