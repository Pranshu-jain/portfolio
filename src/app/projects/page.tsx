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
      <div className="pt-20">
        <ProjectsSection />
      </div>
      <Footer />
    </>
  );
}
