"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Mail, ArrowRight, AlertCircle } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { siteConfig } from "@/lib/config";
import { engagements } from "@/lib/fde";
import SectionHeading from "@/components/motion/SectionHeading";
import Reveal from "@/components/motion/Reveal";
import Magnetic from "@/components/motion/Magnetic";

const TIMELINES = ["ASAP", "This month", "This quarter", "Exploring"];

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactSection() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    engagement: engagements[1].name,
    timeline: TIMELINES[1],
    message: "",
  });
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const update = (k: string, v: string) =>
    setForm((prev) => ({ ...prev, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setError("");

    try {
      const res = await fetch("/api/send-summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "form",
          formData: {
            projectType: form.engagement,
            description: form.message,
            timeline: form.timeline,
            budget: "Not specified",
            name: form.name,
            email: form.email,
          },
        }),
      });

      if (!res.ok) {
        // 503 means the mail key isn't configured — say so rather than
        // pretending the message went somewhere.
        setError(
          res.status === 503
            ? "Email delivery isn't configured on this deployment yet."
            : "That didn't send. Email me directly and it'll reach me.",
        );
        setStatus("error");
        return;
      }

      setStatus("sent");
    } catch {
      setError("Network error. Email me directly and it'll reach me.");
      setStatus("error");
    }
  };

  const sending = status === "sending";

  return (
    <section id="contact" className="py-28 relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 100%, rgba(0,212,255,0.05) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-5xl mx-auto px-6">
        <SectionHeading
          eyebrow="Start an Engagement"
          accent="#00d4ff"
          align="center"
          title={
            <>
              Tell me what&apos;s{" "}
              <span className="gradient-text">actually broken</span>
            </>
          }
          description="Not the feature request — the thing behind it. Rough is fine; the first job of an engagement is turning rough into a spec. I reply within 24 hours."
          className="mb-16"
        />

        <div className="grid md:grid-cols-5 gap-8">
          {/* Form */}
          <Reveal direction="right" className="md:col-span-3">
            <AnimatePresence mode="wait">
              {status === "sent" ? (
                <motion.div
                  key="sent"
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="h-full min-h-[340px] flex flex-col items-center justify-center gap-5 p-10 rounded-3xl glass border border-[rgba(0,212,255,0.12)]"
                >
                  <motion.div
                    initial={{ y: 12, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="text-5xl"
                  >
                    🛬
                  </motion.div>
                  <h3 className="text-xl font-bold text-white">Received.</h3>
                  <p className="text-[#64748b] text-center text-sm max-w-xs leading-relaxed">
                    I&apos;ll come back within 24 hours with either a first read
                    on the constraint or the questions I need answered to give
                    you one.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-5"
                >
                  <div className="grid sm:grid-cols-2 gap-5">
                    {[
                      { key: "name", label: "Your Name", type: "text", placeholder: "Alex Chen" },
                      { key: "email", label: "Work Email", type: "email", placeholder: "alex@company.com" },
                    ].map((f) => (
                      <div key={f.key}>
                        <label
                          htmlFor={f.key}
                          className="block mono text-[10px] font-semibold text-[#475569] mb-2 uppercase tracking-widest"
                        >
                          {f.label}
                        </label>
                        <input
                          id={f.key}
                          type={f.type}
                          placeholder={f.placeholder}
                          value={form[f.key as keyof typeof form]}
                          onChange={(e) => update(f.key, e.target.value)}
                          required
                          className="w-full px-4 py-3 rounded-xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] text-white placeholder-[#334155] focus:outline-none focus:border-[rgba(0,212,255,0.35)] focus:bg-[rgba(0,212,255,0.02)] transition-all text-sm"
                        />
                      </div>
                    ))}
                  </div>

                  {/* Engagement shape */}
                  <div>
                    <span className="block mono text-[10px] font-semibold text-[#475569] mb-2 uppercase tracking-widest">
                      Engagement shape
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {engagements.map((eng) => {
                        const active = form.engagement === eng.name;
                        return (
                          <button
                            key={eng.id}
                            type="button"
                            onClick={() => update("engagement", eng.name)}
                            aria-pressed={active}
                            className="px-4 py-2 rounded-xl text-xs font-semibold border transition-all duration-200"
                            style={{
                              background: active ? `${eng.color}16` : "rgba(255,255,255,0.02)",
                              borderColor: active ? `${eng.color}44` : "rgba(255,255,255,0.06)",
                              color: active ? eng.color : "#64748b",
                            }}
                          >
                            {eng.name}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Timeline */}
                  <div>
                    <span className="block mono text-[10px] font-semibold text-[#475569] mb-2 uppercase tracking-widest">
                      Timeline
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {TIMELINES.map((t) => {
                        const active = form.timeline === t;
                        return (
                          <button
                            key={t}
                            type="button"
                            onClick={() => update("timeline", t)}
                            aria-pressed={active}
                            className={`px-4 py-2 rounded-xl text-xs font-medium border transition-all duration-200 ${
                              active
                                ? "border-[rgba(0,212,255,0.35)] bg-[rgba(0,212,255,0.08)] text-[#00d4ff]"
                                : "border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] text-[#64748b] hover:text-white"
                            }`}
                          >
                            {t}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block mono text-[10px] font-semibold text-[#475569] mb-2 uppercase tracking-widest"
                    >
                      What&apos;s the situation?
                    </label>
                    <textarea
                      id="message"
                      placeholder="What the team is doing manually today, what's blocking it, and what would count as this being fixed..."
                      value={form.message}
                      onChange={(e) => update("message", e.target.value)}
                      required
                      rows={5}
                      className="w-full px-4 py-3 rounded-xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] text-white placeholder-[#334155] focus:outline-none focus:border-[rgba(0,212,255,0.35)] focus:bg-[rgba(0,212,255,0.02)] transition-all text-sm resize-none"
                    />
                  </div>

                  {status === "error" && (
                    <motion.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-start gap-2.5 px-4 py-3 rounded-xl bg-[rgba(239,68,68,0.06)] border border-[rgba(239,68,68,0.18)]"
                      role="alert"
                    >
                      <AlertCircle size={14} className="text-[#ef4444] shrink-0 mt-0.5" />
                      <span className="text-xs text-[#fca5a5] leading-relaxed">
                        {error}{" "}
                        <a
                          href={`mailto:${siteConfig.email}`}
                          className="underline hover:text-white"
                        >
                          {siteConfig.email}
                        </a>
                      </span>
                    </motion.div>
                  )}

                  <Magnetic strength={0.15}>
                    <button
                      type="submit"
                      disabled={sending}
                      className="w-full flex items-center justify-center gap-2 py-4 rounded-xl btn-gradient text-white font-semibold shine disabled:opacity-60 transition-opacity"
                    >
                      {sending ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
                          className="w-5 h-5 border-2 border-white/25 border-t-white rounded-full"
                        />
                      ) : (
                        <>
                          <Send size={16} /> Send Brief
                        </>
                      )}
                    </button>
                  </Magnetic>
                </motion.form>
              )}
            </AnimatePresence>
          </Reveal>

          {/* Sidebar */}
          <Reveal direction="left" delay={0.12} className="md:col-span-2">
            <div className="flex flex-col gap-5 h-full">
              <div className="p-6 rounded-2xl card-border">
                <h3 className="text-sm font-bold text-white mb-5">
                  Direct channels
                </h3>
                <div className="flex flex-col gap-4">
                  {[
                    {
                      icon: Mail,
                      label: "Email",
                      href: `mailto:${siteConfig.email}`,
                      value: siteConfig.email,
                    },
                    {
                      icon: GithubIcon,
                      label: "GitHub",
                      href: `https://github.com/${siteConfig.github}`,
                      value: `@${siteConfig.github}`,
                    },
                    {
                      icon: LinkedinIcon,
                      label: "LinkedIn",
                      href: siteConfig.linkedin,
                      value: "/in/pranshu-jain",
                    },
                  ].map(({ icon: Icon, label, href, value }) => (
                    <motion.a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ x: 3 }}
                      transition={{ type: "spring", stiffness: 400, damping: 20 }}
                      className="flex items-center gap-3 group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.04)] flex items-center justify-center group-hover:border-[rgba(0,212,255,0.25)] transition-colors">
                        <Icon
                          size={13}
                          className="text-[#475569] group-hover:text-[#00d4ff] transition-colors"
                        />
                      </div>
                      <div className="min-w-0">
                        <div className="mono text-[9px] text-[#334155] uppercase tracking-wider">
                          {label}
                        </div>
                        <div className="text-xs text-[#64748b] group-hover:text-white transition-colors truncate max-w-[150px]">
                          {value}
                        </div>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </div>

              <div className="p-6 rounded-2xl gradient-border relative overflow-hidden flex-1">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(0,212,255,0.07),transparent_70%)] pointer-events-none" />
                <div className="relative">
                  <div className="text-3xl mb-4">📞</div>
                  <h3 className="font-bold text-white mb-2 text-sm">
                    Skip the form
                  </h3>
                  <p className="text-[#475569] text-xs mb-5 leading-relaxed">
                    Thirty minutes on a call usually surfaces the real
                    constraint faster than any written brief. No commitment.
                  </p>
                  <a
                    href={siteConfig.calendly}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-[#00d4ff] font-semibold hover:gap-3 transition-all"
                  >
                    Book a call <ArrowRight size={14} />
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
