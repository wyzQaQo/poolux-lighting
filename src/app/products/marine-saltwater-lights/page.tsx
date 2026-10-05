export const dynamicParams = false;
import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { FadeContent } from "@/components/shared/FadeContent";
import { ProductCard } from "@/components/products/ProductCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { generateFAQSchema, generateBreadcrumbSchema } from "@/components/layout/SEO";
import { Anchor, ArrowRight, Shield, Zap, Droplets, CheckCircle2, Send } from "lucide-react";
import { getProductsByCategory } from "@/lib/data";

export const metadata: Metadata = {
  title: "Marine & Saltwater-Grade Lights | SS316L ASTM B117 Corrosion-Proof LED | Poolux",
  description:
    "Marine-grade SS316L underwater LED lights for saltwater pools, yacht marinas, and coastal resorts. 72-hour ASTM B117 salt-spray tested. IP68 waterproof, 24V DC low-voltage, 5-year warranty.",
  keywords: [
    "SS316L marine light",
    "saltwater pool LED",
    "yacht marina lighting",
    "coastal underwater light",
    "corrosion proof pool light",
    "ASTM B117 tested LED",
    "marine grade underwater lighting",
  ],
};

const faqs = [
  {
    question: "Why is SS316L essential for saltwater pool and marine lighting?",
    answer:
      "SS316L contains 2-3% molybdenum, which provides critical resistance to chloride-induced pitting corrosion. Standard SS304 lacks sufficient molybdenum and develops surface rust spots within 3-6 months in chlorinated or saltwater environments. Poolux uses SS316L for every metal component — housing, screws, bracket, and cable gland — and validates every Marine Coastal fixture with 72-hour ASTM B117 salt-spray testing.",
  },
  {
    question: "What is ASTM B117 salt-spray testing?",
    answer:
      "ASTM B117 is the international standard for accelerated corrosion testing. Fixtures are placed in a chamber with continuous 5% sodium chloride salt spray at 35°C for 72 hours. This simulates years of coastal/marine exposure in a compressed timeframe. Only units showing zero surface pitting or rust formation pass our Marine Coastal series certification.",
  },
  {
    question: "Can Poolux marine lights be used in ocean-water marinas?",
    answer:
      "Yes, the PLX Marine Coastal 15W is specifically engineered for direct ocean-water exposure. It features full 316L construction, double-gasket redundant sealing, anti-biofouling lens coating to prevent barnacle and algae buildup, and chemical-resistant silicone seals that withstand diesel and oil exposure common in marina environments. 5-year warranty included.",
  },
  {
    question: "What is the difference between Marine Coastal and Marine Dock series?",
    answer:
      "Marine Coastal 15W is for submerged applications (beachfront pools, underwater structures) with 40° focused beam and DMX512 control. Marine Dock 10W is for surface-mount applications (dock edges, pontoon perimeters, boat ramps) with 120° wide flood beam and standalone operation. Both use full SS316L construction and IP68 waterproofing.",
  },
];

export default function MarineSaltwaterLightsPage() {
  const products = getProductsByCategory("marine-saltwater-lights");

  return (
    <>
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateFAQSchema(faqs)) }} />
      <Script id="breadcrumb-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateBreadcrumbSchema([
        { name: "Home", url: "https://poolux-lighting.com" },
        { name: "Products", url: "https://poolux-lighting.com/products" },
        { name: "Marine & Saltwater-Grade Lights", url: "https://poolux-lighting.com/products/marine-saltwater-lights" },
      ])) }} />
      <div className="min-h-screen">
        <section className="border-b border-white/10 bg-[#0A1628]/50 py-20 pt-28">
          <div className="mx-auto max-w-7xl px-4 md:px-8">
            <FadeContent>
              <nav className="mb-6 flex items-center gap-2 text-sm text-white/40">
                <Link href="/" className="hover:text-white">Home</Link>
                <span>/</span>
                <Link href="/products" className="hover:text-white">Products</Link>
                <span>/</span>
                <span className="text-white/80">Marine & Saltwater-Grade Lights</span>
              </nav>
              <Badge className="mb-4 border-[#06B6D4]/30 bg-[#06B6D4]/10 text-[#06B6D4]">
                <Anchor className="mr-1.5 h-3.5 w-3.5" /> Marine Category
              </Badge>
              <h1 className="text-3xl font-bold tracking-tight text-white md:text-5xl">
                SS316L Marine-Grade
                <span className="bg-gradient-to-r from-[#06B6D4] to-[#22D3EE] bg-clip-text text-transparent"> Saltwater &amp; Coastal LED Lights</span>
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/50 md:text-lg">
                316L stainless steel underwater lights built for the world's harshest aquatic environments — beachfront resorts,
                yacht marina docks, coastal boardwalks, and saltwater swimming pools. 72-hour ASTM B117 salt-spray tested. 5-year warranty on Marine Coastal series.
              </p>
            </FadeContent>
          </div>
        </section>

        <section className="border-b border-white/10 bg-white/[0.01] py-6">
          <div className="mx-auto max-w-7xl px-4 md:px-8">
            <div className="flex flex-wrap justify-center gap-6 md:gap-12">
              {[
                { icon: Shield, label: "Full SS316L Construction" },
                { icon: Zap, label: "ASTM B117 Salt-Spray Tested" },
                { icon: Droplets, label: "IP68 + Double-Gasket Seal" },
                { icon: CheckCircle2, label: "5-Year Marine Warranty" },
              ].map((spec) => (
                <div key={spec.label} className="flex items-center gap-2 text-sm text-white/60">
                  <spec.icon className="h-4 w-4 text-[#06B6D4]" /> {spec.label}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 md:px-8">
            <div className="grid gap-6 md:grid-cols-2">
              {products.map((product) => (
                <ProductCard key={product.slug} product={product} />
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-white/10 py-16">
          <div className="mx-auto max-w-7xl px-4 md:px-8">
            <FadeContent><h2 className="mb-8 text-2xl font-bold text-white">Applications</h2></FadeContent>
            <div className="grid gap-6 md:grid-cols-2">
              {[
                { title: "Beachfront Resort Pools", desc: "SS316L construction with anti-biofouling lens coating withstands salt spray and high humidity that destroys standard pool lights within months." },
                { title: "Yacht Marina Docks", desc: "120° wide-beam Marine Dock series illuminates floating pontoon edges and dock perimeters. Chemical-resistant seals handle diesel and oil exposure." },
                { title: "Coastal Boardwalks & Seawalls", desc: "Surface-mount flange design for easy retrofit on existing marine infrastructure. 12V DC intrinsically safe for wet-deck electrical code compliance." },
                { title: "Offshore Platform & Industrial", desc: "5-year warranty covers continuous saltwater submersion. Double-gasket redundant sealing ensures zero water ingress even under wave impact and pressure cycling." },
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

        <section className="border-t border-white/10 py-16">
          <div className="mx-auto max-w-7xl px-4 md:px-8">
            <FadeContent><h2 className="mb-8 text-2xl font-bold text-white">Explore Related Products</h2></FadeContent>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { href: "/products/in-ground-pool-lights", title: "In-Ground Pool Lights", desc: "IP68 flush-mount pool lights with 12V/24V DC low-voltage safety for resort pools" },
                { href: "/products/fountain-water-feature-lights", title: "Fountain & Water Feature Lights", desc: "DMX512 synchronized RGBW lights for musical fountains and water features" },
              ].map((link, i) => (
                <FadeContent key={link.title} delay={i * 0.1}>
                  <Link href={link.href} className="group flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-all hover:border-[#06B6D4]/20">
                    <div>
                      <h3 className="font-semibold text-white group-hover:text-[#06B6D4]">{link.title}</h3>
                      <p className="mt-1 text-sm text-white/50">{link.desc}</p>
                    </div>
                    <ArrowRight className="h-5 w-5 text-white/30 transition-transform group-hover:translate-x-1 group-hover:text-[#06B6D4]" />
                  </Link>
                </FadeContent>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-white/10 py-16">
          <div className="mx-auto max-w-3xl px-4 text-center md:px-8">
            <FadeContent>
              <h2 className="text-2xl font-bold text-white">Specifying Marine-Grade Lighting?</h2>
              <p className="mt-3 text-white/50">Get a free custom quote, ASTM B117 test report, and installation plan within 24 hours.</p>
              <Button size="lg" className="mt-4 bg-gradient-to-r from-[#06B6D4] to-[#22D3EE] text-white">
                <Link href="/contact" className="flex items-center gap-2"><Send className="h-4 w-4" /> Request Marine Lighting Quote</Link>
              </Button>
            </FadeContent>
          </div>
        </section>
      </div>
    </>
  );
}
