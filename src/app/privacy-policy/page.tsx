import type { Metadata } from "next";
import Script from "next/script";
import { FadeContent } from "@/components/shared/FadeContent";
import { generateFAQSchema } from "@/components/layout/SEO";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Poolux Lighting privacy policy — how we collect, use, and protect your personal data when you submit inquiries or browse our commercial underwater lighting website.",
};

const faqs = [
  {
    question: "What personal data does Poolux Lighting collect?",
    answer:
      "We only collect the information you voluntarily provide through our RFQ inquiry forms: your name, company name, work email, phone number, country, and project details. We do not use tracking cookies beyond essential session functionality.",
  },
  {
    question: "How does Poolux use my inquiry data?",
    answer:
      "Your inquiry data is used exclusively to prepare custom quotes, wiring diagrams, and technical recommendations for your specific project. We never sell, rent, or share your contact information with third parties.",
  },
  {
    question: "How long is my data retained?",
    answer:
      "Inquiry data is retained for 24 months to support ongoing project communication and warranty service. You may request deletion at any time by emailing inquiry@poolux-lighting.com.",
  },
];

export default function PrivacyPolicyPage() {
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
              <h1 className="text-3xl font-bold text-white md:text-5xl">
                Privacy Policy
              </h1>
              <p className="mt-4 text-white/50">Last updated: June 2026</p>
            </FadeContent>
          </div>
        </section>
        <section className="py-16">
          <div className="mx-auto max-w-3xl px-4 md:px-8">
            <FadeContent>
              <div className="prose prose-invert max-w-none">
                <h2>1. Information We Collect</h2>
                <p>
                  Poolux Lighting collects only the information you voluntarily
                  provide when submitting an RFQ inquiry or contacting us. This
                  includes: name, company, email, phone, country, and project
                  specifications related to commercial pool lighting and
                  underwater LED systems.
                </p>
                <h2>2. How We Use Your Information</h2>
                <p>
                  Your information is used exclusively to prepare and deliver
                  custom quotes, technical wiring diagrams, product
                  recommendations, and shipping logistics for your IP68
                  underwater lighting project.
                </p>
                <h2>3. Data Protection</h2>
                <p>
                  All inquiry data is stored on secure servers with SSL
                  encryption. We implement industry-standard security measures to
                  prevent unauthorized access, alteration, or disclosure.
                </p>
                <h2>4. Third-Party Sharing</h2>
                <p>
                  We do not sell, rent, trade, or otherwise transfer your
                  personally identifiable information to outside parties. This
                  does not include trusted shipping/logistics partners who assist
                  in delivering your order, subject to confidentiality
                  agreements.
                </p>
                <h2>5. Contact</h2>
                <p>
                  For privacy-related inquiries, contact us at
                  inquiry@poolux-lighting.com.
                </p>
              </div>
            </FadeContent>
          </div>
        </section>
      </div>
    </>
  );
}
