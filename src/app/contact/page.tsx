export const dynamicParams = false;
import type { Metadata } from "next";
import Script from "next/script";
import { FadeContent } from "@/components/shared/FadeContent";
import { ContactForm } from "@/components/shared/ContactForm";
import { Mail, Phone, MapPin, Clock, MessageCircle } from "lucide-react";
import { generateFAQSchema } from "@/components/layout/SEO";

const faqs = [
  {
    question: "How quickly will Poolux respond to my commercial pool lighting inquiry?",
    answer:
      "Our engineering team responds to all inquiries within 24 hours (Monday-Saturday, UTC+8). For urgent commercial projects, you can call or WhatsApp us at +86 138 1234 5678 for same-day response. Every inquiry includes a free custom wiring diagram and transformer specification.",
  },
  {
    question: "What information should I include in my RFQ to get an accurate quote?",
    answer:
      "For the most accurate quotation and wiring diagram, please include: pool dimensions (length × width × depth), number of lights desired, preferred voltage (12V or 24V DC), desired color control (RGBW DMX512, 4-Wire Sync, or standalone), transformer-to-pool distance, and your target installation timeline. CAD drawings or pool plans are appreciated but not required.",
  },
  {
    question: "Does Poolux provide samples for testing before bulk orders?",
    answer:
      "Yes, we provide sample units for qualified commercial buyers to evaluate build quality, IP68 waterproofing, RGBW color performance, and DMX512 synchronization before placing bulk orders. Sample shipping costs are borne by the buyer but credited against the first bulk order.",
  },
];

export const metadata: Metadata = {
  title: "Contact Us | Get Custom Pool Lighting Quote & Wiring Diagram",
  description:
    "Contact Poolux Lighting for custom underwater LED quotes, wiring diagrams, and technical consultation. 24-hour response from our engineering team.",
  keywords: [
    "pool lighting quote",
    "underwater LED inquiry",
    "custom wiring diagram",
    "IP68 pool light supplier contact",
  ],
};

export default function ContactPage() {
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
              Get in Touch
            </span>
            <h1 className="text-3xl font-bold tracking-tight text-white md:text-5xl">
              Request a Custom
              <span className="bg-gradient-to-r from-[#0EA5E9] to-[#38BDF8] bg-clip-text text-transparent">
                {" "}Quote &amp; Wiring Diagram
              </span>
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/50 md:text-lg">
              Tell us about your pool or water feature project. Our engineering
              team will provide a custom lighting layout, wiring diagram,
              transformer specification, and wholesale price within 24 hours.
            </p>
          </FadeContent>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="grid gap-12 lg:grid-cols-5">
            {/* Contact Info */}
            <div className="lg:col-span-2">
              <FadeContent>
                <h2 className="mb-6 text-xl font-semibold text-white">
                  Contact Information
                </h2>
                <div className="space-y-4">
                  {[
                    {
                      icon: Mail,
                      label: "Email",
                      value: "inquiry@poolux-lighting.com",
                      href: "mailto:inquiry@poolux-lighting.com",
                    },
                    {
                      icon: Phone,
                      label: "Phone / WhatsApp",
                      value: "+86 138 1234 5678",
                      href: "tel:+8613812345678",
                    },
                    {
                      icon: MessageCircle,
                      label: "WhatsApp",
                      value: "Chat with an engineer",
                      href: "https://wa.me/8613812345678",
                    },
                    {
                      icon: MapPin,
                      label: "Factory Address",
                      value:
                        "No. 88, LED Industrial Park, Zhongshan, Guangdong 528400, China",
                    },
                    {
                      icon: Clock,
                      label: "Business Hours",
                      value: "Mon-Sat: 8:00 AM – 6:00 PM (UTC+8)",
                    },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-4"
                    >
                      <item.icon className="mt-0.5 h-5 w-5 text-[#0EA5E9]" />
                      <div>
                        <p className="text-xs text-white/40">{item.label}</p>
                        {item.href ? (
                          <a
                            href={item.href}
                            className="text-sm font-medium text-white hover:text-[#0EA5E9]"
                            target={item.href.startsWith("http") ? "_blank" : undefined}
                            rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                          >
                            {item.value}
                          </a>
                        ) : (
                          <p className="text-sm font-medium text-white">
                            {item.value}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 rounded-2xl border border-[#F59E0B]/20 bg-[#F59E0B]/5 p-6">
                  <h3 className="text-sm font-semibold text-[#F59E0B]">
                    Urgent Project?
                  </h3>
                  <p className="mt-2 text-sm text-white/50">
                    Call or WhatsApp us directly for same-day response on
                    urgent commercial project inquiries.
                  </p>
                </div>
              </FadeContent>
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              <FadeContent direction="right">
                <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 md:p-8">
                  <h2 className="mb-6 text-xl font-semibold text-white">
                    Send an Inquiry
                  </h2>
                  <ContactForm />
                </div>
              </FadeContent>
            </div>
          </div>
        </div>
      </section>
    </div>
    </>
  );
}
