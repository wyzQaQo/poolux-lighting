import type { Metadata } from "next";
import Script from "next/script";
import { FadeContent } from "@/components/shared/FadeContent";
import { generateFAQSchema } from "@/components/layout/SEO";
import { Shield, Droplets, Zap, Wrench, Microscope, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Quality Control | 100% IP68 Testing | Poolux Lighting",
  description:
    "Poolux Lighting quality control: 100% unit-by-unit air-tightness testing, 48-hour submerged pressure testing, and ASTM B117 salt-spray validation for SS316L underwater LED lights.",
};

const faqs = [
  {
    question: "How does Poolux ensure every IP68 underwater light is truly waterproof?",
    answer:
      "We run a mandatory two-stage test on 100% of units: (1) Pneumatic air-tightness testing to detect micro-leaks at the micron level, and (2) 48-hour submerged pressure chamber testing at 2x the rated depth. Any unit failing either test is destroyed. We do not sell B-grade or factory-second units.",
  },
  {
    question: "What is your warranty claim rate?",
    answer:
      "Our warranty claim rate is under 0.3%, which is among the lowest in the commercial underwater lighting industry. This is a direct result of our 100% unit-by-unit testing policy — every light is verified before it ships.",
  },
];

export default function QualityPage() {
  const qcSteps = [
    {
      icon: Microscope,
      title: "Incoming Material Inspection",
      desc: "Every batch of SS316L stainless steel, LED chips, and epoxy resin is spectrographically verified against material certificates before entering production. Counterfeit or substandard materials are rejected at the gate.",
    },
    {
      icon: Wrench,
      title: "In-Process QC",
      desc: "Three inspection gates during production: post-CNC machining dimensional check (±0.05mm tolerance), post-SMT assembly X-ray solder inspection, and post-epoxy potting vacuum integrity verification.",
    },
    {
      icon: Droplets,
      title: "100% Pneumatic Air-Tightness Test",
      desc: "Every single unit is pressurized with air and submerged in a water tank. Any bubble — even a single one — means rejection. This detects leaks at the micron level that visual inspection would miss.",
    },
    {
      icon: Zap,
      title: "48-Hour Submerged Pressure Test",
      desc: "Units are submerged in a pressure chamber at 2x rated depth for 48 continuous hours. Electrical parameters (voltage, current, lumen output) are monitored throughout. Post-test teardown inspection on sample units.",
    },
    {
      icon: Shield,
      title: "ASTM B117 Salt-Spray Test (Marine Series)",
      desc: "Marine-grade fixtures undergo 72-hour accelerated salt-spray corrosion testing per ASTM B117. Only units showing zero surface pitting are approved for Marine Coastal series labeling.",
    },
    {
      icon: CheckCircle2,
      title: "Final Visual & Electrical QC",
      desc: "100% visual inspection for cosmetic defects, lumen output verification against specification, and DMX512/RF control protocol functional test before anti-corrosion packaging.",
    },
  ];

  return (
    <>
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateFAQSchema(faqs)) }} />
      <div className="min-h-screen">
        <section className="border-b border-white/10 bg-[#0A1628]/50 py-20 pt-28">
          <div className="mx-auto max-w-7xl px-4 md:px-8">
            <FadeContent>
              <span className="mb-3 inline-block rounded-full border border-[#10B981]/30 bg-[#10B981]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#10B981]">Quality</span>
              <h1 className="text-3xl font-bold text-white md:text-5xl">Quality Control</h1>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/50 md:text-lg">
                We do not batch-sample. Every single Poolux underwater LED light is individually tested for air-tightness and
                submerged for 48 hours at 2x rated depth before shipment. Warranty claim rate: under 0.3%.
              </p>
            </FadeContent>
          </div>
        </section>
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 md:px-8">
            <div className="space-y-6">
              {qcSteps.map((step, i) => (
                <FadeContent key={step.title} delay={i * 0.1}>
                  <div className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-6 md:p-8">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#10B981]/10">
                      <step.icon className="h-6 w-6 text-[#10B981]" />
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
      </div>
    </>
  );
}
