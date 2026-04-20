import type { Metadata } from "next";
import ProjectsSection from "@/components/ProjectsSection";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Projects — Pranshu",
  description: "A showcase of products built fast using AI — from MVPs to full-scale automation systems.",
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
