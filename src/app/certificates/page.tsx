export const dynamicParams = false;
import type { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";
import { FadeContent } from "@/components/shared/FadeContent";
import { generateFAQSchema } from "@/components/layout/SEO";
import { Shield, Globe, Zap, Droplets, Anchor, ClipboardCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Certifications | IP68 CE RoHS FCC UL ASTM B117 | Poolux Lighting",
  description:
    "Poolux Lighting certifications: CE, RoHS, FCC, IP68, UL Listed, and ASTM B117 salt-spray tested. Every underwater LED fixture is 100% individually tested before shipment.",
};

const faqs = [
  {
    question: "What certifications do Poolux commercial pool lights hold?",
    answer:
      "Our underwater LED fixtures carry CE (European safety), RoHS (hazardous substance compliance), FCC (US electromagnetic compatibility), IP68 (dust-tight + continuous submersion), UL Listed (US electrical safety), and ASTM B117 (72-hour accelerated salt-spray corrosion testing). All certificates are available for verification.",
  },
  {
    question: "Is IP68 certification tested on every unit or batch-sampled?",
    answer:
      "Poolux tests 100% of units individually — not batch-sampled. Every single fixture undergoes pneumatic air-tightness testing and 48-hour submerged pressure chamber testing at 2x rated depth before shipment. Failed units are destroyed, not sold.",
  },
];

export default function CertificatesPage() {
  const certs = [
    { name: "CE", icon: Globe, desc: "European safety, health, and environmental protection compliance." },
    { name: "RoHS", icon: Shield, desc: "Restriction of Hazardous Substances — lead-free, mercury-free manufacturing." },
    { name: "FCC", icon: Zap, desc: "US Federal Communications Commission — EMI/EMC compliance." },
    { name: "IP68", icon: Droplets, desc: "Total dust ingress protection + continuous submersion beyond 1m depth." },
    { name: "UL Listed", icon: ClipboardCheck, desc: "Underwriters Laboratories — US electrical safety standard." },
    { name: "ASTM B117", icon: Anchor, desc: "72-hour accelerated salt-spray corrosion test — marine environment validated." },
  ];

  return (
    <>
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateFAQSchema(faqs)) }} />
      <div className="min-h-screen">
        <section className="border-b border-white/10 bg-[#0A1628]/50 py-20 pt-28">
          <div className="mx-auto max-w-7xl px-4 md:px-8">
            <FadeContent>
              <span className="mb-3 inline-block rounded-full border border-[#0EA5E9]/30 bg-[#0EA5E9]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#0EA5E9]">Compliance</span>
              <h1 className="text-3xl font-bold text-white md:text-5xl">Certifications &amp; Compliance</h1>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/50 md:text-lg">
                Every Poolux underwater LED light is tested and certified to international standards. 100% unit-by-unit air-tightness + 48-hour submersion testing — not batch-sampled.
              </p>
            </FadeContent>
          </div>
        </section>
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 md:px-8">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {certs.map((cert, i) => (
                <FadeContent key={cert.name} delay={i * 0.1}>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 md:p-8">
                    <cert.icon className="mb-4 h-8 w-8 text-[#0EA5E9]" />
                    <h3 className="mb-2 text-lg font-semibold text-white">{cert.name}</h3>
                    <p className="text-sm text-white/50">{cert.desc}</p>
                  </div>
                </FadeContent>
              ))}
            </div>
            <FadeContent className="mt-12 text-center">
              <p className="text-sm text-white/40">
                Certificate copies available upon request.{" "}
                <Link href="/contact" className="text-[#0EA5E9] underline underline-offset-2">Contact us for verification →</Link>
              </p>
            </FadeContent>
          </div>
        </section>
      </div>
    </>
  );
}
