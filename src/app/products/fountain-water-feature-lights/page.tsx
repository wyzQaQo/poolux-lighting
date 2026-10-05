export const dynamicParams = false;
import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { FadeContent } from "@/components/shared/FadeContent";
import { ProductCard } from "@/components/products/ProductCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { generateFAQSchema, generateBreadcrumbSchema } from "@/components/layout/SEO";
import { Droplets, ArrowRight, Shield, Zap, CheckCircle2, Send } from "lucide-react";
import { getProductsByCategory } from "@/lib/data";

export const metadata: Metadata = {
  title: "Fountain & Water Feature Lights | DMX512 RGBW Center-Hole LED | Poolux",
  description:
    "Commercial fountain lights and water feature LED systems with DMX512 synchronized control. Center-hole designs for water jet integration, adjustable SS316L brackets. IP68 waterproof, RGBW color changing.",
  keywords: [
    "DMX512 fountain light",
    "musical fountain LED",
    "center hole fountain light",
    "RGBW water feature light",
    "commercial fountain lighting",
    "landscape fountain LED",
    "waterfall LED light",
  ],
};

const faqs = [
  {
    question: "What is a center-hole fountain light and why is it important?",
    answer:
      "A center-hole fountain light has a hollow core that allows a water jet nozzle to pass through the center of the fixture. This creates the dramatic effect where the water column appears to emerge directly from the light source. Our PLX Fountain Music 18W features a 25mm center hole for standard fountain jet nozzles.",
  },
  {
    question: "How does DMX512 synchronization work for musical fountains?",
    answer:
      "DMX512 is a digital control protocol that sends synchronized color, brightness, and transition commands to every connected fixture simultaneously. A single DMX controller can manage 50+ fountain lights with zero perceivable lag between fixtures. Each light is assigned a unique DMX address, and the controller sends frame-perfect commands in sync with the music track.",
  },
  {
    question: "Can fountain lights be submerged continuously?",
    answer:
      "Yes, all Poolux fountain lights carry IP68 certification, meaning they are rated for continuous submersion. The full epoxy potting process eliminates any internal air cavity where water could accumulate. For musical fountains with pumps that may run dry periodically, the tempered glass lens is rated for thermal shock.",
  },
  {
    question: "What is the difference between standalone and DMX512 fountain lights?",
    answer:
      "Standalone lights (like the PLX Fountain Jet 6W) operate independently with fixed color or simple RGBW cycling. DMX512 lights (like the PLX Fountain Music 18W) connect to a central controller for synchronized, programmable color shows across dozens of fixtures — essential for musical fountains and choreographed water features.",
  },
];

export default function FountainWaterFeatureLightsPage() {
  const products = getProductsByCategory("fountain-water-feature-lights");

  return (
    <>
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateFAQSchema(faqs)) }} />
      <Script id="breadcrumb-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateBreadcrumbSchema([
        { name: "Home", url: "https://poolux-lighting.com" },
        { name: "Products", url: "https://poolux-lighting.com/products" },
        { name: "Fountain & Water Feature Lights", url: "https://poolux-lighting.com/products/fountain-water-feature-lights" },
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
                <span className="text-white/80">Fountain & Water Feature Lights</span>
              </nav>
              <Badge className="mb-4 border-[#8B5CF6]/30 bg-[#8B5CF6]/10 text-[#8B5CF6]">
                <Droplets className="mr-1.5 h-3.5 w-3.5" /> Water Feature Category
              </Badge>
              <h1 className="text-3xl font-bold tracking-tight text-white md:text-5xl">
                DMX512 Fountain &amp;
                <span className="bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] bg-clip-text text-transparent"> Water Feature LED Lights</span>
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/50 md:text-lg">
                Specialized LED lighting for musical fountains, landscape streams, waterfalls, and architectural water features.
                Center-hole designs for jet integration, adjustable SS316L brackets for precision beam placement, and DMX512 synchronized control for choreographed light shows.
              </p>
            </FadeContent>
          </div>
        </section>

        <section className="border-b border-white/10 bg-white/[0.01] py-6">
          <div className="mx-auto max-w-7xl px-4 md:px-8">
            <div className="flex flex-wrap justify-center gap-6 md:gap-12">
              {[
                { icon: Shield, label: "SS316L Stainless Steel" },
                { icon: Zap, label: "DMX512 / Standalone" },
                { icon: Droplets, label: "Center-Hole Jet Compatible" },
                { icon: CheckCircle2, label: "IP68 Continuous Submersion" },
              ].map((spec) => (
                <div key={spec.label} className="flex items-center gap-2 text-sm text-white/60">
                  <spec.icon className="h-4 w-4 text-[#8B5CF6]" /> {spec.label}
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
                { title: "Musical Fountains", desc: "DMX512 protocol enables frame-perfect synchronization between the music track and dozens of RGBW fountain lights for resort-scale water shows." },
                { title: "Monumental Water Features", desc: "High-output 18W fixtures with 2000lm brightness light up large-scale city square fountains and architectural water features." },
                { title: "Landscape Streams & Waterfalls", desc: "Compact 6W center-hole lights integrate with thin water jets and spray nozzles for garden streams and cascading waterfall illumination." },
                { title: "Theme Park Water Shows", desc: "Full DMX512 integration with third-party show controllers for synchronized fountain, light, and sound performances at theme parks and attractions." },
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
                { href: "/products/in-ground-pool-lights", title: "In-Ground Pool Lights", desc: "IP68 flush-mount pool lights with 12V/24V DC low-voltage safety" },
                { href: "/products/marine-saltwater-lights", title: "Marine & Saltwater-Grade Lights", desc: "ASTM B117 tested SS316L fixtures for coastal and saltwater environments" },
              ].map((link, i) => (
                <FadeContent key={link.title} delay={i * 0.1}>
                  <Link href={link.href} className="group flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-all hover:border-[#8B5CF6]/20">
                    <div>
                      <h3 className="font-semibold text-white group-hover:text-[#8B5CF6]">{link.title}</h3>
                      <p className="mt-1 text-sm text-white/50">{link.desc}</p>
                    </div>
                    <ArrowRight className="h-5 w-5 text-white/30 transition-transform group-hover:translate-x-1 group-hover:text-[#8B5CF6]" />
                  </Link>
                </FadeContent>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-white/10 py-16">
          <div className="mx-auto max-w-3xl px-4 text-center md:px-8">
            <FadeContent>
              <h2 className="text-2xl font-bold text-white">Need a Fountain Lighting Design?</h2>
              <p className="mt-3 text-white/50">Get a free DMX512 layout, jet-light integration plan, and wholesale pricing within 24 hours.</p>
              <Button size="lg" className="mt-4 bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] text-white">
                <Link href="/contact" className="flex items-center gap-2"><Send className="h-4 w-4" /> Request Fountain Lighting Quote</Link>
              </Button>
            </FadeContent>
          </div>
        </section>
      </div>
    </>
  );
}
