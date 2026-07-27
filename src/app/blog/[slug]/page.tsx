import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Footer from "@/components/Footer";
import { blogPosts } from "@/lib/projects";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return { title: "Note not found — Pranshu" };
  return {
    title: `${post.title} — Pranshu`,
    description: post.excerpt,
    openGraph: { title: post.title, description: post.excerpt, type: "article" },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) notFound();

  const index = blogPosts.findIndex((p) => p.slug === slug);
  const next = blogPosts[(index + 1) % blogPosts.length];

  return (
    <>
      <section
        data-sheet="Field note"
        className="sheet pt-[clamp(96px,15vh,150px)]"
      >
        <div className="page">
          <div className="max-w-[68ch]">
            <Link
              href="/blog"
              className="mono !text-[9.5px] inline-flex items-center gap-2 hover:text-ink transition-colors mb-8"
            >
              <ArrowLeft size={12} /> All field notes
            </Link>

            <div className="sheet-label">
              <span className="num">N-{String(index + 1).padStart(2, "0")}</span>
              <span>Field note</span>
              <span className="rule" />
              <span className="hidden sm:block">
                {post.date} · {post.readTime}
              </span>
            </div>

            <h1 className="display text-[clamp(1.9rem,3.6vw,2.9rem)] mb-6">
              {post.title}
            </h1>

            <p className="text-[clamp(1rem,1.3vw,1.1rem)] leading-[1.62] text-graphite border-l-2 border-blue pl-5 mb-10">
              {post.excerpt}
            </p>

            <div className="flex flex-wrap gap-1.5 mb-10">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-[10px] px-2 py-1 border text-soft"
                  style={{ borderColor: "var(--line)" }}
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="border-t border-graphite pt-9">
              {post.content.map((block, i) => {
                if (block.type === "heading") {
                  return (
                    <h2
                      key={i}
                      className="display-sm text-[19px] mt-9 mb-3.5 first:mt-0"
                    >
                      {block.text}
                    </h2>
                  );
                }
                if (block.type === "list") {
                  return (
                    <ul key={i} className="list-none m-0 p-0 my-5">
                      {block.items.map((item) => (
                        <li
                          key={item}
                          className="relative pl-5 py-1.5 text-[15px] leading-relaxed text-graphite"
                        >
                          <span className="absolute left-0 top-[15px] w-[9px] h-px bg-blue" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  );
                }
                return (
                  <p
                    key={i}
                    className="text-[15px] leading-[1.75] text-graphite mb-5"
                  >
                    {block.text}
                  </p>
                );
              })}
            </div>

            {blogPosts.length > 1 && (
              <div className="border-t border-graphite mt-12 pt-7">
                <div className="mono !text-[9.5px] mb-3">Next note</div>
                <Link href={`/blog/${next.slug}`} className="group block">
                  <h3 className="display-sm text-[17px] group-hover:text-blue transition-colors mb-2">
                    {next.title}
                  </h3>
                  <p className="text-[13.5px] text-soft m-0 max-w-[60ch]">
                    {next.excerpt}
                  </p>
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
