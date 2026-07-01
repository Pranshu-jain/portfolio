import type { Metadata } from "next";
import FunnelTable from "@/components/admin/FunnelTable";
import DemandPanel from "@/components/admin/DemandPanel";

export const metadata: Metadata = {
  title: "Admin — Go Direct",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-[#050505] px-6 py-12 max-w-5xl mx-auto">
      <header className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-semibold uppercase tracking-wider bg-[rgba(0,212,255,0.08)] text-[#00d4ff] border border-[rgba(0,212,255,0.1)] mb-3">
          Go Direct
        </div>
        <h1 className="text-3xl font-black text-white">
          Client acquisition <span className="gradient-text">dashboard</span>
        </h1>
        <p className="text-[#475569] mt-2 text-sm">
          Track marketplace applications and watch where demand is. Apply first —
          the tool only earns its keep once there are rows here.
        </p>
      </header>

      <div className="space-y-6">
        <FunnelTable />
        <DemandPanel />
      </div>
    </div>
  );
}
