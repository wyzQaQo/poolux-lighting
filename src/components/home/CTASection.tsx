"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FadeContent } from "@/components/shared/FadeContent";
import { ArrowRight, Send, Calculator, FileText } from "lucide-react";

export function CTASection() {
  return (
    <section className="relative overflow-hidden py-24">
      {/* Background glow */}
      <div className="absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0EA5E9]/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 md:px-8">
        <FadeContent>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl">
              Ready to Light Up
              <span className="bg-gradient-to-r from-[#0EA5E9] to-[#38BDF8] bg-clip-text text-transparent">
                {" "}Your Project
              </span>
              ?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/50 md:text-lg">
              Tell us about your pool or water feature. We will provide a
              custom lighting layout, wiring diagram, and wholesale quote
              within 24 hours — free of charge.
            </p>
          </div>
        </FadeContent>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            {
              icon: Calculator,
              title: "Use Our Calculator",
              desc: "Estimate transformer size and wire gauge for your installation. Get instant engineering guidance.",
              href: "/products",
              btn: "Try Transformer & Wire Gauge Calculator",
            },
            {
              icon: FileText,
              title: "Browse Technical Blog",
              desc: "Deep-dive guides on corrosion prevention, DMX512 programming, and pool lighting safety.",
              href: "/blog",
              btn: "Read Pool Lighting Engineering Guides",
            },
            {
              icon: Send,
              title: "Request Custom Quote",
              desc: "Get a personalized lighting layout, wiring diagram, and wholesale pricing within 24 hours.",
              href: "/contact",
              btn: "Get IP68 Pool Light Quotation",
            },
          ].map((item, i) => (
            <FadeContent key={item.title} delay={i * 0.15}>
              <div className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.02] p-6 text-center backdrop-blur-sm md:p-8">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#0EA5E9]/10">
                  <item.icon className="h-6 w-6 text-[#0EA5E9]" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-white">
                  {item.title}
                </h3>
                <p className="mb-6 flex-1 text-sm leading-relaxed text-white/50">
                  {item.desc}
                </p>
                <Button
                  variant={i === 2 ? "default" : "outline"}
                  className={
                    i === 2
                      ? "bg-gradient-to-r from-[#0EA5E9] to-[#38BDF8] text-white"
                      : "border-white/20 text-white hover:bg-white/5"
                  }
                >
                  <Link href={item.href}>
                    {item.btn}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </FadeContent>
          ))}
        </div>
      </div>
    </section>
  );
}
