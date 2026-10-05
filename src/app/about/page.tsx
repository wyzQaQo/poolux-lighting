export const dynamicParams = false;
import type { Metadata } from "next";
import Script from "next/script";
import { FadeContent } from "@/components/shared/FadeContent";
import { CountUp } from "@/components/shared/CountUp";
import { Factory, Globe, Award, Shield, Users, Building2 } from "lucide-react";
import { getCompanyInfo } from "@/lib/data";
import { generateFAQSchema } from "@/components/layout/SEO";

export const metadata: Metadata = {
  title: "About Poolux | IP68 SS316L Underwater LED Manufacturer",
  description:
    "Poolux Lighting — 15+ years specializing in IP68 SS316L commercial underwater LED lighting. 100% factory air-tightness tested. 60+ countries served.",
};

const faqs = [
  {
    question: "How long has Poolux Lighting been manufacturing underwater LED lights?",
    answer:
      "Poolux has been manufacturing LED lighting since 2009. We launched our first IP68 underwater LED product line in 2013 and upgraded all products to SS316L marine-grade stainless steel as standard in 2016. Today we export to 60+ countries from our 8,000 sqm facility in Zhongshan, China.",
  },
  {
    question: "Does Poolux offer OEM and ODM services for underwater lights?",
    answer:
      "Yes, Poolux has 15+ years of OEM/ODM experience serving leading European and Middle Eastern lighting brands. We can customize housing finishes, cable lengths, LED color temperatures, beam angles, mounting brackets, and packaging. In-house mold and die workshop ensures rapid prototyping and strict quality control on custom orders.",
  },
  {
    question: "What is Poolux's annual production capacity?",
    answer:
      "Our 8,000 sqm facility with 200+ skilled workers has an annual capacity of 500,000+ units. We maintain in-house CNC machining, SMT assembly lines, epoxy potting stations, and IP68 testing labs for full vertical integration — no outsourced processes that could compromise quality.",
  },
];

const milestones = [
  { year: "2009", title: "Founded in Zhongshan", desc: "Started as an OEM LED component supplier in China's lighting manufacturing hub." },
  { year: "2013", title: "First IP68 Product Line", desc: "Launched our first generation of fully potted IP68 underwater LED fixtures." },
  { year: "2016", title: "SS316L as Standard", desc: "Upgraded all product lines to SS316L marine-grade stainless steel as the baseline material." },
  { year: "2019", title: "DMX512 Integration", desc: "Introduced DMX512-compatible RGBW control across the entire product range." },
  { year: "2022", title: "60+ Countries", desc: "Expanded export footprint to over 60 countries across Europe, Middle East, and Southeast Asia." },
  { year: "2025", title: "100% Individual Testing", desc: "Implemented mandatory 100% unit-by-unit air-tightness + 48hr submersion testing." },
];

export default function AboutPage() {
  const company = getCompanyInfo();

  return (
    <>
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateFAQSchema(faqs)) }}
      />
    <div className="min-h-screen">
      {/* Header */}
      <section className="border-b border-white/10 bg-[#0A1628]/50 py-20 pt-28">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <FadeContent>
            <span className="mb-3 inline-block rounded-full border border-[#0EA5E9]/30 bg-[#0EA5E9]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#0EA5E9]">
              About Us
            </span>
            <h1 className="text-3xl font-bold tracking-tight text-white md:text-5xl">
              Engineered to
              <span className="bg-gradient-to-r from-[#0EA5E9] to-[#38BDF8] bg-clip-text text-transparent">
                {" "}Never Fail Underwater
              </span>
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/50 md:text-lg">
              {company.description}
            </p>
          </FadeContent>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {[
              { icon: Building2, value: 8000, suffix: " sqm", label: "Factory Size" },
              { icon: Users, value: 200, suffix: "+", label: "Employees" },
              { icon: Globe, value: 60, suffix: "+", label: "Countries" },
              { icon: Factory, value: 500000, suffix: "+", label: "Annual Capacity" },
            ].map((stat) => (
              <FadeContent key={stat.label}>
                <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 text-center">
                  <stat.icon className="mx-auto mb-3 h-6 w-6 text-[#0EA5E9]" />
                  <div className="text-2xl font-bold text-white md:text-3xl">
                    <CountUp to={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="mt-1 text-xs text-white/50">{stat.label}</div>
                </div>
              </FadeContent>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4 md:px-8">
          <FadeContent className="mb-12 text-center">
            <h2 className="text-2xl font-bold text-white md:text-3xl">
              Our Journey
            </h2>
          </FadeContent>

          <div className="relative">
            {/* Line */}
            <div className="absolute left-6 top-0 h-full w-px bg-white/10 md:left-1/2 md:-translate-x-px" />

            <div className="space-y-8">
              {milestones.map((m, i) => (
                <FadeContent key={m.year} delay={i * 0.1}>
                  <div
                    className={`relative flex gap-6 ${
                      i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                    }`}
                  >
                    {/* Dot */}
                    <div className="absolute left-6 z-10 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-[#0EA5E9] bg-[#0A1628] md:left-1/2" />

                    {/* Content */}
                    <div className={`ml-14 flex-1 md:ml-0 ${i % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                      <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
                        <span className="text-sm font-bold text-[#0EA5E9]">
                          {m.year}
                        </span>
                        <h3 className="mt-1 text-base font-semibold text-white">
                          {m.title}
                        </h3>
                        <p className="mt-1 text-sm text-white/50">{m.desc}</p>
                      </div>
                    </div>

                    {/* Spacer for alternating layout */}
                    <div className="hidden flex-1 md:block" />
                  </div>
                </FadeContent>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quality Commitment */}
      <section className="border-t border-white/10 py-16">
        <div className="mx-auto max-w-3xl px-4 md:px-8">
          <FadeContent className="text-center">
            <Shield className="mx-auto mb-4 h-10 w-10 text-[#0EA5E9]" />
            <h2 className="text-2xl font-bold text-white">
              Our Quality Promise
            </h2>
            <p className="mt-4 text-white/50">
              We do not batch-sample. Every single Poolux light is individually
              tested for air-tightness and submerged for 48 hours before
              shipment. If a light fails, it is destroyed — not sold as a
              "second" or "B-grade." This is why our warranty claim rate is
              under 0.3%.
            </p>
          </FadeContent>
        </div>
      </section>
    </div>
    </>
  );
}
