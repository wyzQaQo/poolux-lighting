import Link from "next/link";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { FadeContent } from "@/components/shared/FadeContent";
import { SpotlightCard } from "@/components/shared/SpotlightCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, Calendar } from "lucide-react";
import { getAllBlogPosts } from "@/lib/data";

export function BlogPreview() {
  const posts = getAllBlogPosts().slice(0, 3);

  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <SectionHeading
          label="Technical Insights"
          title="Engineer-Written Resources for Specifiers"
          description="No fluff. Just hard technical content on materials, safety, control protocols, and installation best practices."
        />

        <div className="grid gap-6 md:grid-cols-3">
          {posts.map((post, i) => (
            <FadeContent key={post.slug} delay={i * 0.1}>
              <SpotlightCard className="group h-full rounded-2xl border border-white/10 bg-white/[0.02] transition-all hover:border-[#0EA5E9]/20">
                <Link href={`/blog/${post.slug}`} className="flex h-full flex-col p-6">
                  <div className="mb-3">
                    <Badge
                      variant="secondary"
                      className="border-[#0EA5E9]/30 bg-[#0EA5E9]/10 text-[#0EA5E9]"
                    >
                      {post.category}
                    </Badge>
                  </div>
                  <h3 className="mb-2 line-clamp-2 text-lg font-semibold text-white transition-colors group-hover:text-[#0EA5E9]">
                    {post.title}
                  </h3>
                  <p className="mb-4 line-clamp-3 flex-1 text-sm leading-relaxed text-white/50">
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

        <FadeContent className="mt-10 text-center">
          <Button
            variant="outline"
            className="border-white/20 text-white hover:bg-white/5"
          >
            <Link href="/blog">
              View All Underwater Lighting Technical Guides
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </FadeContent>
      </div>
    </section>
  );
}
