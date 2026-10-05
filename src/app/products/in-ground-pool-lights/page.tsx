import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { FadeContent } from "@/components/shared/FadeContent";
import { ProductCard } from "@/components/products/ProductCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { generateFAQSchema, generateBreadcrumbSchema } from "@/components/layout/SEO";
import { Waves, ArrowRight, Shield, Zap, Droplets, CheckCircle2, Send } from "lucide-react";
import { getProductsByCategory, getCategoryBySlug } from "@/lib/data";

export const metadata: Metadata = {
  title: "In-Ground Pool Lights | IP68 SS316L Flush-Mount Underwater LED | Poolux",
  description:
    "Commercial IP68 in-ground and wall-mount pool lights with SS316L marine-grade stainless steel. 12V/24V DC low-voltage safety, DMX512 RGBW control. 100% air-tightness tested. Factory-direct wholesale pricing.",
  keywords: [
    "in-ground pool lights",
    "IP68 flush mount pool light",
    "SS316L pool light",
    "12V DC underwater LED",
    "DMX512 pool light",
    "commercial infinity pool lighting",
    "wall mount pool light",
  ],
};

const faqs = [
  {
    question: "What is the difference between in-ground and wall-mount pool lights?",
    answer:
      "In-ground (flush-mount) pool lights are installed into the pool shell during construction and sit flush with the pool wall surface, creating a seamless look ideal for infinity pools and luxury resorts. Wall-mount lights are surface-mounted onto existing pool walls, making them suitable for retrofit projects. Both types use SS316L marine-grade stainless steel and IP68 waterproofing.",
  },
  {
    question: "Are 12V DC pool lights safe?",
    answer:
      "Yes, 12V and 24V DC pool lights operate within SELV (Safety Extra Low Voltage) limits as defined by IEC 60364-7-702 and NEC 680. Even if the fixture housing is physically damaged, the voltage is too low to cause electric shock. This is why international pool safety codes mandate low-voltage DC for all underwater fixtures.",
  },
  {
    question: "How many in-ground pool lights do I need for a standard resort pool?",
    answer:
      "A general rule of thumb is one 12W in-ground light for every 15-20 square meters of pool surface for ambient lighting, or every 8-10 square meters for high-illumination resort effect. Use our Transformer & Wire Gauge Calculator on any product page to determine the correct transformer sizing and cable specifications for your layout.",
  },
  {
    question: "Can in-ground pool lights be retrofitted into an existing pool?",
    answer:
      "Yes, our PLX InGround Slim 9W is specifically designed for retrofit applications with a compact 90mm diameter and 78mm cutout. For new construction, the PLX InGround Pro 12W offers a larger 120mm face with higher lumen output. We recommend consulting our engineering team for a custom retrofit plan.",
  },
];

export default function InGroundPoolLightsPage() {
  const products = getProductsByCategory("in-ground-pool-lights");
  const category = getCategoryBySlug("in-ground-pool-lights");

  return (
    <>
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateFAQSchema(faqs)) }} />
      <Script id="breadcrumb-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateBreadcrumbSchema([
        { name: "Home", url: "https://poolux-lighting.com" },
        { name: "Products", url: "https://poolux-lighting.com/products" },
        { name: "In-Ground Pool Lights", url: "https://poolux-lighting.com/products/in-ground-pool-lights" },
      ])) }} />
      <div className="min-h-screen">
        {/* Header */}
        <section className="border-b border-white/10 bg-[#0A1628]/50 py-20 pt-28">
          <div className="mx-auto max-w-7xl px-4 md:px-8">
            <FadeContent>
              <nav className="mb-6 flex items-center gap-2 text-sm text-white/40">
                <Link href="/" className="hover:text-white">Home</Link>
                <span>/</span>
                <Link href="/products" className="hover:text-white">Products</Link>
                <span>/</span>
                <span className="text-white/80">In-Ground Pool Lights</span>
              </nav>
              <Badge className="mb-4 border-[#0EA5E9]/30 bg-[#0EA5E9]/10 text-[#0EA5E9]">
                <Waves className="mr-1.5 h-3.5 w-3.5" /> Pool Lighting Category
              </Badge>
              <h1 className="text-3xl font-bold tracking-tight text-white md:text-5xl">
                IP68 SS316L In-Ground &amp;
                <span className="bg-gradient-to-r from-[#0EA5E9] to-[#38BDF8] bg-clip-text text-transparent"> Wall-Mount Pool Lights</span>
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/50 md:text-lg">
                Flush-mount and wall-mount LED pool lights engineered for infinity pools, resort swimming pools, and luxury residential installations.
                Ultra-slim bezel, absolute IP68 waterproofing, and 12V/24V DC low-voltage safety — all in SS316L marine-grade stainless steel.
              </p>
            </FadeContent>
          </div>
        </section>

        {/* Key Specs Bar */}
        <section className="border-b border-white/10 bg-white/[0.01] py-6">
          <div className="mx-auto max-w-7xl px-4 md:px-8">
            <div className="flex flex-wrap justify-center gap-6 md:gap-12">
              {[
                { icon: Shield, label: "SS316L Marine Grade" },
                { icon: Zap, label: "12V/24V DC Low-Voltage" },
                { icon: Droplets, label: "IP68 Waterproof" },
                { icon: CheckCircle2, label: "100% Factory Tested" },
              ].map((spec) => (
                <div key={spec.label} className="flex items-center gap-2 text-sm text-white/60">
                  <spec.icon className="h-4 w-4 text-[#0EA5E9]" />
                  {spec.label}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Products */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 md:px-8">
            <div className="grid gap-6 md:grid-cols-2">
              {products.map((product) => (
                <ProductCard key={product.slug} product={product} />
              ))}
            </div>
          </div>
        </section>

        {/* Applications */}
        <section className="border-t border-white/10 py-16">
          <div className="mx-auto max-w-7xl px-4 md:px-8">
            <FadeContent>
              <h2 className="mb-8 text-2xl font-bold text-white">Applications</h2>
            </FadeContent>
            <div className="grid gap-6 md:grid-cols-2">
              {[
                { title: "Infinity Pools", desc: "Ultra-slim 8mm bezel ensures zero protrusion at the infinity edge, maintaining the seamless visual effect that defines luxury resort pools." },
                { title: "Resort Swimming Pools", desc: "High-output 1200lm per fixture with DMX512 RGBW color control creates stunning nighttime ambiance for hotel and resort pool complexes." },
                { title: "Luxury Residential Pools", desc: "Compact 90mm wall-mount option provides distributed ambient lighting for private villa pools without the construction complexity of in-ground fixtures." },
                { title: "Hotel Pool Complexes", desc: "Multiple fixtures synchronized via 4-wire or DMX512 protocol ensure uniform color and brightness across large commercial pool installations." },
              ].map((app, i) => (
                <FadeContent key={app.title} delay={i * 0.1}>
                  <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6">
                    <h3 className="text-lg font-semibold text-white">{app.title}</h3>
                    <p className="mt-2 text-sm text-white/50">{app.desc}</p>
                  </div>
                </FadeContent>
              ))}
            </div>
          </div>
        </section>

        {/* Cross-links */}
        <section className="border-t border-white/10 py-16">
          <div className="mx-auto max-w-7xl px-4 md:px-8">
            <FadeContent>
              <h2 className="mb-8 text-2xl font-bold text-white">Explore Related Products</h2>
            </FadeContent>
            <div className="grid gap-4 sm:grid-cols-2">
              <FadeContent delay={0.1}>
                <Link href="/products/fountain-water-feature-lights" className="group flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-all hover:border-[#0EA5E9]/20">
                  <div>
                    <h3 className="font-semibold text-white group-hover:text-[#0EA5E9]">Fountain & Water Feature Lights</h3>
                    <p className="mt-1 text-sm text-white/50">DMX512 musical fountain LED lights with center-hole jet integration</p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-white/30 transition-transform group-hover:translate-x-1 group-hover:text-[#0EA5E9]" />
                </Link>
              </FadeContent>
              <FadeContent delay={0.2}>
                <Link href="/products/marine-saltwater-lights" className="group flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-all hover:border-[#0EA5E9]/20">
                  <div>
                    <h3 className="font-semibold text-white group-hover:text-[#0EA5E9]">Marine & Saltwater-Grade Lights</h3>
                    <p className="mt-1 text-sm text-white/50">ASTM B117 salt-spray tested SS316L fixtures for coastal installations</p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-white/30 transition-transform group-hover:translate-x-1 group-hover:text-[#0EA5E9]" />
                </Link>
              </FadeContent>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-white/10 py-16">
          <div className="mx-auto max-w-3xl px-4 text-center md:px-8">
            <FadeContent>
              <h2 className="text-2xl font-bold text-white">Need a Custom In-Ground Pool Lighting Layout?</h2>
              <p className="mt-3 text-white/50">Get a free wiring diagram, transformer specification, and wholesale quote within 24 hours.</p>
              <Button size="lg" className="mt-4 bg-gradient-to-r from-[#0EA5E9] to-[#38BDF8] text-white">
                <Link href="/contact" className="flex items-center gap-2">
                  <Send className="h-4 w-4" /> Request Custom Pool Lighting Quote
                </Link>
              </Button>
            </FadeContent>
          </div>
        </section>
      </div>
    </>
  );
}
