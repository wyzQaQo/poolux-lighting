export const dynamicParams = false;
import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { FadeContent } from "@/components/shared/FadeContent";
import { Button } from "@/components/ui/button";
import { generateFAQSchema } from "@/components/layout/SEO";
import { FileText, Download, BookOpen, FileSpreadsheet, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Resources | Wiring Diagrams & Installation Guides for Pool Lighting",
  description:
    "Download free wiring diagrams, transformer sizing guides, installation manuals, and technical datasheets for IP68 SS316L commercial underwater LED lighting systems.",
};

const faqs = [
  {
    question: "Do you provide free wiring diagrams for pool lighting installations?",
    answer:
      "Yes, Poolux provides free custom wiring diagrams for every commercial project inquiry. Simply submit your pool dimensions and fixture count through our contact form, and our engineering team will deliver a detailed layout showing transformer placement, cable routing, and wire gauge recommendations.",
  },
  {
    question: "What technical documents are available for download?",
    answer:
      "We provide product datasheets (PDF), installation manuals, DMX512 programming guides, transformer sizing charts, and IEC 60364-7-702 compliance documentation. All documents are available upon request through our inquiry system.",
  },
];

const resources = [
  {
    title: "Product Datasheets",
    description: "Complete technical specifications for all IP68 SS316L underwater LED fixtures.",
    icon: FileText,
    href: "/contact",
  },
  {
    title: "Installation Manuals",
    description: "Step-by-step guides for in-ground, wall-mount, and fountain light installation.",
    icon: BookOpen,
    href: "/contact",
  },
  {
    title: "DMX512 Programming Guide",
    description: "Controller setup, channel mapping, and synchronized RGBW scene programming.",
    icon: FileSpreadsheet,
    href: "/contact",
  },
  {
    title: "Wiring & Transformer Sizing",
    description: "Voltage drop tables, AWG selection charts, and transformer sizing formulas.",
    icon: Download,
    href: "/contact",
  },
];

export default function ResourcesPage() {
  return (
    <>
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateFAQSchema(faqs)),
        }}
      />
      <div className="min-h-screen">
        <section className="border-b border-white/10 bg-[#0A1628]/50 py-20 pt-28">
          <div className="mx-auto max-w-7xl px-4 md:px-8">
            <FadeContent>
              <span className="mb-3 inline-block rounded-full border border-[#0EA5E9]/30 bg-[#0EA5E9]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#0EA5E9]">
                Technical Library
              </span>
              <h1 className="text-3xl font-bold text-white md:text-5xl">
                Wiring Diagrams &amp;
                <span className="bg-gradient-to-r from-[#0EA5E9] to-[#38BDF8] bg-clip-text text-transparent"> Installation Resources</span>
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/50 md:text-lg">
                Free technical documentation for specifiers, electrical contractors, and landscape
                architects working with commercial underwater LED lighting systems.
              </p>
            </FadeContent>
          </div>
        </section>
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 md:px-8">
            <div className="grid gap-6 md:grid-cols-2">
              {resources.map((r, i) => (
                <FadeContent key={r.title} delay={i * 0.1}>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 md:p-8">
                    <r.icon className="mb-4 h-8 w-8 text-[#0EA5E9]" />
                    <h3 className="mb-2 text-lg font-semibold text-white">{r.title}</h3>
                    <p className="mb-4 text-sm text-white/50">{r.description}</p>
                    <Button variant="outline" className="border-white/20 text-white hover:bg-white/5">
                      <Link href={r.href} className="flex items-center gap-2">
                        Request Access <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </FadeContent>
              ))}
            </div>
            <FadeContent className="mt-12 text-center">
              <p className="text-sm text-white/40">
                Need a custom wiring diagram for your specific pool?{" "}
                <Link href="/contact" className="text-[#0EA5E9] underline underline-offset-2">
                  Submit your project details →
                </Link>
              </p>
            </FadeContent>
          </div>
        </section>
      </div>
    </>
  );
}
