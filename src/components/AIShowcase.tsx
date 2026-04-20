"use client";

import { motion } from "framer-motion";
import { Brain, Code2, MessageSquare, Sparkles, Database, Cpu, Workflow, Zap } from "lucide-react";

const aiTools = [
  { name: "Claude AI", cat: "LLM", emoji: "🧠", desc: "Complex reasoning & code generation", color: "#FF6B35" },
  { name: "GPT-4o", cat: "LLM", emoji: "⚡", desc: "Fast generation & function calling", color: "#00d4ff" },
  { name: "LangChain", cat: "Framework", emoji: "🔗", desc: "Agent orchestration", color: "#7c3aed" },
  { name: "Vercel AI SDK", cat: "Framework", emoji: "🚀", desc: "Streaming AI in Next.js", color: "#22c55e" },
  { name: "Cursor", cat: "Dev Tool", emoji: "🎯", desc: "AI-powered code editor", color: "#f59e0b" },
  { name: "Copilot", cat: "Dev Tool", emoji: "🤖", desc: "AI pair programming", color: "#6366f1" },
];

const capabilities = [
  { icon: Code2,       title: "AI Code Generation",  desc: "3× more code, same time window",               color: "#00d4ff" },
  { icon: Brain,       title: "Intelligent Agents",   desc: "Autonomous multi-step task execution",          color: "#7c3aed" },
  { icon: MessageSquare, title: "Chat Interfaces",    desc: "Production LLM-powered UIs",                    color: "#ff6b35" },
  { icon: Sparkles,    title: "Content Pipelines",    desc: "Automated generation workflows",                color: "#f59e0b" },
  { icon: Database,    title: "AI Data Analysis",     desc: "Smart processing & insight extraction",         color: "#22c55e" },
  { icon: Workflow,    title: "Workflow Automation",  desc: "End-to-end process orchestration",              color: "#6366f1" },
];

export default function AIShowcase() {
  return (
    <section className="py-28 relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 50%, rgba(0,212,255,0.02) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-semibold uppercase tracking-wider bg-[rgba(255,107,53,0.08)] text-[#ff6b35] border border-[rgba(255,107,53,0.12)] mb-5">
            AI Arsenal
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-5">
            AI I use{" "}
            <span className="gradient-text">every single day</span>
          </h2>
          <p className="text-[#475569] max-w-xl mx-auto text-lg">
            Not just using AI as a tool — integrating it into every layer of the
            development process.
          </p>
        </motion.div>

        {/* Tool chips */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 mb-16">
          {aiTools.map((tool, i) => (
            <motion.div
              key={tool.name}
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.4 }}
              whileHover={{ scale: 1.07, y: -4 }}
              className="p-4 rounded-2xl card-border text-center group"
            >
              <div className="text-2xl mb-2">{tool.emoji}</div>
              <div className="text-[11px] font-bold text-white mb-0.5">
                {tool.name}
              </div>
              <div
                className="text-[9px] uppercase tracking-wider font-semibold mb-2"
                style={{ color: tool.color }}
              >
                {tool.cat}
              </div>
              <div className="text-[9px] text-[#334155] leading-tight opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                {tool.desc}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Capabilities */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {capabilities.map((cap, i) => (
            <motion.div
              key={cap.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="flex items-start gap-4 p-5 rounded-2xl card-border group"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-110"
                style={{ background: `${cap.color}12` }}
              >
                <cap.icon size={17} style={{ color: cap.color }} />
              </div>
              <div>
                <h3 className="font-bold text-white text-sm mb-1">{cap.title}</h3>
                <p className="text-[#475569] text-xs leading-relaxed">{cap.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
