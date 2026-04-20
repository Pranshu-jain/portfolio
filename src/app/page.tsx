import Hero from "@/components/Hero";
import StatsBar from "@/components/StatsBar";
import ProjectsSection from "@/components/ProjectsSection";
import BuildWithMe from "@/components/BuildWithMe";
import AIShowcase from "@/components/AIShowcase";
import Philosophy from "@/components/Philosophy";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Hero />
      <StatsBar />
      <ProjectsSection />
      <BuildWithMe />
      <AIShowcase />
      <Philosophy />
      <ContactSection />
      <Footer />
    </>
  );
}
