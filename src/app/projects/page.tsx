import type { Metadata } from "next";
import ProjectsSection from "@/components/ProjectsSection";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Deployments — Pranshu",
  description:
    "Engagement dossiers: the situation I landed in, the binding constraint, what shipped, and the number that moved.",
};

export default function ProjectsPage() {
  return (
    <>
      <div className="pt-[clamp(64px,9vh,100px)]">
        <ProjectsSection />
      </div>
      <Footer />
    </>
  );
}
