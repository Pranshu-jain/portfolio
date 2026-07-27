import type { Metadata } from "next";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Contact — Pranshu, Forward Deployed Engineer",
  description:
    "Tell me what's actually broken. Rough is fine — turning rough into a spec is the first phase of the engagement.",
};

export default function ContactPage() {
  return (
    <>
      <div className="pt-[clamp(64px,9vh,100px)]">
        <ContactSection />
      </div>
      <Footer />
    </>
  );
}
