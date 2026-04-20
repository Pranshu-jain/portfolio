"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Mail, ArrowRight } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { siteConfig } from "@/lib/config";

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const update = (k: string, v: string) =>
    setForm((prev) => ({ ...prev, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    await new Promise((r) => setTimeout(r, 1400));
    setSending(false);
    setSent(true);
  };

  return (
    <section id="contact" className="py-28 relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 100%, rgba(0,212,255,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-5xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-semibold uppercase tracking-wider bg-[rgba(0,212,255,0.08)] text-[#00d4ff] border border-[rgba(0,212,255,0.1)] mb-5">
            Get In Touch
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-5">
            Let&apos;s build something{" "}
            <span className="gradient-text">remarkable</span>
          </h2>
          <p className="text-[#475569] text-lg max-w-2xl mx-auto">
            Have a startup idea, a project, or just want to talk shop? I
            respond within 24 hours.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-8">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="md:col-span-3"
          >
            {sent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full min-h-[300px] flex flex-col items-center justify-center gap-5 p-10 rounded-3xl glass border border-[rgba(0,212,255,0.1)]"
              >
                <div className="text-6xl">🚀</div>
                <h3 className="text-xl font-bold text-white">Message sent!</h3>
                <p className="text-[#475569] text-center text-sm max-w-xs">
                  Thanks for reaching out. I&apos;ll get back to you within 24
                  hours — usually much sooner.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                {[
                  { key: "name",  label: "Your Name",      type: "text",  placeholder: "Alex Chen" },
                  { key: "email", label: "Email Address",   type: "email", placeholder: "alex@startup.com" },
                ].map((f) => (
                  <div key={f.key}>
                    <label className="block text-[10px] font-semibold text-[#475569] mb-2 uppercase tracking-widest">
                      {f.label}
                    </label>
                    <input
                      type={f.type}
                      placeholder={f.placeholder}
                      value={form[f.key as keyof typeof form]}
                      onChange={(e) => update(f.key, e.target.value)}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] text-white placeholder-[#334155] focus:outline-none focus:border-[rgba(0,212,255,0.3)] focus:bg-[rgba(0,212,255,0.02)] transition-all text-sm"
                    />
                  </div>
                ))}

                <div>
                  <label className="block text-[10px] font-semibold text-[#475569] mb-2 uppercase tracking-widest">
                    Message
                  </label>
                  <textarea
                    placeholder="Tell me about your project or idea..."
                    value={form.message}
                    onChange={(e) => update("message", e.target.value)}
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] text-white placeholder-[#334155] focus:outline-none focus:border-[rgba(0,212,255,0.3)] focus:bg-[rgba(0,212,255,0.02)] transition-all text-sm resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={sending}
                  className="flex items-center justify-center gap-2 py-4 rounded-xl btn-gradient text-white font-semibold shine disabled:opacity-60 transition-opacity"
                >
                  {sending ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white/25 border-t-white rounded-full"
                    />
                  ) : (
                    <>
                      <Send size={16} /> Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="md:col-span-2 flex flex-col gap-5"
          >
            {/* Quick links */}
            <div className="p-6 rounded-2xl card-border">
              <h3 className="text-sm font-bold text-white mb-5">Quick Connect</h3>
              <div className="flex flex-col gap-4">
                {[
                  { icon: Mail,         label: "Email",    href: `mailto:${siteConfig.email}`, value: siteConfig.email },
                  { icon: GithubIcon,  label: "GitHub",   href: `https://github.com/${siteConfig.github}`, value: `@${siteConfig.github}` },
                  { icon: LinkedinIcon, label: "LinkedIn", href: siteConfig.linkedin, value: "/in/pranshu" },
                ].map(({ icon: Icon, label, href, value }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.04)] flex items-center justify-center group-hover:border-[rgba(0,212,255,0.2)] transition-colors">
                      <Icon size={13} className="text-[#475569] group-hover:text-[#00d4ff] transition-colors" />
                    </div>
                    <div>
                      <div className="text-[9px] text-[#334155] uppercase tracking-wider">{label}</div>
                      <div className="text-xs text-[#64748b] group-hover:text-white transition-colors truncate max-w-[140px]">
                        {value}
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Book a call */}
            <div className="p-6 rounded-2xl gradient-border relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(0,212,255,0.06),transparent_70%)] pointer-events-none" />
              <div className="relative">
                <div className="text-3xl mb-4">⚡</div>
                <h3 className="font-bold text-white mb-2 text-sm">
                  Skip the form
                </h3>
                <p className="text-[#475569] text-xs mb-5 leading-relaxed">
                  Let&apos;s jump on a quick call and talk about your project
                  directly. No commitment needed.
                </p>
                <a
                  href={siteConfig.calendly}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-[#00d4ff] font-semibold hover:gap-3 transition-all"
                >
                  Book a Call <ArrowRight size={14} />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
