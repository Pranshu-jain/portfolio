"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, ArrowRight, Loader2, Bot, CheckCircle2 } from "lucide-react";

type Message = { role: "user" | "assistant"; content: string };

type FormData = {
  projectType: string;
  description: string;
  timeline: string;
  budget: string;
  name: string;
  email: string;
};

const PROJECT_TYPES = [
  { id: "New Website / App", emoji: "🚀", desc: "Build from scratch" },
  { id: "Improve Existing Site", emoji: "🔧", desc: "Redesign, speed, UX" },
  { id: "Add New Features", emoji: "⚡", desc: "Extend your product" },
  { id: "AI Integration", emoji: "🤖", desc: "LLMs, agents, automation" },
];

const TIMELINES = ["ASAP (under 2 weeks)", "About 1 month", "2–3 months", "Flexible / Not sure"];
const BUDGETS = ["Under $500", "$500–$1,500", "$1,500–$5,000", "$5,000+", "Let's discuss"];

const GREETING =
  "Hi! I'm Pranshu's assistant. Whether you need a new website, want to improve an existing one, add features, or integrate AI — I'll help capture your requirements. What are you looking to do?";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"chat" | "form">("chat");
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: GREETING },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSubmitBtn, setShowSubmitBtn] = useState(false);

  // Form fallback state
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormData>({
    projectType: "",
    description: "",
    timeline: "",
    budget: "",
    name: "",
    email: "",
  });

  // Contact capture (for chat mode submission)
  const [capturing, setCapturing] = useState(false);
  const [captureName, setCaptureName] = useState("");
  const [captureEmail, setCaptureEmail] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener("open-chat", handler);
    return () => window.removeEventListener("open-chat", handler);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading, capturing]);

  useEffect(() => {
    if (open && mode === "chat" && !capturing) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [open, mode, capturing]);

  const userCount = messages.filter((m) => m.role === "user").length;
  useEffect(() => {
    if (userCount >= 3) setShowSubmitBtn(true);
  }, [userCount]);

  const switchToForm = () => {
    setMode("form");
    setLoading(false);
  };

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;
    setInput("");
    const updated: Message[] = [...messages, { role: "user", content: text }];
    setMessages(updated);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updated }),
      });

      if (!res.ok) {
        switchToForm();
        return;
      }

      const data = await res.json();
      if (data.error) {
        switchToForm();
        return;
      }

      setMessages([...updated, { role: "assistant", content: data.text }]);
    } catch {
      switchToForm();
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const submitChat = async () => {
    setSubmitting(true);
    await fetch("/api/send-summary", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "chat",
        messages,
        visitorName: captureName,
        visitorEmail: captureEmail,
      }),
    });
    setSubmitting(false);
    setDone(true);
  };

  const submitForm = async () => {
    setSubmitting(true);
    await fetch("/api/send-summary", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "form", formData: form }),
    });
    setSubmitting(false);
    setDone(true);
  };

  const updateForm = (key: keyof FormData, val: string) =>
    setForm((p) => ({ ...p, [key]: val }));

  // No sales chat on the private /admin dashboard.
  if (pathname?.startsWith("/admin")) return null;

  return (
    <>
      {/* Floating button */}
      <div className="fixed bottom-6 right-6 z-50">
        <AnimatePresence>
          {!open && (
            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
              onClick={() => setOpen(true)}
              className="relative w-14 h-14 rounded-full btn-gradient text-[#0f172a] shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
              aria-label="Open chat"
            >
              <MessageCircle size={22} />
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#10b981] rounded-full border-2 border-[#fafaff]" />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Chat panel */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 12 }}
              transition={{ type: "spring", stiffness: 300, damping: 26 }}
              className="absolute bottom-0 right-0 w-[360px] max-w-[calc(100vw-24px)] rounded-2xl overflow-hidden shadow-2xl"
              style={{ background: "#ffffff", border: "1px solid rgba(15,23,42,0.09)" }}
            >
              {/* Header */}
              <div
                className="flex items-center justify-between px-4 py-3.5"
                style={{ background: "linear-gradient(135deg,rgba(124,58,237,0.25),rgba(14,165,233,0.12))", borderBottom: "1px solid rgba(15,23,42,0.08)" }}
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full btn-gradient flex items-center justify-center shrink-0">
                    <Bot size={14} className="text-[#0f172a]" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-[#0f172a]">Pranshu&apos;s Assistant</div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]" />
                      <span className="text-[10px] text-[#10b981]">Online</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="w-7 h-7 rounded-full flex items-center justify-center text-[#64748b] hover:text-[#0f172a] hover:bg-white/5 transition-colors"
                >
                  <X size={14} />
                </button>
              </div>

              {/* Body */}
              <div className="flex flex-col" style={{ height: 440 }}>
                {done ? (
                  // ─── Done state ───
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex-1 flex flex-col items-center justify-center gap-4 p-8 text-center"
                  >
                    <div className="w-14 h-14 rounded-full bg-[rgba(16,185,129,0.1)] flex items-center justify-center">
                      <CheckCircle2 size={28} className="text-[#10b981]" />
                    </div>
                    <div>
                      <h3 className="text-[#0f172a] font-bold text-base mb-1.5">Requirements sent!</h3>
                      <p className="text-[#64748b] text-sm leading-relaxed">
                        Pranshu will review and get back to you within 24 hours — usually much sooner.
                      </p>
                    </div>
                    <button
                      onClick={() => setOpen(false)}
                      className="mt-2 px-5 py-2 rounded-full text-xs font-semibold border border-[rgba(15,23,42,0.10)] text-[#475569] hover:text-[#0f172a] transition-colors"
                    >
                      Close
                    </button>
                  </motion.div>
                ) : mode === "chat" ? (
                  // ─── Chat mode ───
                  <>
                    <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3 scrollbar-thin">
                      {messages.map((m, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.25 }}
                          className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                        >
                          <div
                            className={`max-w-[82%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                              m.role === "user"
                                ? "bg-[#7c3aed] text-[#0f172a] rounded-br-sm"
                                : "bg-[rgba(15,23,42,0.06)] text-[#334155] rounded-bl-sm"
                            }`}
                          >
                            {m.content}
                          </div>
                        </motion.div>
                      ))}

                      {loading && (
                        <div className="flex justify-start">
                          <div className="bg-[rgba(15,23,42,0.06)] px-4 py-3 rounded-2xl rounded-bl-sm flex gap-1.5 items-center">
                            {[0, 1, 2].map((i) => (
                              <motion.span
                                key={i}
                                className="w-1.5 h-1.5 rounded-full bg-[#64748b]"
                                animate={{ opacity: [0.3, 1, 0.3] }}
                                transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
                              />
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Contact capture overlay */}
                      {capturing && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-1 p-4 rounded-xl border border-[rgba(124,58,237,0.25)] bg-[rgba(124,58,237,0.06)]"
                        >
                          <p className="text-[#475569] text-xs mb-3 leading-relaxed">
                            Almost done! Share your contact so Pranshu can follow up.
                          </p>
                          <div className="flex flex-col gap-2">
                            <input
                              type="text"
                              placeholder="Your name"
                              value={captureName}
                              onChange={(e) => setCaptureName(e.target.value)}
                              className="w-full px-3 py-2 rounded-lg text-xs bg-[rgba(15,23,42,0.05)] border border-[rgba(15,23,42,0.09)] text-[#0f172a] placeholder-[#94a3b8] focus:outline-none focus:border-[rgba(124,58,237,0.4)] transition-colors"
                            />
                            <input
                              type="email"
                              placeholder="Your email"
                              value={captureEmail}
                              onChange={(e) => setCaptureEmail(e.target.value)}
                              className="w-full px-3 py-2 rounded-lg text-xs bg-[rgba(15,23,42,0.05)] border border-[rgba(15,23,42,0.09)] text-[#0f172a] placeholder-[#94a3b8] focus:outline-none focus:border-[rgba(124,58,237,0.4)] transition-colors"
                            />
                            <div className="flex gap-2 mt-1">
                              <button
                                onClick={() => setCapturing(false)}
                                className="flex-1 py-2 rounded-lg text-xs text-[#475569] border border-[rgba(15,23,42,0.08)] hover:text-[#0f172a] transition-colors"
                              >
                                Back
                              </button>
                              <button
                                onClick={submitChat}
                                disabled={submitting || !captureEmail}
                                className="flex-1 py-2 rounded-lg text-xs font-semibold btn-gradient text-[#0f172a] disabled:opacity-50 flex items-center justify-center gap-1.5"
                              >
                                {submitting ? <Loader2 size={12} className="animate-spin" /> : null}
                                Send to Pranshu
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      )}

                      <div ref={bottomRef} />
                    </div>

                    {/* Submit requirements button */}
                    {showSubmitBtn && !capturing && (
                      <div className="px-4 pb-2">
                        <button
                          onClick={() => setCapturing(true)}
                          className="w-full py-2 rounded-xl text-xs font-semibold border border-[rgba(14,165,233,0.2)] text-[#0284c7] hover:bg-[rgba(14,165,233,0.05)] transition-colors flex items-center justify-center gap-1.5"
                        >
                          <ArrowRight size={12} /> Submit my requirements to Pranshu
                        </button>
                      </div>
                    )}

                    {/* Input */}
                    {!capturing && (
                      <div
                        className="px-3 py-3 flex gap-2 items-center"
                        style={{ borderTop: "1px solid rgba(15,23,42,0.06)" }}
                      >
                        <input
                          ref={inputRef}
                          type="text"
                          value={input}
                          onChange={(e) => setInput(e.target.value)}
                          onKeyDown={handleKeyDown}
                          placeholder="Type your message…"
                          className="flex-1 px-3.5 py-2.5 rounded-xl text-sm bg-[rgba(15,23,42,0.05)] border border-[rgba(15,23,42,0.08)] text-[#0f172a] placeholder-[#94a3b8] focus:outline-none focus:border-[rgba(14,165,233,0.25)] transition-colors"
                        />
                        <button
                          type="button"
                          aria-label="Send message"
                          onClick={sendMessage}
                          disabled={!input.trim() || loading}
                          className="w-9 h-9 rounded-xl btn-gradient flex items-center justify-center shrink-0 disabled:opacity-40 transition-opacity"
                        >
                          <Send size={14} className="text-[#0f172a]" />
                        </button>
                      </div>
                    )}
                  </>
                ) : (
                  // ─── Form fallback mode ───
                  <div className="flex-1 overflow-y-auto px-4 py-4">
                    {step === 0 && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <p className="text-[#475569] text-xs mb-4 leading-relaxed">
                          The AI is temporarily at capacity. Tell me about your project and Pranshu will get back to you.
                        </p>
                        <p className="text-[#0f172a] text-sm font-semibold mb-3">What do you need?</p>
                        <div className="grid grid-cols-2 gap-2">
                          {PROJECT_TYPES.map((t) => (
                            <button
                              key={t.id}
                              onClick={() => {
                                updateForm("projectType", t.id);
                                setStep(1);
                              }}
                              className="p-3 rounded-xl text-left border border-[rgba(15,23,42,0.08)] hover:border-[rgba(124,58,237,0.35)] hover:bg-[rgba(124,58,237,0.05)] transition-all group"
                            >
                              <div className="text-base mb-1">{t.emoji}</div>
                              <div className="text-xs font-semibold text-[#0f172a] leading-tight">{t.id}</div>
                              <div className="text-[10px] text-[#64748b] mt-0.5">{t.desc}</div>
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {step === 1 && (
                      <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col gap-3 h-full">
                        <div>
                          <p className="text-[#0f172a] text-sm font-semibold mb-1">Describe your project</p>
                          <p className="text-[#64748b] text-xs mb-3">What are you building or looking to improve?</p>
                          <textarea
                            value={form.description}
                            onChange={(e) => updateForm("description", e.target.value)}
                            rows={5}
                            placeholder="e.g. I have an e-commerce site that loads slowly and I want to speed it up and redesign the checkout flow..."
                            className="w-full px-3.5 py-3 rounded-xl text-xs bg-[rgba(15,23,42,0.05)] border border-[rgba(15,23,42,0.08)] text-[#0f172a] placeholder-[#94a3b8] focus:outline-none focus:border-[rgba(14,165,233,0.25)] transition-colors resize-none"
                          />
                        </div>
                        <div className="flex gap-2 mt-auto">
                          <button onClick={() => setStep(0)} className="flex-1 py-2.5 rounded-xl text-xs text-[#475569] border border-[rgba(15,23,42,0.08)] hover:text-[#0f172a] transition-colors">
                            Back
                          </button>
                          <button
                            onClick={() => setStep(2)}
                            disabled={!form.description.trim()}
                            className="flex-1 py-2.5 rounded-xl text-xs font-semibold btn-gradient text-[#0f172a] disabled:opacity-40 flex items-center justify-center gap-1.5"
                          >
                            Next <ArrowRight size={11} />
                          </button>
                        </div>
                      </motion.div>
                    )}

                    {step === 2 && (
                      <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col gap-3 h-full">
                        <div>
                          <p className="text-[#0f172a] text-sm font-semibold mb-3">Timeline & Budget</p>
                          <div className="flex flex-col gap-2 mb-3">
                            <label className="text-[10px] text-[#64748b] uppercase tracking-widest">Timeline</label>
                            <div className="grid grid-cols-2 gap-1.5">
                              {TIMELINES.map((t) => (
                                <button
                                  key={t}
                                  onClick={() => updateForm("timeline", t)}
                                  className={`py-2 px-2 rounded-lg text-[11px] border transition-all text-left ${
                                    form.timeline === t
                                      ? "border-[#7c3aed] bg-[rgba(124,58,237,0.12)] text-[#0f172a]"
                                      : "border-[rgba(15,23,42,0.08)] text-[#475569] hover:border-[rgba(15,23,42,0.14)]"
                                  }`}
                                >
                                  {t}
                                </button>
                              ))}
                            </div>
                          </div>
                          <div className="flex flex-col gap-2">
                            <label className="text-[10px] text-[#64748b] uppercase tracking-widest">Budget range</label>
                            <div className="grid grid-cols-2 gap-1.5">
                              {BUDGETS.map((b) => (
                                <button
                                  key={b}
                                  onClick={() => updateForm("budget", b)}
                                  className={`py-2 px-2 rounded-lg text-[11px] border transition-all text-left ${
                                    form.budget === b
                                      ? "border-[#0284c7] bg-[rgba(14,165,233,0.08)] text-[#0f172a]"
                                      : "border-[rgba(15,23,42,0.08)] text-[#475569] hover:border-[rgba(15,23,42,0.14)]"
                                  }`}
                                >
                                  {b}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2 mt-auto pt-2">
                          <button onClick={() => setStep(1)} className="flex-1 py-2.5 rounded-xl text-xs text-[#475569] border border-[rgba(15,23,42,0.08)] hover:text-[#0f172a] transition-colors">
                            Back
                          </button>
                          <button
                            onClick={() => setStep(3)}
                            disabled={!form.timeline || !form.budget}
                            className="flex-1 py-2.5 rounded-xl text-xs font-semibold btn-gradient text-[#0f172a] disabled:opacity-40 flex items-center justify-center gap-1.5"
                          >
                            Next <ArrowRight size={11} />
                          </button>
                        </div>
                      </motion.div>
                    )}

                    {step === 3 && (
                      <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col gap-3 h-full">
                        <div>
                          <p className="text-[#0f172a] text-sm font-semibold mb-1">Your contact info</p>
                          <p className="text-[#64748b] text-xs mb-3">Pranshu will reply within 24 hours.</p>
                          <div className="flex flex-col gap-2.5">
                            <input
                              type="text"
                              placeholder="Your name"
                              value={form.name}
                              onChange={(e) => updateForm("name", e.target.value)}
                              className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-[rgba(15,23,42,0.05)] border border-[rgba(15,23,42,0.08)] text-[#0f172a] placeholder-[#94a3b8] focus:outline-none focus:border-[rgba(14,165,233,0.25)] transition-colors"
                            />
                            <input
                              type="email"
                              placeholder="Your email"
                              value={form.email}
                              onChange={(e) => updateForm("email", e.target.value)}
                              className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-[rgba(15,23,42,0.05)] border border-[rgba(15,23,42,0.08)] text-[#0f172a] placeholder-[#94a3b8] focus:outline-none focus:border-[rgba(14,165,233,0.25)] transition-colors"
                            />
                          </div>
                        </div>
                        <div className="flex gap-2 mt-auto pt-2">
                          <button onClick={() => setStep(2)} className="flex-1 py-2.5 rounded-xl text-xs text-[#475569] border border-[rgba(15,23,42,0.08)] hover:text-[#0f172a] transition-colors">
                            Back
                          </button>
                          <button
                            onClick={submitForm}
                            disabled={submitting || !form.name || !form.email}
                            className="flex-1 py-2.5 rounded-xl text-xs font-semibold btn-gradient text-[#0f172a] disabled:opacity-40 flex items-center justify-center gap-1.5"
                          >
                            {submitting ? <Loader2 size={12} className="animate-spin" /> : null}
                            Send to Pranshu
                          </button>
                        </div>
                      </motion.div>
                    )}

                    <div ref={bottomRef} />
                  </div>
                )}
              </div>

              {/* Footer branding */}
              {!done && (
                <div
                  className="px-4 py-2 text-center"
                  style={{ borderTop: "1px solid rgba(15,23,42,0.05)" }}
                >
                  <span className="text-[10px] text-[#cbd5e1]">Powered by Gemini · Built by Pranshu</span>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
