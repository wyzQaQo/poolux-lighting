"use client";

import { motion } from "motion/react";
import {
  ShieldCheck,
  Globe,
  Zap,
  Droplets,
  Anchor,
  ClipboardCheck,
} from "lucide-react";

const certifications = [
  {
    name: "CE",
    icon: Globe,
    description: "European safety & health compliance",
  },
  {
    name: "RoHS",
    icon: ShieldCheck,
    description: "Lead-free, mercury-free manufacturing",
  },
  {
    name: "FCC",
    icon: Zap,
    description: "US EMI/EMC electromagnetic compliance",
  },
  {
    name: "IP68",
    icon: Droplets,
    description: "Total dust protection + continuous submersion",
  },
  {
    name: "UL Listed",
    icon: ClipboardCheck,
    description: "US electrical safety standard approved",
  },
  {
    name: "ASTM B117",
    icon: Anchor,
    description: "72hr salt-spray corrosion test — marine validated",
  },
];

export function CertificationsBar() {
  return (
    <section className="border-y border-white/10 bg-white/[0.02] py-8">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mb-6 text-center text-xs font-semibold uppercase tracking-[0.2em] text-[#0EA5E9]"
        >
          100% Anti-Leakage Tested Before Shipment
        </motion.p>
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {certifications.map((cert, i) => (
            <motion.div
              key={cert.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group relative flex flex-col items-center gap-2"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] transition-all group-hover:border-[#0EA5E9]/30 group-hover:bg-[#0EA5E9]/5 group-hover:shadow-lg group-hover:shadow-[#0EA5E9]/10">
                <cert.icon className="h-6 w-6 text-white/50 transition-colors group-hover:text-[#0EA5E9]" />
              </div>
              <span className="text-xs font-bold text-white/80">{cert.name}</span>
              {/* Tooltip */}
              <div className="absolute -bottom-12 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-lg border border-white/10 bg-[#0A1628] px-3 py-1.5 text-[11px] text-white/60 opacity-0 shadow-xl transition-opacity group-hover:opacity-100">
                {cert.description}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
