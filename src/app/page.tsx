import Hero from "@/components/Hero";
import StatsBar from "@/components/StatsBar";
import ProjectsSection from "@/components/ProjectsSection";
import Experience from "@/components/Experience";
import DeploymentLoop from "@/components/DeploymentLoop";
import FieldLog from "@/components/FieldLog";
import IntegrationSurface from "@/components/IntegrationSurface";
import BuildWithMe from "@/components/BuildWithMe";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

/**
 * The page is an argument, read top to bottom: here's the claim and the proof
 * numbers → here's what I've built → here's where I've shipped it for a living
 * → here's how I run an engagement → here's what that looks like from the
 * inside → here's what I plug into → here's how to hire me.
 *
 * The Eight Dimensions and the Operating Doctrine live on /about — they're
 * philosophy, and the home page leads with evidence.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <StatsBar />
      <ProjectsSection />
      <Experience />
      <DeploymentLoop />
      <FieldLog />
      <IntegrationSurface />
      <BuildWithMe />
      <ContactSection />
      <Footer />
    </>
  );
}
