"use client";

import { SectionHeading } from "@/components/shared/SectionHeading";
import { FadeContent } from "@/components/shared/FadeContent";
import { CountUp } from "@/components/shared/CountUp";
import { Shield, Factory, Globe, Award, Anchor } from "lucide-react";

const stats = [
  { icon: Factory, value: 200, suffix: "+", label: "Employees" },
  { icon: Globe, value: 60, suffix: "+", label: "Countries Served" },
  { icon: Award, value: 15, suffix: "+", label: "Years Experience" },
  { icon: Shield, value: 500000, suffix: "+", label: "Units/Year Capacity" },
];

const values = [
  {
    title: "100% Pre-Shipment Testing",
    description:
      "Unlike competitors who batch-test, every single Poolux light undergoes individual air-tightness and 48-hour submerged pressure testing before leaving our factory. Zero exceptions.",
    icon: Shield,
  },
  {
    title: "Marine-Grade SS316L as Standard",
    description:
      "We use SS316L for the housing, screws, bracket, and cable gland — not just the visible parts. Our ASTM B117 salt-spray testing proves 10x longer life in chlorinated/saltwater vs SS304.",
    icon: Anchor,
  },
  {
    title: "In-House Mold & Die Workshop",
    description:
      "Our 8,000 sqm facility houses CNC machining, injection molding, SMT assembly, and epoxy potting lines under one roof. This vertical integration means faster custom orders and strict QC.",
    icon: Factory,
  },
  {
    title: "OEM/ODM for 60+ Global Brands",
    description:
      "15 years of white-label manufacturing for leading European and Middle Eastern lighting brands. We understand international certification requirements and documentation standards.",
    icon: Globe,
  },
];

export function ValueProposition() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <SectionHeading
          label="Why Poolux"
          title="Engineered to Never Fail Underwater"
          description="When a pool light fails, it's not just a warranty claim — it means draining the pool, breaking tiles, and closing the venue. We build lights that never put you in that position."
        />

        {/* Stats */}
        <div className="mb-20 grid grid-cols-2 gap-4 md:grid-cols-4">
          {stats.map((stat) => (
            <FadeContent key={stat.label}>
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 text-center backdrop-blur-sm">
                <stat.icon className="mx-auto mb-3 h-6 w-6 text-[#0EA5E9]" />
                <div className="text-2xl font-bold text-white md:text-3xl">
                  <CountUp to={stat.value} suffix={stat.suffix} />
                </div>
                <div className="mt-1 text-xs text-white/50">{stat.label}</div>
              </div>
            </FadeContent>
          ))}
        </div>

        {/* Value Cards */}
        <div className="grid gap-6 md:grid-cols-2">
          {values.map((item, i) => (
            <FadeContent key={item.title} delay={i * 0.1}>
              <div className="group rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-all hover:border-[#0EA5E9]/20 hover:bg-white/[0.04] md:p-8">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#0EA5E9]/10">
                  <item.icon className="h-6 w-6 text-[#0EA5E9]" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-white">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-white/50">
                  {item.description}
                </p>
              </div>
            </FadeContent>
          ))}
        </div>
      </div>
    </section>
  );
}
