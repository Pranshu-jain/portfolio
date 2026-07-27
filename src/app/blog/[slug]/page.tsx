import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";
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
  if (!post) return { title: "Post not found — Pranshu" };
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

  return (
    <>
      <article className="pt-28 max-w-3xl mx-auto px-6">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-[#475569] hover:text-[#00d4ff] transition-colors mb-10"
        >
          <ArrowLeft size={14} /> Back to all posts
        </Link>

        {/* Meta */}
        <div className="flex items-center gap-4 mb-5">
          <div className="flex items-center gap-1.5 text-[#334155] text-xs">
            <Clock size={11} /> {post.readTime} read
          </div>
          <div className="text-[#334155] text-xs">{post.date}</div>
        </div>

        {/* Title */}
        <h1 className="text-4xl sm:text-5xl font-black text-white mb-6 leading-tight">
          {post.title}
        </h1>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-12">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 rounded-md text-[11px] bg-[rgba(0,212,255,0.08)] text-[#00d4ff] border border-[rgba(0,212,255,0.1)]"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Body */}
        <div className="space-y-6 mb-16">
          {post.content.map((block, i) => {
            if (block.type === "heading") {
              return (
                <h2
                  key={i}
                  className="text-xl sm:text-2xl font-bold text-white pt-4"
                >
                  {block.text}
                </h2>
              );
            }
            if (block.type === "list") {
              return (
                <ul key={i} className="space-y-2.5 pl-1">
                  {block.items.map((item, j) => (
                    <li
                      key={j}
                      className="flex gap-3 text-[#94a3b8] leading-relaxed"
                    >
                      <span className="text-[#00d4ff] mt-1.5 shrink-0">
                        <ArrowRight size={13} />
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              );
            }
            return (
              <p key={i} className="text-[#94a3b8] text-lg leading-relaxed">
                {block.text}
              </p>
            );
          })}
        </div>

        {/* CTA */}
        <div className="p-8 rounded-3xl gradient-border relative overflow-hidden mb-24">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(0,212,255,0.05),transparent_60%)] pointer-events-none" />
          <div className="relative">
            <h3 className="text-xl font-black text-white mb-2">
              Have a project in mind?
            </h3>
            <p className="text-[#475569] mb-5">
              I turn ideas into shipped products fast. Let&apos;s talk about
              what you&apos;re building.
            </p>
            <Link
              href="/build-with-me"
              className="inline-flex items-center gap-2 text-sm text-[#00d4ff] font-medium hover:gap-3 transition-all"
            >
              Build With Me <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </article>
      <Footer />
    </>
  );
}
