import type { Metadata } from "next";
import ProjectsSection from "@/components/ProjectsSection";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Builds",
  description:
    "Build dossiers: the problem, the binding constraint, what shipped, and numbers you can check.",
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
