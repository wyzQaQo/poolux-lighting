import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { FadeContent } from "@/components/shared/FadeContent";
import { SpotlightCard } from "@/components/shared/SpotlightCard";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { getAllBlogPosts } from "@/lib/data";
import { generateFAQSchema } from "@/components/layout/SEO";

export const metadata: Metadata = {
  title: "Technical Blog | Pool Lighting Engineering & Safety Guides",
  description:
    "Engineer-written guides on underwater lighting safety, corrosion prevention, DMX512 control, IP68 certification, and pool installation best practices. Updated monthly.",
  keywords: [
    "pool lighting blog",
    "underwater LED guide",
    "DMX512 tutorial",
    "IP68 certification explained",
    "pool light safety",
    "SS316L corrosion guide",
  ],
};

export default function BlogPage() {
  const posts = getAllBlogPosts();

  const faqs = [
    {
      question: "What topics does the Poolux Lighting technical blog cover?",
      answer:
        "Our engineering blog covers materials science (SS316 vs SS304 corrosion), electrical safety (12V/24V DC low-voltage pool lighting compliance), control protocols (DMX512 synchronized RGBW programming), quality assurance (IP68 certification and factory testing processes), and installation best practices for commercial underwater LED lighting systems.",
    },
    {
      question: "Who writes the Poolux technical articles?",
      answer:
        "All articles are written by Poolux's in-house engineering team with 15+ years of experience in LED manufacturing, materials engineering, and international certification compliance. Content is reviewed for technical accuracy before publication.",
    },
  ];

  return (
    <>
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateFAQSchema(faqs)) }}
      />
    <div className="min-h-screen">
      {/* Header */}
      <section className="border-b border-white/10 bg-[#0A1628]/50 py-20 pt-28">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <FadeContent>
            <span className="mb-3 inline-block rounded-full border border-[#0EA5E9]/30 bg-[#0EA5E9]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#0EA5E9]">
              Technical Resources
            </span>
            <h1 className="text-3xl font-bold tracking-tight text-white md:text-5xl">
              Engineering Blog
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/50 md:text-lg">
              No marketing fluff. Hard technical content on materials science,
              electrical safety, control protocols, and installation best
              practices — written by our engineering team for specifiers and
              contractors.
            </p>
          </FadeContent>
        </div>
      </section>

      {/* Posts */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, i) => (
              <FadeContent key={post.slug} delay={i * 0.1}>
                <SpotlightCard className="group h-full rounded-2xl border border-white/10 bg-white/[0.02] transition-all hover:border-[#0EA5E9]/20">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="flex h-full flex-col p-6"
                  >
                    <div className="mb-3">
                      <Badge
                        variant="secondary"
                        className="border-[#0EA5E9]/30 bg-[#0EA5E9]/10 text-[#0EA5E9]"
                      >
                        {post.category}
                      </Badge>
                    </div>
                    <h2 className="mb-2 line-clamp-2 text-lg font-semibold text-white transition-colors group-hover:text-[#0EA5E9]">
                      {post.title}
                    </h2>
                    <p className="mb-4 flex-1 line-clamp-3 text-sm leading-relaxed text-white/50">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-4 border-t border-white/10 pt-4 text-xs text-white/40">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        {post.readTime} min read
                      </span>
                    </div>
                  </Link>
                </SpotlightCard>
              </FadeContent>
            ))}
          </div>
        </div>
      </section>
    </div>
    </>
  );
}
