import type { MetadataRoute } from "next";
import { getAllProducts, getAllBlogPosts } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://poolux-lighting.com";
  const now = new Date();

  const productPages = getAllProducts().map((product) => ({
    url: `${baseUrl}/products/${product.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const blogPages = getAllBlogPosts().map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    // Core pages
    { url: baseUrl, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${baseUrl}/products`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },

    // Pillar category pages (high priority for weight passing)
    { url: `${baseUrl}/products/in-ground-pool-lights`, lastModified: now, changeFrequency: "weekly", priority: 0.85 },
    { url: `${baseUrl}/products/fountain-water-feature-lights`, lastModified: now, changeFrequency: "weekly", priority: 0.85 },
    { url: `${baseUrl}/products/marine-saltwater-lights`, lastModified: now, changeFrequency: "weekly", priority: 0.85 },

    // Supporting pages
    { url: `${baseUrl}/factory`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/quality`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/certificates`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/resources`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },

    // Legal
    { url: `${baseUrl}/privacy-policy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/terms-of-service`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },

    ...productPages,
    ...blogPages,
  ];
}
