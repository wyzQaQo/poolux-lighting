import productsData from "@/data/products.json";
import type { Product, ProductCategoryMeta, BlogPost } from "@/lib/types";
import { readFileSync, readdirSync, existsSync } from "fs";
import path from "path";

// ========================================
//  Product Data Access
// ========================================

export function getAllProducts(): Product[] {
  return productsData.products as Product[];
}

export function getProductBySlug(slug: string): Product | undefined {
  return (productsData.products as Product[]).find((p) => p.slug === slug);
}

export function getProductsByCategory(category: string): Product[] {
  return (productsData.products as Product[]).filter(
    (p) => p.category === category
  );
}

export function getRelatedProducts(slugs: string[]): Product[] {
  return (productsData.products as Product[]).filter((p) =>
    slugs.includes(p.slug)
  );
}

export function getCategories(): ProductCategoryMeta[] {
  return productsData.categories as ProductCategoryMeta[];
}

export function getCategoryBySlug(
  slug: string
): ProductCategoryMeta | undefined {
  return (productsData.categories as ProductCategoryMeta[]).find(
    (c) => c.slug === slug
  );
}

export function getCertifications() {
  return productsData.certifications;
}

export function getCompanyInfo() {
  return productsData.company;
}

// ========================================
//  Blog Data Access — Hardcoded + MDX auto-read
// ========================================

const blogPosts: BlogPost[] = [
  {
    slug: "ss316-vs-ss304-underwater-pool-lights",
    title: "SS316 vs SS304 Underwater Pool Lights: Why Material Grade Is a One-Vote Veto",
    excerpt:
      "Discover why SS304 pool lights fail within 3 months in chlorinated water, and why marine-grade SS316L is the only choice for commercial pool installations. Detailed metallurgical breakdown.",
    date: "2026-05-15",
    author: "Poolux Engineering Team",
    category: "Material Science",
    tags: ["SS316L", "corrosion", "material science", "pool safety"],
    readTime: 8,
    coverImage: "/images/blog/ss316-vs-ss304.jpg",
    seo: {
      title: "SS316 vs SS304 Underwater Pool Lights | Material Grade Comparison",
      description:
        "Why SS304 fails in pool water. SS316L vs SS316 vs SS304 metallurgical comparison for underwater lights. Prevent rust stains and tile replacement.",
      keywords: [
        "SS316 vs SS304",
        "underwater pool light material",
        "marine grade stainless steel",
        "pool light corrosion",
        "saltwater pool LED",
      ],
    },
  },
  {
    slug: "12v-24v-low-voltage-commercial-pool-lighting-safety",
    title: "12V vs 24V Low-Voltage Pool Lighting: The Complete Safety & Engineering Guide",
    excerpt:
      "Everything landscape architects and hotel engineers need to know about low-voltage pool lighting safety. Voltage drop calculations, transformer sizing, and electrical code compliance.",
    date: "2026-05-10",
    author: "Poolux Engineering Team",
    category: "Safety & Compliance",
    tags: ["12V DC", "24V DC", "low voltage", "electrical safety", "transformer"],
    readTime: 12,
    coverImage: "/images/blog/low-voltage-safety.jpg",
    seo: {
      title: "12V 24V Low-Voltage Commercial Pool Lighting Safety Guide",
      description:
        "Complete guide to 12V/24V DC low-voltage pool lighting safety. Voltage drop calculations, transformer sizing, wire gauge selection. IP68 certified fixtures.",
      keywords: [
        "12V 24V low voltage commercial pool lighting",
        "low voltage pool light safety",
        "IP68 certified underwater lights",
        "pool light transformer sizing",
        "voltage drop calculation pool",
      ],
    },
  },
  {
    slug: "dmx512-programmable-resort-pool-lighting-guide",
    title: "DMX512 Programmable Resort Pool Lighting: Synchronized RGBW Control Explained",
    excerpt:
      "How luxury resorts achieve perfectly synchronized underwater light shows across 50+ fixtures. DMX512 protocol, 4-wire sync, controller selection, and programming basics.",
    date: "2026-05-05",
    author: "Poolux Engineering Team",
    category: "Control Systems",
    tags: ["DMX512", "RGBW", "lighting control", "resort", "synchronization"],
    readTime: 10,
    coverImage: "/images/blog/dmx512-control.jpg",
    seo: {
      title: "DMX512 Programmable Resort Pool Lighting | RGBW Sync Guide",
      description:
        "DMX512 protocol for synchronized resort pool lighting. Multi-light RGBW color control, 4-wire sync, controller selection. Professional water feature programming.",
      keywords: [
        "DMX512 programmable resort pool lighting",
        "RGBW synchronous underwater controller",
        "DMX512 pool light control",
        "synchronized pool lighting",
        "resort water feature DMX",
      ],
    },
  },
  {
    slug: "ip68-certified-underwater-lights-factory-testing",
    title: "IP68 Certification: What Happens Inside Our Factory Before Your Lights Ship",
    excerpt:
      "A behind-the-scenes look at our 100% air-tightness testing, 48-hour submerged pressure chambers, and accelerated salt-spray validation. Why every single unit gets tested.",
    date: "2026-04-28",
    author: "Poolux Quality Team",
    category: "Quality & Testing",
    tags: ["IP68", "quality control", "factory testing", "certification"],
    readTime: 7,
    coverImage: "/images/blog/ip68-testing.jpg",
    seo: {
      title: "IP68 Certified Underwater Lights Factory Testing Process | Poolux",
      description:
        "How Poolux tests every IP68 underwater light: 100% air-tightness checks, 48hr submersion chambers, salt-spray validation. Zero-defect shipping guarantee.",
      keywords: [
        "IP68 certified underwater lights factory",
        "pool light air-tightness test",
        "underwater light quality control",
        "IP68 testing process",
        "factory quality assurance pool lights",
      ],
    },
  },
  {
    slug: "how-to-prevent-corrosion-in-saltwater-pools",
    title: "How to Prevent Corrosion in Saltwater Pools: The Definitive Guide for Specifiers",
    excerpt:
      "Saltwater pools are 3x more corrosive than chlorine pools. Learn which stainless steel grades actually survive, how biofouling accelerates corrosion, and the 5 must-check specs.",
    date: "2026-04-20",
    author: "Poolux Engineering Team",
    category: "Material Science",
    tags: ["saltwater", "corrosion prevention", "SS316L", "marine"],
    readTime: 9,
    coverImage: "/images/blog/saltwater-corrosion.jpg",
    seo: {
      title: "How to Prevent Corrosion in Saltwater Pools | SS316L Guide",
      description:
        "Definitive guide to preventing corrosion in saltwater pools. SS316L vs SS304, biofouling effects, 5 critical specs for underwater lights. Expert recommendations.",
      keywords: [
        "how to prevent corrosion in saltwater pools",
        "saltwater pool LED lights supplier",
        "SS316L underwater light",
        "saltwater corrosion pool",
        "marine grade pool lighting",
      ],
    },
  },
];

/**
 * Parse YAML-like frontmatter from a raw MDX string.
 * Returns the parsed frontmatter object and the body content.
 */
function parseFrontmatter(raw: string): { data: Record<string, unknown>; content: string } | null {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) return null;

  const frontmatterStr = match[1];
  const content = match[2];

  const data: Record<string, unknown> = {};
  const lines = frontmatterStr.split("\n");
  let currentKey: string | null = null;
  let currentArray: string[] = [];

  for (const line of lines) {
    // Array item
    const arrayMatch = line.match(/^\s+-\s+"(.*)"$/);
    if (arrayMatch && currentKey) {
      currentArray.push(arrayMatch[1]);
      continue;
    } else if (currentKey) {
      // Flush array
      if (currentArray.length > 0) {
        data[currentKey] = currentArray;
      }
      currentKey = null;
      currentArray = [];
    }

    // Key-value pair
    const kvMatch = line.match(/^(\w+):\s*"(.*)"$/);
    if (kvMatch) {
      const key = kvMatch[1];
      const value = kvMatch[2];
      // Check if next lines will be an array
      data[key] = value;
      currentKey = key;
      currentArray = [];
      continue;
    }

    // Key with unquoted value
    const unquotedKv = line.match(/^(\w+):\s*(.+)$/);
    if (unquotedKv) {
      data[unquotedKv[1]] = unquotedKv[2].trim();
    }
  }

  // Flush final array
  if (currentKey && currentArray.length > 0) {
    data[currentKey] = currentArray;
  }

  return { data, content };
}

/**
 * Read MDX files from src/data/blog/ and convert to BlogPost objects.
 */
function loadMdxBlogPosts(): BlogPost[] {
  const blogDir = path.join(process.cwd(), "src", "data", "blog");

  if (!existsSync(blogDir)) return [];

  try {
    const files = readdirSync(blogDir).filter((f) => f.endsWith(".mdx"));

    return files
      .map((file) => {
        try {
          const raw = readFileSync(path.join(blogDir, file), "utf-8");
          const parsed = parseFrontmatter(raw);
          if (!parsed) return null;

          const { data } = parsed;
          const wordCount = (data.markdown as string)?.split(/\s+/).length ?? 500;
          const readTime = Math.max(1, Math.round(wordCount / 200));

          // Generate excerpt from first 200 chars of content
          const excerpt =
            (parsed.content?.replace(/[#*`>\-\n]/g, " ").replace(/\s+/g, " ").trim().slice(0, 200) || "") +
            "...";

          return {
            slug: (data.slug as string) || file.replace(".mdx", ""),
            title: (data.title as string) || "Untitled",
            excerpt,
            date: (data.publishedAt as string) || new Date().toISOString().split("T")[0],
            author: (data.author as string) || "Poolux Engineering Team",
            category: (data.category as string) || "Uncategorized",
            tags: (data.keywords as string[]) || [],
            readTime,
            coverImage: (data.featuredImage as string) || "/images/blog/default.jpg",
            seo: {
              title: (data.title as string) || "Untitled",
              description: (data.description as string) || excerpt,
              keywords: (data.keywords as string[]) || [],
            },
          } as BlogPost;
        } catch {
          return null;
        }
      })
      .filter((p): p is BlogPost => p !== null);
  } catch {
    return [];
  }
}

let _cachedMdxPosts: BlogPost[] | null = null;

function getMdxPosts(): BlogPost[] {
  // In development, reload every time; in production, cache
  if (process.env.NODE_ENV === "development") {
    return loadMdxBlogPosts();
  }
  if (!_cachedMdxPosts) {
    _cachedMdxPosts = loadMdxBlogPosts();
  }
  return _cachedMdxPosts;
}

export function getAllBlogPosts(): BlogPost[] {
  const mdxPosts = getMdxPosts();

  // Merge: MDX posts override hardcoded posts with same slug
  const merged = new Map<string, BlogPost>();
  for (const post of blogPosts) {
    merged.set(post.slug, post);
  }
  for (const post of mdxPosts) {
    merged.set(post.slug, post); // MDX wins
  }

  // Sort by date descending
  return Array.from(merged.values()).sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return getAllBlogPosts().find((p) => p.slug === slug);
}
