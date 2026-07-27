"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, AlertCircle } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { siteConfig } from "@/lib/config";
import { engagements } from "@/lib/fde";
import SectionHeading from "@/components/motion/SectionHeading";
import Reveal from "@/components/motion/Reveal";

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

  const chip = (active: boolean) =>
    `px-3.5 py-2 border font-mono text-[10px] tracking-[0.1em] uppercase transition-colors duration-150 ${
      active
        ? "border-blue bg-blue text-white"
        : "border-graphite text-graphite hover:bg-graphite hover:text-stock"
    }`;

  return (
    <section id="contact" data-sheet="Start a survey" className="sheet">
      <div className="page">
        <SectionHeading
          number="09"
          name="Start a survey"
          title={
            <>
              Tell me the rule you{" "}
              <span className="text-blue">can&rsquo;t change</span>.
            </>
          }
          description="Not the feature request — the condition underneath it. Rough is fine; turning rough into a spec is the first phase of the work, not a prerequisite for it."
          className="mb-9"
        />

        <div className="grid md:grid-cols-[minmax(0,1.35fr)_minmax(0,0.85fr)] gap-[clamp(24px,4vw,48px)]">
          <Reveal>
            <AnimatePresence mode="wait">
              {status === "sent" ? (
                <motion.div
                  key="sent"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="panel p-8 min-h-[300px] flex flex-col justify-center"
                >
                  <div className="mono !text-[9.5px] mb-3">Received</div>
                  <h3 className="display-sm text-xl mb-3">
                    Logged. I&rsquo;ll come back within 24 hours.
                  </h3>
                  <p className="text-[14px] text-soft m-0 max-w-[44ch]">
                    Either with a first read on the constraint, or with the
                    questions I need answered to give you one.
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
                      { key: "name", label: "Your name", type: "text", placeholder: "Alex Chen" },
                      { key: "email", label: "Work email", type: "email", placeholder: "alex@company.com" },
                    ].map((f) => (
                      <div key={f.key}>
                        <label htmlFor={f.key} className="mono !text-[9.5px] block mb-2">
                          {f.label}
                        </label>
                        <input
                          id={f.key}
                          type={f.type}
                          placeholder={f.placeholder}
                          value={form[f.key as keyof typeof form]}
                          onChange={(e) => update(f.key, e.target.value)}
                          required
                          className="field"
                        />
                      </div>
                    ))}
                  </div>

                  <div>
                    <span className="mono !text-[9.5px] block mb-2">
                      Engagement shape
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {engagements.map((eng) => (
                        <button
                          key={eng.id}
                          type="button"
                          onClick={() => update("engagement", eng.name)}
                          aria-pressed={form.engagement === eng.name}
                          className={chip(form.engagement === eng.name)}
                        >
                          {eng.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="mono !text-[9.5px] block mb-2">Timeline</span>
                    <div className="flex flex-wrap gap-2">
                      {TIMELINES.map((t) => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => update("timeline", t)}
                          aria-pressed={form.timeline === t}
                          className={chip(form.timeline === t)}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="mono !text-[9.5px] block mb-2">
                      What&rsquo;s the situation?
                    </label>
                    <textarea
                      id="message"
                      placeholder="What the team does manually today, what blocks it, and what would count as this being fixed..."
                      value={form.message}
                      onChange={(e) => update("message", e.target.value)}
                      required
                      rows={5}
                      className="field resize-none"
                    />
                  </div>

                  {status === "error" && (
                    <div className="note flex items-start gap-2.5" role="alert">
                      <AlertCircle size={14} className="text-bind-ink shrink-0 mt-0.5" />
                      <span className="text-[12.5px] leading-relaxed text-ink">
                        {error}{" "}
                        <a href={`mailto:${siteConfig.email}`} className="underline">
                          {siteConfig.email}
                        </a>
                      </span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={sending}
                    className="btn btn-solid justify-center disabled:opacity-60"
                  >
                    {sending ? "Sending…" : "Send brief"}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </Reveal>

          <Reveal direction="left" delay={0.1}>
            <div className="flex flex-col gap-5">
              <div className="panel p-6">
                <div className="mono !text-[9.5px] mb-4">Direct channels</div>
                <div className="flex flex-col gap-3.5">
                  {[
                    { icon: Mail, label: "Email", href: `mailto:${siteConfig.email}`, value: siteConfig.email },
                    { icon: GithubIcon, label: "GitHub", href: `https://github.com/${siteConfig.github}`, value: `@${siteConfig.github}` },
                    { icon: LinkedinIcon, label: "LinkedIn", href: siteConfig.linkedin, value: "/in/pranshu-jain" },
                  ].map(({ icon: Icon, label, href, value }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 group"
                    >
                      <div className="w-8 h-8 border border-graphite flex items-center justify-center group-hover:bg-graphite group-hover:text-stock transition-colors">
                        <Icon size={13} />
                      </div>
                      <div className="min-w-0">
                        <div className="mono !text-[8.5px] !tracking-[0.11em]">
                          {label}
                        </div>
                        <div className="text-[12.5px] text-graphite truncate max-w-[170px]">
                          {value}
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              <div className="panel p-6 flex-1">
                <div className="mono !text-[9.5px] mb-3">Skip the form</div>
                <p className="text-[13px] leading-relaxed text-soft m-0 mb-5">
                  Thirty minutes on a call usually surfaces the real constraint
                  faster than any written brief. No commitment.
                </p>
                <a
                  href={siteConfig.calendly}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-sm"
                >
                  Book 30 minutes
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
