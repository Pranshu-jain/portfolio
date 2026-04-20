import type { Metadata } from "next";
import Footer from "@/components/Footer";
import { ArrowRight, Clock, Tag } from "lucide-react";
import { blogPosts } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Blog — Pranshu",
  description: "Insights on AI development, startup speed, and building products that matter.",
};

export default function BlogPage() {
  const [featured, ...rest] = blogPosts;

  return (
    <>
      <div className="pt-28 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="max-w-2xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-semibold uppercase tracking-wider bg-[rgba(0,212,255,0.08)] text-[#00d4ff] border border-[rgba(0,212,255,0.1)] mb-5">
            Blog & Insights
          </div>
          <h1 className="text-5xl sm:text-6xl font-black text-white mb-5 leading-tight">
            Ideas on AI,{" "}
            <span className="gradient-text">startups & speed.</span>
          </h1>
          <p className="text-[#475569] text-lg">
            Thoughts on building fast, using AI as a multiplier, and shipping
            products that matter.
          </p>
        </div>

        {/* Featured post */}
        <div className="p-8 rounded-3xl gradient-border mb-8 relative overflow-hidden group cursor-pointer">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(0,212,255,0.04),transparent_60%)] pointer-events-none" />
          <div className="relative">
            <div className="flex items-center gap-4 mb-5">
              <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-[rgba(0,212,255,0.1)] text-[#00d4ff] uppercase tracking-wider">
                Featured
              </span>
              <div className="flex items-center gap-1.5 text-[#334155] text-xs">
                <Clock size={11} /> {featured.readTime} read
              </div>
              <div className="text-[#334155] text-xs">{featured.date}</div>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white mb-4 group-hover:gradient-text transition-all">
              {featured.title}
            </h2>
            <p className="text-[#475569] leading-relaxed mb-6 max-w-2xl">
              {featured.excerpt}
            </p>
            <div className="flex items-center gap-4">
              <div className="flex gap-2">
                {featured.tags.map((tag) => (
                  <span key={tag} className="px-2 py-1 rounded-md text-[11px] bg-[rgba(255,255,255,0.04)] text-[#475569]">
                    {tag}
                  </span>
                ))}
              </div>
              <span className="ml-auto flex items-center gap-1.5 text-sm text-[#00d4ff] font-medium">
                Read More <ArrowRight size={13} />
              </span>
            </div>
          </div>
        </div>

        {/* Other posts */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-24">
          {rest.map((post) => (
            <div
              key={post.slug}
              className="p-6 rounded-2xl card-border group cursor-pointer"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center gap-1.5 text-[#334155] text-xs">
                  <Clock size={10} /> {post.readTime}
                </div>
                <div className="text-[#334155] text-xs">{post.date}</div>
              </div>
              <h3 className="text-lg font-bold text-white mb-3 group-hover:text-[#00d4ff] transition-colors">
                {post.title}
              </h3>
              <p className="text-[#475569] text-sm leading-relaxed mb-5 line-clamp-2">
                {post.excerpt}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  {post.tags.slice(0, 2).map((tag) => (
                    <span key={tag} className="px-2 py-1 rounded-md text-[10px] bg-[rgba(255,255,255,0.03)] text-[#334155]">
                      {tag}
                    </span>
                  ))}
                </div>
                <ArrowRight size={13} className="text-[#334155] group-hover:text-[#00d4ff] transition-colors" />
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
