import type { Metadata } from "next";

interface SEOProps {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  canonical?: string;
  type?: "website" | "article";
}

export function generateSEOMetadata({
  title,
  description,
  keywords = [],
  ogImage = "/images/og-default.jpg",
  canonical,
  type = "website",
}: SEOProps): Metadata {
  const siteName = "Poolux Lighting";
  const baseUrl = "https://poolux-lighting.com";

  return {
    title: `${title} | ${siteName}`,
    description,
    keywords: keywords.join(", "),
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: canonical || baseUrl,
    },
    openGraph: {
      title: `${title} | ${siteName}`,
      description,
      siteName,
      type,
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${siteName}`,
      description,
      images: [ogImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

// Structured Data generators

export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Poolux Lighting",
    url: "https://poolux-lighting.com",
    logo: "https://poolux-lighting.com/images/logo.png",
    description:
      "Certified IP68 SS316L underwater lighting manufacturer for resort pools, marine infrastructures, and architectural water features.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Zhongshan",
      addressRegion: "Guangdong",
      postalCode: "528400",
      addressCountry: "CN",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+86-138-1234-5678",
      contactType: "sales",
      email: "inquiry@poolux-lighting.com",
    },
  };
}

export function generateProductSchema(product: {
  name: string;
  description: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.image,
    brand: {
      "@type": "Brand",
      name: "Poolux Lighting",
    },
    manufacturer: {
      "@type": "Organization",
      name: "Poolux Lighting",
    },
  };
}

export function generateFAQSchema(
  faqs: { question: string; answer: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function generateBreadcrumbSchema(
  items: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
