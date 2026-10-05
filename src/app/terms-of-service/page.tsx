export const dynamicParams = false;
import type { Metadata } from "next";
import Script from "next/script";
import { FadeContent } from "@/components/shared/FadeContent";
import { generateFAQSchema } from "@/components/layout/SEO";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Poolux Lighting terms of service for commercial underwater LED lighting inquiries, quotations, and wholesale purchases.",
};

const faqs = [
  {
    question: "Are Poolux Lighting quotations binding?",
    answer:
      "Quotations are valid for 30 days from the date of issue. Prices are subject to change based on raw material costs (primarily SS316L stainless steel and LED components), shipping rates, and order volume. Final pricing is confirmed in the proforma invoice.",
  },
  {
    question: "What warranty terms apply to Poolux products?",
    answer:
      "Standard warranty is 3 years for most products and 5 years for Marine Coastal series, covering manufacturing defects and premature LED failure under normal operating conditions. Warranty does not cover damage from improper installation, use of non-recommended transformers, or operation outside specified voltage ranges.",
  },
];

export default function TermsOfServicePage() {
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
          <div className="mx-auto max-w-3xl px-4 md:px-8">
            <FadeContent>
              <h1 className="text-3xl font-bold text-white md:text-5xl">Terms of Service</h1>
              <p className="mt-4 text-white/50">Last updated: June 2026</p>
            </FadeContent>
          </div>
        </section>
        <section className="py-16">
          <div className="mx-auto max-w-3xl px-4 md:px-8">
            <FadeContent>
              <div className="prose prose-invert max-w-none">
                <h2>1. Quotations & Pricing</h2>
                <p>All quotations for IP68 underwater LED lighting systems are valid for 30 days. Final pricing is confirmed via proforma invoice and may vary based on SS316L raw material costs, shipping rates, and order quantity.</p>
                <h2>2. Orders & Payment</h2>
                <p>Orders are confirmed upon receipt of 30% deposit (T/T). Balance payment is due before shipment. For OEM/ODM projects, a separate manufacturing agreement applies.</p>
                <h2>3. Shipping & Delivery</h2>
                <p>Standard lead time is 15-25 working days for stock products. Custom OEM orders require 30-45 days. FOB Shenzhen or CIF destination port.</p>
                <h2>4. Warranty</h2>
                <p>3-year standard warranty; 5-year for Marine Coastal series. Coverage: manufacturing defects and premature LED failure under normal operation with proper transformer and installation.</p>
                <h2>5. Returns & Claims</h2>
                <p>Quality claims must be submitted within 14 days of receipt with photographic evidence. Approved claims result in replacement or credit note.</p>
              </div>
            </FadeContent>
          </div>
        </section>
      </div>
    </>
  );
}
