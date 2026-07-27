import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import Reveal from "@/components/motion/Reveal";
import { blogPosts } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Field notes — Pranshu",
  description:
    "Notes from deployments: architecture decisions, integration patterns, and what actually holds up in production.",
};

export default function BlogPage() {
  return (
    <>
      <section
        data-sheet="Field notes"
        className="sheet pt-[clamp(96px,15vh,150px)]"
      >
        <div className="page">
          <Reveal>
            <div className="sheet-label">
              <span className="num">N</span>
              <span>Field notes</span>
              <span className="rule" />
              <span className="hidden sm:block">
                {blogPosts.length} entries
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <h1 className="display h1 mb-6 max-w-[18ch]">
              What I learned on{" "}
              <span className="text-blue">deployment</span>.
            </h1>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="text-[15px] leading-relaxed text-soft max-w-[56ch] mb-10">
              Architecture decisions, integration patterns, and the tradeoffs
              that only show up once something is running in production.
            </p>
          </Reveal>

          <div className="border-t border-graphite">
            {blogPosts.map((post, i) => (
              <Reveal key={post.slug} delay={i * 0.06}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group grid md:grid-cols-[52px_minmax(0,1fr)_auto] gap-x-[clamp(16px,3vw,36px)] gap-y-3 py-7 border-b border-graphite hover:bg-blue/[0.05] transition-colors"
                >
                  <div className="font-mono text-[11.5px] text-blue font-semibold pt-1">
                    N-{String(i + 1).padStart(2, "0")}
                  </div>

                  <div>
                    <h2 className="display-sm text-[19px] mb-2.5 group-hover:text-blue transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-[13.5px] leading-relaxed text-soft m-0 mb-3.5 max-w-[62ch]">
                      {post.excerpt}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="font-mono text-[10px] px-2 py-0.5 border text-soft"
                          style={{ borderColor: "var(--line)" }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mono !text-[9px] !tracking-[0.11em] md:text-right md:pt-1 whitespace-nowrap">
                    {post.date}
                    <span className="block mt-1 text-faint">
                      {post.readTime} read
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
