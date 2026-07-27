import Hero from "@/components/Hero";
import StatsBar from "@/components/StatsBar";
import FDEDimensions from "@/components/FDEDimensions";
import ProjectsSection from "@/components/ProjectsSection";
import DeploymentLoop from "@/components/DeploymentLoop";
import FieldLog from "@/components/FieldLog";
import IntegrationSurface from "@/components/IntegrationSurface";
import BuildWithMe from "@/components/BuildWithMe";
import Philosophy from "@/components/Philosophy";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

/**
 * The page is an argument, read top to bottom: here's the role → here's the
 * evidence on all eight axes → here's what I actually deployed → here's how I
 * run an engagement → here's what it looks like from the inside → here's what
 * I plug into → here's how to hire me.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <StatsBar />
      <FDEDimensions />
      <ProjectsSection />
      <DeploymentLoop />
      <FieldLog />
      <IntegrationSurface />
      <BuildWithMe />
      <Philosophy />
      <ContactSection />
      <Footer />
    </>
  );
}
