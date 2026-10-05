import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { FadeContent } from "@/components/shared/FadeContent";
import { ProductCard } from "@/components/products/ProductCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getAllProducts, getCategories } from "@/lib/data";
import { generateFAQSchema } from "@/components/layout/SEO";

export const metadata: Metadata = {
  title: "Commercial Underwater LED Lights | IP68 Pool & Fountain Lighting",
  description:
    "Browse our complete range of IP68 SS316L underwater LED lights. In-ground pool lights, fountain lights, and marine-grade fixtures. DMX512 RGBW. Factory-direct pricing.",
  keywords: [
    "commercial pool lights",
    "IP68 underwater LED",
    "fountain lights DMX512",
    "SS316L pool light",
    "marine underwater lighting",
  ],
};

const faqs = [
  {
    question: "What types of commercial underwater LED lights does Poolux offer?",
    answer:
      "Poolux offers three specialized product categories: In-Ground Pool Lights (flush-mount for infinity and resort pools with 12V/24V DC low-voltage safety), Fountain & Water Feature Lights (center-hole designs for musical fountains with DMX512 synchronized control), and Marine & Saltwater-Grade Lights (SS316L with 72-hour ASTM B117 salt-spray testing for coastal and marina installations).",
  },
  {
    question: "What is the minimum order quantity for Poolux wholesale products?",
    answer:
      "Standard MOQ is 50 units for stock products across all categories. For OEM/ODM custom projects with specific color temperatures, beam angles, or cable lengths, MOQ is typically 200 units. Contact our sales team for project-specific quotations with free wiring diagrams.",
  },
  {
    question: "Do Poolux products support DMX512 and RGBW color control?",
    answer:
      "Yes, all Poolux Pro and Music series products support DMX512 protocol for synchronized multi-fixture color control. Our standard RGBW + Warm White 3000K configuration provides millions of color combinations plus a pure warm white mode for architectural lighting. For simpler installations, 4-Wire Sync provides the same synchronization without a DMX controller.",
  },
];

export default function ProductsPage() {
  const products = getAllProducts();
  const categories = getCategories();

  return (
    <>
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateFAQSchema(faqs)) }}
      />
    <div className="min-h-screen">
      {/* Page Header */}
      <section className="border-b border-white/10 bg-[#0A1628]/50 py-20 pt-28">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <FadeContent>
            <span className="mb-3 inline-block rounded-full border border-[#0EA5E9]/30 bg-[#0EA5E9]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#0EA5E9]">
              Product Catalog
            </span>
            <h1 className="text-3xl font-bold tracking-tight text-white md:text-5xl">
              IP68 SS316L Underwater
              <span className="bg-gradient-to-r from-[#0EA5E9] to-[#38BDF8] bg-clip-text text-transparent">
                {" "}LED Lighting Systems
              </span>
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/50 md:text-lg">
              Every product is 100% air-tightness tested and 48-hour submerged
              pressure validated before shipment. Select a category to find the
              right fixture for your installation scenario.
            </p>
          </FadeContent>
        </div>
      </section>

      {/* Products */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <Tabs defaultValue="all" className="w-full">
            <div className="mb-10 overflow-x-auto">
              <TabsList className="h-auto flex-wrap gap-1 bg-transparent p-0">
                <TabsTrigger
                  value="all"
                  className="rounded-lg border border-white/10 data-[state=active]:border-[#0EA5E9]/30 data-[state=active]:bg-[#0EA5E9]/10 data-[state=active]:text-[#0EA5E9]"
                >
                  All Products
                </TabsTrigger>
                {categories.map((cat) => (
                  <TabsTrigger
                    key={cat.slug}
                    value={cat.slug}
                    className="rounded-lg border border-white/10 data-[state=active]:border-[#0EA5E9]/30 data-[state=active]:bg-[#0EA5E9]/10 data-[state=active]:text-[#0EA5E9]"
                  >
                    {cat.name}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            <TabsContent value="all" className="mt-0">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {products.map((product) => (
                  <ProductCard key={product.slug} product={product} />
                ))}
              </div>
            </TabsContent>
            {categories.map((cat) => (
              <TabsContent key={cat.slug} value={cat.slug} className="mt-0">
                <p className="mb-6 text-sm text-white/50">{cat.description}</p>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {products
                    .filter((p) => p.category === cat.slug)
                    .map((product) => (
                      <ProductCard key={product.slug} product={product} />
                    ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>
    </div>
    </>
  );
}
