export const dynamicParams = false;
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Script from "next/script";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { FadeContent } from "@/components/shared/FadeContent";
import { TechSpecsTable } from "@/components/products/TechSpecsTable";
import { RGBWSimulator } from "@/components/products/RGBWSimulator";
import { TransformerCalculator } from "@/components/products/TransformerCalculator";
import { ProductCard } from "@/components/products/ProductCard";
import {
  generateProductSchema,
  generateFAQSchema,
  generateBreadcrumbSchema,
} from "@/components/layout/SEO";
import {
  ArrowLeft,
  Shield,
  Zap,
  Droplets,
  Send,
  ChevronRight,
  CheckCircle2,
} from "lucide-react";
import { getProductBySlug, getRelatedProducts, getAllProducts } from "@/lib/data";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Product Not Found" };

  return {
    title: product.seo.title,
    description: product.seo.description,
    keywords: product.seo.keywords,
    openGraph: {
      title: product.seo.title,
      description: product.seo.description,
      type: "website",
      images: product.images.map((img) => ({ url: img })),
    },
  };
}

export async function generateStaticParams() {
  return getAllProducts().map((product) => ({ slug: product.slug }));
}

const faqs = [
  {
    question: "Is 12V/24V DC pool lighting really safe for swimmers?",
    answer:
      "Absolutely. 12V and 24V DC systems operate well within the human-safe voltage threshold (SELV — Safety Extra Low Voltage). Even if the fixture is physically damaged and wires are exposed, the voltage is too low to cause electric shock. This is why international pool safety codes (NEC 680, IEC 60364-7-702) mandate low-voltage DC for underwater fixtures.",
  },
  {
    question: "What makes SS316L better than SS304 for pool lights?",
    answer:
      "SS304 contains 18% chromium and 8% nickel but only trace molybdenum. In chlorinated pool water or saltwater environments, SS304 develops surface pitting and rust spots within 3-6 months. SS316L adds 2-3% molybdenum, which dramatically improves resistance to chloride-induced corrosion. At Poolux, we use SS316L for every metal component — housing, screws, bracket, and cable gland — not just the visible face.",
  },
  {
    question: "How do you ensure IP68 waterproofing before shipment?",
    answer:
      "Every single Poolux light goes through two mandatory tests: (1) 100% air-tightness pneumatic testing to detect micro-leaks, and (2) 48-hour submerged pressure chamber testing at 2x rated depth. Units that fail either test are rejected and destroyed. We do not batch-sample — every unit gets tested individually.",
  },
  {
    question: "Can I control 50+ lights to synchronize color changes?",
    answer:
      "Yes. Our DMX512-compatible lights can be daisy-chained to a single DMX controller, which sends synchronized color and brightness commands to every fixture simultaneously. There is no perceivable lag between fixtures. For simpler installations, our 4-wire synchronous system achieves the same result without a DMX controller — just wire the sync line between fixtures.",
  },
  {
    question: "What transformer and wire gauge do I need?",
    answer:
      "Use our built-in Transformer & Wire Gauge Calculator above. Input the number of lights, wattage per light, system voltage, and maximum cable distance. The calculator will recommend the minimum transformer VA rating and the appropriate AWG wire gauge to prevent voltage drop. For large installations, we provide free custom wiring diagrams upon request.",
  },
];

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const relatedProducts = getRelatedProducts(product.relatedProducts);
  const productSchema = generateProductSchema({
    name: product.name,
    description: product.description,
    image: product.images[0],
  });
  const faqSchema = generateFAQSchema(faqs);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://poolux-lighting.com" },
    { name: "Products", url: "https://poolux-lighting.com/products" },
    {
      name: product.name,
      url: `https://poolux-lighting.com/products/${product.slug}`,
    },
  ]);

  return (
    <>
      <Script
        id="product-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="min-h-screen">
        {/* Breadcrumb */}
        <div className="border-b border-white/10 bg-[#0A1628]/50">
          <div className="mx-auto max-w-7xl px-4 py-3 md:px-8">
            <nav className="flex items-center gap-2 text-sm text-white/40">
              <Link href="/" className="hover:text-white">Home</Link>
              <ChevronRight className="h-3.5 w-3.5" />
              <Link href="/products" className="hover:text-white">Products</Link>
              <ChevronRight className="h-3.5 w-3.5" />
              <span className="text-white/80">{product.name}</span>
            </nav>
          </div>
        </div>

        {/* Hero Section */}
        <section className="border-b border-white/10 bg-[#0A1628]/30 py-16">
          <div className="mx-auto max-w-7xl px-4 md:px-8">
            <Link
              href="/products"
              className="mb-6 inline-flex items-center gap-1 text-sm text-white/40 hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Products
            </Link>

            <div className="grid gap-12 lg:grid-cols-2">
              {/* Left - Info */}
              <FadeContent>
                <div className="mb-4 flex flex-wrap gap-2">
                  <Badge className="border-[#0EA5E9]/20 bg-[#0EA5E9]/5 text-[#0EA5E9]">
                    {product.specs.voltage}
                  </Badge>
                  <Badge className="border-[#10B981]/20 bg-[#10B981]/5 text-[#10B981]">
                    {product.specs.ipRating}
                  </Badge>
                  <Badge className="border-white/10 bg-white/5 text-white/60">
                    {product.specs.material}
                  </Badge>
                  <Badge className="border-white/10 bg-white/5 text-white/60">
                    {product.specs.controlProtocol}
                  </Badge>
                </div>

                <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl">
                  {product.name}
                </h1>
                <p className="mt-2 text-lg text-[#0EA5E9]/80">{product.tagline}</p>
                <p className="mt-4 max-w-xl text-base leading-relaxed text-white/60">
                  {product.description}
                </p>

                {/* Key Safety Specs - VETO criteria */}
                <div className="mt-8 grid grid-cols-3 gap-3">
                  {[
                    { icon: Zap, label: "Input Voltage", value: product.specs.voltage },
                    { icon: Droplets, label: "Waterproof Rating", value: product.specs.ipRating },
                    { icon: Shield, label: "Material", value: product.specs.material },
                  ].map((spec) => (
                    <div
                      key={spec.label}
                      className="rounded-xl border border-[#0EA5E9]/20 bg-[#0EA5E9]/5 p-3 text-center"
                    >
                      <spec.icon className="mx-auto mb-1 h-4 w-4 text-[#0EA5E9]" />
                      <div className="text-[10px] text-white/40">{spec.label}</div>
                      <div className="text-sm font-bold text-white">{spec.value}</div>
                    </div>
                  ))}
                </div>

                {/* CTA Buttons */}
                <div className="mt-8 flex flex-wrap gap-3">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-[#0EA5E9] to-[#38BDF8] text-white shadow-lg shadow-[#0EA5E9]/25"
                  >
                    <Link href="/contact">
                      <Send className="mr-2 h-4 w-4" />
                      Request Quote &amp; Wiring Diagram
                    </Link>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white/20 text-white hover:bg-white/5"
                  >
                    <a href={`tel:+8613812345678`}>
                      Call Engineer
                    </a>
                  </Button>
                </div>
              </FadeContent>

              {/* Right - Product Image Placeholder */}
              <FadeContent direction="right">
                <div className="relative aspect-square overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#0A1628] to-[#0F1F3A]">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-[#0EA5E9]/10">
                        <Droplets className="h-10 w-10 text-[#0EA5E9]" />
                      </div>
                      <p className="text-sm text-white/30">
                        {product.name}
                        <br />
                        <span className="text-xs">Product Image</span>
                      </p>
                    </div>
                  </div>
                  {/* Glow effect */}
                  <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-[#0EA5E9]/20 to-transparent" />
                </div>
              </FadeContent>
            </div>
          </div>
        </section>

        {/* Tabs: Specs / Simulator / Calculator */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 md:px-8">
            <Tabs defaultValue="simulator" className="w-full">
              <TabsList className="mb-8 h-auto w-full justify-start gap-1 overflow-x-auto bg-transparent p-0">
                <TabsTrigger
                  value="simulator"
                  className="rounded-lg border border-white/10 px-4 py-2 data-[state=active]:border-[#0EA5E9]/30 data-[state=active]:bg-[#0EA5E9]/10 data-[state=active]:text-[#0EA5E9]"
                >
                  RGBW Simulator
                </TabsTrigger>
                <TabsTrigger
                  value="calculator"
                  className="rounded-lg border border-white/10 px-4 py-2 data-[state=active]:border-[#0EA5E9]/30 data-[state=active]:bg-[#0EA5E9]/10 data-[state=active]:text-[#0EA5E9]"
                >
                  Transformer Calculator
                </TabsTrigger>
                <TabsTrigger
                  value="specs"
                  className="rounded-lg border border-white/10 px-4 py-2 data-[state=active]:border-[#0EA5E9]/30 data-[state=active]:bg-[#0EA5E9]/10 data-[state=active]:text-[#0EA5E9]"
                >
                  Technical Specs
                </TabsTrigger>
                <TabsTrigger
                  value="faq"
                  className="rounded-lg border border-white/10 px-4 py-2 data-[state=active]:border-[#0EA5E9]/30 data-[state=active]:bg-[#0EA5E9]/10 data-[state=active]:text-[#0EA5E9]"
                >
                  FAQ
                </TabsTrigger>
              </TabsList>

              <TabsContent value="simulator" className="mt-0">
                <RGBWSimulator />
              </TabsContent>
              <TabsContent value="calculator" className="mt-0">
                <TransformerCalculator />
              </TabsContent>
              <TabsContent value="specs" className="mt-0">
                <TechSpecsTable product={product} />
              </TabsContent>
              <TabsContent value="faq" className="mt-0">
                <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 md:p-8">
                  <Accordion className="w-full">
                    {faqs.map((faq, i) => (
                      <AccordionItem
                        key={i}
                        value={`item-${i}`}
                        className="border-white/10"
                      >
                        <AccordionTrigger className="text-left text-white hover:text-[#0EA5E9]">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-white/60">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Features */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 md:px-8">
            <FadeContent>
              <h2 className="mb-8 text-2xl font-bold tracking-tight text-white md:text-3xl">
                Key Features
              </h2>
            </FadeContent>
            <div className="grid gap-4 md:grid-cols-2">
              {product.features.map((feature, i) => (
                <FadeContent key={i} delay={i * 0.05}>
                  <div className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-4">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#10B981]" />
                    <span className="text-sm text-white/70">{feature}</span>
                  </div>
                </FadeContent>
              ))}
            </div>
          </div>
        </section>

        {/* Applications */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 md:px-8">
            <FadeContent>
              <h2 className="mb-8 text-2xl font-bold tracking-tight text-white md:text-3xl">
                Applications
              </h2>
            </FadeContent>
            <div className="flex flex-wrap gap-3">
              {product.applications.map((app, i) => (
                <FadeContent key={i} delay={i * 0.1}>
                  <span className="rounded-full border border-white/10 bg-white/[0.02] px-4 py-2 text-sm text-white/60">
                    {app}
                  </span>
                </FadeContent>
              ))}
            </div>
          </div>
        </section>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="py-16">
            <div className="mx-auto max-w-7xl px-4 md:px-8">
              <FadeContent>
                <h2 className="mb-8 text-2xl font-bold tracking-tight text-white md:text-3xl">
                  Related Products
                </h2>
              </FadeContent>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {relatedProducts.map((rp) => (
                  <ProductCard key={rp.slug} product={rp} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="border-t border-white/10 py-16">
          <div className="mx-auto max-w-3xl px-4 text-center md:px-8">
            <FadeContent>
              <h2 className="text-2xl font-bold text-white md:text-3xl">
                Ready to Specify {product.name}?
              </h2>
              <p className="mt-3 text-white/50">
                Get a custom quote, wiring diagram, and lead time within 24 hours.
                Free technical consultation included.
              </p>
              <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-[#0EA5E9] to-[#38BDF8] text-white"
                >
                  <Link href="/contact">
                    <Send className="mr-2 h-4 w-4" />
                    Request Custom Quote
                  </Link>
                </Button>
              </div>
            </FadeContent>
          </div>
        </section>
      </div>
    </>
  );
}
