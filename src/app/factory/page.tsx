export const dynamicParams = false;
import type { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";
import { FadeContent } from "@/components/shared/FadeContent";
import { CountUp } from "@/components/shared/CountUp";
import { Button } from "@/components/ui/button";
import { generateFAQSchema } from "@/components/layout/SEO";
import { Factory, Cpu, Zap, TestTube, Package, ArrowRight, Send, Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "Factory Tour | 8,000 sqm IP68 Underwater LED Manufacturing | Poolux",
  description:
    "Tour Poolux Lighting's 8,000 sqm manufacturing facility in Zhongshan, China. See our CNC machining, SMT assembly, epoxy potting, and 100% unit-by-unit IP68 testing lines.",
};

const faqs = [
  {
    question: "Where is Poolux Lighting's factory located?",
    answer:
      "Our 8,000 sqm manufacturing facility is located at No. 88, LED Industrial Park, Zhongshan, Guangdong 528400, China — the global center of LED lighting manufacturing. We welcome factory visits from qualified buyers and can arrange hotel and transportation.",
  },
  {
    question: "Can I visit the factory before placing an order?",
    answer:
      "Absolutely. We encourage factory visits. You can tour our CNC machining workshop, SMT assembly line, epoxy potting station, and IP68 testing lab. Contact us to schedule a visit — we will provide an invitation letter for your visa application if needed.",
  },
];

const productionSteps = [
  { icon: Cpu, title: "CNC Machining", desc: "Precision SS316L housing machining from solid bar stock. Tolerance: ±0.05mm." },
  { icon: Zap, title: "SMT Assembly", desc: "Automated surface-mount LED placement. X-ray solder joint inspection on every board." },
  { icon: TestTube, title: "Epoxy Potting", desc: "Full vacuum epoxy filling. Zero internal air cavity for absolute waterproofing." },
  { icon: Shield, title: "100% IP68 Testing", desc: "Every unit: pneumatic air-tightness + 48hr submerged pressure chamber at 2x rated depth." },
  { icon: Package, title: "Final QC & Packing", desc: "Visual inspection, lumen output verification, marine-grade anti-corrosion packaging." },
];

export default function FactoryPage() {
  return (
    <>
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateFAQSchema(faqs)) }} />
      <div className="min-h-screen">
        <section className="border-b border-white/10 bg-[#0A1628]/50 py-20 pt-28">
          <div className="mx-auto max-w-7xl px-4 md:px-8">
            <FadeContent>
              <span className="mb-3 inline-block rounded-full border border-[#0EA5E9]/30 bg-[#0EA5E9]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#0EA5E9]">Manufacturing</span>
              <h1 className="text-3xl font-bold text-white md:text-5xl">Our Factory</h1>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/50 md:text-lg">
                8,000 sqm integrated manufacturing facility in Zhongshan, China — the global capital of LED lighting.
                CNC machining, SMT assembly, epoxy potting, and IP68 testing under one roof.
              </p>
            </FadeContent>
          </div>
        </section>

        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 md:px-8">
            <div className="mb-16 grid grid-cols-2 gap-4 md:grid-cols-4">
              {[
                { icon: Factory, value: 8000, suffix: " sqm", label: "Factory Size" },
                { icon: Factory, value: 200, suffix: "+", label: "Skilled Workers" },
                { icon: Package, value: 500000, suffix: "+", label: "Annual Capacity" },
                { icon: Shield, value: 100, suffix: "%", label: "Units Tested" },
              ].map((s) => (
                <FadeContent key={s.label}>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 text-center">
                    <s.icon className="mx-auto mb-3 h-6 w-6 text-[#0EA5E9]" />
                    <div className="text-2xl font-bold text-white"><CountUp to={s.value} suffix={s.suffix} /></div>
                    <div className="text-xs text-white/50">{s.label}</div>
                  </div>
                </FadeContent>
              ))}
            </div>
            <div className="space-y-6">
              {productionSteps.map((step, i) => (
                <FadeContent key={step.title} delay={i * 0.1}>
                  <div className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-6 md:p-8">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#0EA5E9]/10">
                      <step.icon className="h-6 w-6 text-[#0EA5E9]" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">{step.title}</h3>
                      <p className="mt-1 text-sm text-white/50">{step.desc}</p>
                    </div>
                  </div>
                </FadeContent>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-white/10 py-16">
          <div className="mx-auto max-w-3xl px-4 text-center md:px-8">
            <FadeContent>
              <h2 className="text-2xl font-bold text-white">Schedule a Factory Visit</h2>
              <p className="mt-3 text-white/50">We welcome qualified buyers for on-site inspection and audit.</p>
              <Button size="lg" className="mt-4 bg-gradient-to-r from-[#0EA5E9] to-[#38BDF8] text-white">
                <Link href="/contact" className="flex items-center gap-2">
                  <Send className="h-4 w-4" /> Book a Visit
                </Link>
              </Button>
            </FadeContent>
          </div>
        </section>
      </div>
    </>
  );
}
