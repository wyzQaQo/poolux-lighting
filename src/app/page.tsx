export const dynamicParams = false;
import { HeroSection } from "@/components/home/HeroSection";
import { CertificationsBar } from "@/components/home/CertificationsBar";
import { ProductGrid } from "@/components/home/ProductGrid";
import { ValueProposition } from "@/components/home/ValueProposition";
import { CTASection } from "@/components/home/CTASection";
import { BlogPreview } from "@/components/home/BlogPreview";
import Script from "next/script";
import { generateOrganizationSchema, generateFAQSchema } from "@/components/layout/SEO";

const homeFaqs = [
  {
    question: "What type of underwater LED lights does Poolux manufacture?",
    answer:
      "Poolux specializes in commercial-grade IP68 underwater LED lighting systems in three categories: In-Ground Pool Lights (flush-mount for infinity and resort pools), Fountain & Water Feature Lights (center-hole designs for musical fountains and waterfalls), and Marine & Saltwater-Grade Lights (SS316L with ASTM B117 salt-spray testing for coastal and marina environments).",
  },
  {
    question: "Are Poolux pool lights safe — can they cause electric shock?",
    answer:
      "Absolutely safe. All Poolux pool lights operate on 12V or 24V DC low-voltage power, which is within SELV (Safety Extra Low Voltage) limits as defined by IEC 60364-7-702 and NEC 680. Even if the fixture housing is physically damaged and wires are exposed, the voltage is too low to cause electric shock. Every unit also undergoes 100% pneumatic air-tightness testing before shipment.",
  },
  {
    question: "What material are Poolux underwater lights made from?",
    answer:
      "All Poolux underwater lights use SS316L marine-grade stainless steel for the housing, screws, bracket, and cable gland — not just the visible face. SS316L contains 2-3% molybdenum for superior resistance to chloride-induced pitting corrosion in chlorinated pools and saltwater environments. Our Marine Coastal series is further validated with 72-hour ASTM B117 accelerated salt-spray testing.",
  },
  {
    question: "Does Poolux offer wholesale pricing for bulk commercial orders?",
    answer:
      "Yes, Poolux is a factory-direct manufacturer. We supply wholesale pricing for commercial resort projects, marina developments, and OEM/ODM partnerships. Typical MOQ is 50 units for stock products and 200 units for custom OEM designs. Contact our sales team for a project-specific quotation with wiring diagram included.",
  },
];

export default function HomePage() {
  const orgSchema = generateOrganizationSchema();

  return (
    <>
      <Script
        id="organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateFAQSchema(homeFaqs)) }}
      />
      <HeroSection />
      <CertificationsBar />
      <ProductGrid />
      <ValueProposition />
      <CTASection />
      <BlogPreview />
    </>
  );
}
