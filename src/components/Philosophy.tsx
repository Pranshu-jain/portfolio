"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const principles = [
  {
    n: "01",
    title: "Execution > Perfection",
    desc: "A shipped product beats a perfect idea in a deck every time. I move fast, iterate with users, and ship before overthinking.",
    color: "#00d4ff",
  },
  {
    n: "02",
    title: "AI is a Multiplier",
    desc: "I don't just use AI tools — I architect systems around them. Every hour saved by AI is reinvested into higher-leverage work.",
    color: "#7c3aed",
  },
  {
    n: "03",
    title: "Build for Impact",
    desc: "Code is the easy part. The hard part is building something people actually use and love. I obsess over both simultaneously.",
    color: "#ff6b35",
  },
  {
    n: "04",
    title: "Systems Thinking",
    desc: "I see the forest and the trees. Products, workflows, and teams — I build systems that compound in value over time.",
    color: "#22c55e",
  },
];

export default function Philosophy() {
  return (
    <section className="py-28 relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 50% at 100% 0%, rgba(0,212,255,0.04) 0%, transparent 60%), radial-gradient(ellipse 40% 40% at 0% 100%, rgba(124,58,237,0.05) 0%, transparent 60%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-semibold uppercase tracking-wider bg-[rgba(255,255,255,0.04)] text-[#64748b] border border-[rgba(255,255,255,0.06)] mb-5">
            My Philosophy
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-5 leading-tight">
            How I <span className="gradient-text">think & build</span>
          </h2>
          <p className="text-[#475569] max-w-lg text-lg">
            People hire thinking, not just skills. Here&apos;s the mindset
            behind everything I build.
          </p>
        </motion.div>

        {/* Big quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="relative p-8 sm:p-12 rounded-3xl glass border border-[rgba(255,255,255,0.05)] mb-16 overflow-hidden"
        >
          {/* BG glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,rgba(0,212,255,0.04)_0%,transparent_70%)] pointer-events-none" />

          <Quote
            size={36}
            className="text-[#00d4ff] mb-6 opacity-40"
            aria-hidden="true"
          />
          <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight italic mb-6">
            &ldquo;If the portfolio is this good, imagine what he can build for
            me.&rdquo;
          </p>
          <p className="text-[#334155] text-sm">
            — The goal every time someone lands here
          </p>
        </motion.div>

        {/* Principles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {principles.map((p, i) => (
            <motion.div
              key={p.n}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative p-7 rounded-2xl card-border overflow-hidden group"
            >
              {/* Watermark */}
              <span className="absolute top-4 right-5 text-7xl font-black opacity-[0.03] text-white select-none group-hover:opacity-[0.06] transition-opacity">
                {p.n}
              </span>

              <div
                className="w-7 h-1 rounded-full mb-5"
                style={{ background: p.color }}
              />
              <h3 className="text-xl font-bold text-white mb-3">{p.title}</h3>
              <p className="text-[#475569] text-sm leading-relaxed">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
