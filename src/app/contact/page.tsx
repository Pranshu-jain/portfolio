import type { Metadata } from "next";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Contact — Pranshu",
  description: "Get in touch to discuss your project, startup idea, or just to say hi.",
};

export default function ContactPage() {
  return (
    <>
      <div className="pt-20">
        <ContactSection />
      </div>
      <Footer />
    </>
  );
}
