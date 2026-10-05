export const dynamicParams = false;
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Script from "next/script";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { FadeContent } from "@/components/shared/FadeContent";
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Send,
  ChevronRight,
  ArrowRight,
} from "lucide-react";
import { getAllBlogPosts, getBlogPostBySlug } from "@/lib/data";
import { generateBreadcrumbSchema, generateFAQSchema } from "@/components/layout/SEO";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return { title: "Post Not Found" };

  return {
    title: post.seo.title,
    description: post.seo.description,
    keywords: post.seo.keywords,
    openGraph: {
      title: post.seo.title,
      description: post.seo.description,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      images: [{ url: post.coverImage }],
    },
  };
}

export async function generateStaticParams() {
  return getAllBlogPosts().map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  const allPosts = getAllBlogPosts();
  const relatedPosts = allPosts
    .filter(
      (p) =>
        p.slug !== post.slug &&
        p.tags.some((t) => post.tags.includes(t))
    )
    .slice(0, 3);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://poolux-lighting.com" },
    { name: "Blog", url: "https://poolux-lighting.com/blog" },
    {
      name: post.title,
      url: `https://poolux-lighting.com/blog/${post.slug}`,
    },
  ]);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: {
      "@type": "Person",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: "Poolux Lighting",
    },
  };

  const blogFaqs = [
    {
      question: `Is this article about ${post.tags.slice(0, 2).join(" and ")} applicable to my commercial pool project?`,
      answer: `Yes, this technical article covers ${post.category.toLowerCase()} topics relevant to commercial pool lighting specifiers, landscape architects, and electrical contractors. For project-specific recommendations — including custom wiring diagrams, transformer sizing, and IP68 fixture selection — contact our engineering team for a free consultation.`,
    },
    {
      question: "Where can I get a custom quote for commercial underwater LED lights?",
      answer:
        "Submit your project details through our contact form at poolux-lighting.com/contact and our engineering team will provide a custom lighting layout, wiring diagram, transformer specification, and wholesale price within 24 hours. All IP68 SS316L fixtures are 100% air-tightness tested before shipment.",
    },
  ];

  return (
    <>
      <Script
        id="article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateFAQSchema(blogFaqs)) }}
      />

      <div className="min-h-screen">
        {/* Breadcrumb */}
        <div className="border-b border-white/10 bg-[#0A1628]/50">
          <div className="mx-auto max-w-7xl px-4 py-3 md:px-8">
            <nav className="flex items-center gap-2 text-sm text-white/40">
              <Link href="/" className="hover:text-white">Home</Link>
              <ChevronRight className="h-3.5 w-3.5" />
              <Link href="/blog" className="hover:text-white">Blog</Link>
              <ChevronRight className="h-3.5 w-3.5" />
              <span className="text-white/80 truncate max-w-[200px] inline-block">
                {post.title}
              </span>
            </nav>
          </div>
        </div>

        {/* Article */}
        <article className="py-16">
          <div className="mx-auto max-w-3xl px-4 md:px-8">
            <FadeContent>
              <Link
                href="/blog"
                className="mb-6 inline-flex items-center gap-1 text-sm text-white/40 hover:text-white"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Blog
              </Link>

              {/* Meta */}
              <div className="mb-4 flex flex-wrap items-center gap-3">
                <Badge className="border-[#0EA5E9]/30 bg-[#0EA5E9]/10 text-[#0EA5E9]">
                  {post.category}
                </Badge>
                <span className="flex items-center gap-1 text-xs text-white/40">
                  <Calendar className="h-3.5 w-3.5" />
                  {post.date}
                </span>
                <span className="flex items-center gap-1 text-xs text-white/40">
                  <Clock className="h-3.5 w-3.5" />
                  {post.readTime} min read
                </span>
                <span className="flex items-center gap-1 text-xs text-white/40">
                  <User className="h-3.5 w-3.5" />
                  {post.author}
                </span>
              </div>

              <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl">
                {post.title}
              </h1>

              {/* Tags */}
              <div className="mt-4 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/10 bg-white/[0.02] px-3 py-1 text-xs text-white/50"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              <Separator className="my-8 bg-white/10" />

              {/* Content */}
              <div className="prose prose-invert prose-lg max-w-none">
                <p className="text-lg leading-relaxed text-white/60">
                  {post.excerpt}
                </p>
                <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.02] p-8">
                  <p className="text-white/40 italic">
                    This is a placeholder for the full blog post content. In
                    production, this would be rendered from an MDX file
                    containing the complete technical article with headings,
                    code blocks, images, and diagrams.
                  </p>
                </div>

                <h2 className="mt-8 text-2xl font-bold text-white">
                  Key Takeaways
                </h2>
                <ul className="space-y-2 text-white/60">
                  <li>• Every Poolux light is 100% individually tested — not batch-sampled</li>
                  <li>• <Link href="/products/marine-saltwater-lights" className="text-[#0EA5E9] hover:underline">SS316L marine-grade stainless steel</Link> is the minimum viable material for chlorinated or saltwater environments</li>
                  <li>• <Link href="/blog/12v-24v-low-voltage-commercial-pool-lighting-safety" className="text-[#0EA5E9] hover:underline">12V/24V DC low-voltage</Link> is human-safe even if the fixture is physically damaged</li>
                  <li>• <Link href="/products/fountain-water-feature-lights" className="text-[#0EA5E9] hover:underline">DMX512 synchronized control</Link> enables perfect synchronization across 50+ fixtures</li>
                </ul>

                <h2 className="mt-8 text-2xl font-bold text-white">
                  Need Help With Your Project?
                </h2>
                <p className="text-white/60">
                  Our engineering team provides free custom lighting layouts and
                  wiring diagrams tailored to your specific pool dimensions. Browse our{" "}
                  <Link href="/products/in-ground-pool-lights" className="text-[#0EA5E9] hover:underline">IP68 in-ground pool lights</Link>,{" "}
                  <Link href="/products/fountain-water-feature-lights" className="text-[#0EA5E9] hover:underline">DMX512 fountain lights</Link>, or{" "}
                  <Link href="/products/marine-saltwater-lights" className="text-[#0EA5E9] hover:underline">SS316L marine-grade fixtures</Link>{" "}
                  to find the right product for your installation.
                </p>
              </div>

              {/* CTA */}
              <div className="mt-12 rounded-2xl border border-[#0EA5E9]/20 bg-gradient-to-br from-[#0EA5E9]/10 to-transparent p-6 text-center md:p-8">
                <h3 className="text-xl font-semibold text-white">
                  Get a Free Custom Quote
                </h3>
                <p className="mt-2 text-sm text-white/50">
                  Tell us about your pool or water feature project. We will
                  recommend the right fixtures and provide a complete wiring
                  diagram within 24 hours.
                </p>
                <Button
                  size="lg"
                  className="mt-4 bg-gradient-to-r from-[#0EA5E9] to-[#38BDF8] text-white"
                >
                  <Link href="/contact">
                    <Send className="mr-2 h-4 w-4" />
                    Request Quote
                  </Link>
                </Button>
              </div>
            </FadeContent>
          </div>
        </article>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="border-t border-white/10 py-16">
            <div className="mx-auto max-w-7xl px-4 md:px-8">
              <FadeContent>
                <h2 className="mb-8 text-2xl font-bold text-white">
                  Related Articles
                </h2>
              </FadeContent>
              <div className="grid gap-6 md:grid-cols-3">
                {relatedPosts.map((rp, i) => (
                  <FadeContent key={rp.slug} delay={i * 0.1}>
                    <Link
                      href={`/blog/${rp.slug}`}
                      className="group block rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-all hover:border-[#0EA5E9]/20"
                    >
                      <Badge className="mb-3 border-[#0EA5E9]/30 bg-[#0EA5E9]/10 text-[#0EA5E9]">
                        {rp.category}
                      </Badge>
                      <h3 className="mb-2 line-clamp-2 text-base font-semibold text-white transition-colors group-hover:text-[#0EA5E9]">
                        {rp.title}
                      </h3>
                      <p className="line-clamp-2 text-xs text-white/40">
                        {rp.date} · {rp.readTime} min
                      </p>
                    </Link>
                  </FadeContent>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    </>
  );
}
