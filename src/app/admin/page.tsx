import type { Metadata } from "next";
import { auth, signOut } from "@/auth";
import FunnelTable from "@/components/admin/FunnelTable";
import OpportunitiesPanel from "@/components/admin/OpportunitiesPanel";
import DemandPanel from "@/components/admin/DemandPanel";

export const metadata: Metadata = {
  title: "Admin — Go Direct",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  const session = await auth();

  return (
    <div className="min-h-screen bg-[#fafaff] px-6 py-12 max-w-5xl mx-auto">
      <header className="mb-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-semibold uppercase tracking-wider bg-[rgba(14,165,233,0.08)] text-[#0284c7] border border-[rgba(14,165,233,0.1)] mb-3">
              Go Direct
            </div>
            <h1 className="text-3xl font-black text-[#0f172a]">
              Client acquisition <span className="gradient-text">dashboard</span>
            </h1>
          </div>
          {session?.user && (
            <form
              action={async () => {
                "use server";
                await signOut({ redirectTo: "/admin/login" });
              }}
            >
              <div className="text-right">
                <div className="text-xs text-[#64748b] mb-1">
                  {session.user.email}
                </div>
                <button
                  type="submit"
                  className="text-xs text-[#64748b] hover:text-[#0284c7] transition-colors underline"
                >
                  Sign out
                </button>
              </div>
            </form>
          )}
        </div>
        <p className="text-[#64748b] mt-2 text-sm">
          Track marketplace applications and watch where demand is. Apply first —
          the tool only earns its keep once there are rows here.
        </p>
      </header>

      <div className="space-y-6">
        <FunnelTable />
        <OpportunitiesPanel />
        <DemandPanel />
      </div>
    </div>
  );
}
