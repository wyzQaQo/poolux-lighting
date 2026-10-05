// ========================================
//  Poolux Lighting — Type Definitions
// ========================================

export type ProductCategory =
  | "in-ground-pool-lights"
  | "fountain-water-feature-lights"
  | "marine-saltwater-lights";

export type MaterialGrade = "SS304" | "SS316" | "SS316L";
export type VoltageType = "12V DC" | "12V/24V DC" | "24V DC";
export type ControlProtocol = "DMX512" | "RF Wireless" | "4-Wire Sync" | "Standalone";

export interface ProductDimension {
  diameter: number; // mm
  height: number; // mm
  cutout?: number; // mm (for in-ground)
}

export interface Product {
  slug: string;
  name: string;
  tagline: string;
  category: ProductCategory;
  description: string;
  features: string[];
  specs: {
    material: MaterialGrade;
    voltage: VoltageType;
    wattage: number; // W
    ipRating: string;
    lumenOutput: number; // lm
    beamAngle: number; // degrees
    controlProtocol: ControlProtocol;
    colorTemp: string; // e.g., "RGBW + Warm White 3000K"
    lifespan: string; // e.g., "50,000 hrs"
    warranty: string; // e.g., "3 Years"
    dimensions: ProductDimension;
    cableLength: number; // m
    certifications: string[];
  };
  images: string[];
  applications: string[];
  relatedProducts: string[];
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
}

export interface ProductCategoryMeta {
  slug: ProductCategory;
  name: string;
  description: string;
  icon: string; // lucide icon name
  image: string;
  seo: {
    title: string;
    description: string;
  };
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  category: string;
  tags: string[];
  readTime: number; // minutes
  coverImage: string;
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
}

export interface Certification {
  name: string;
  description: string;
  icon: string;
}

export interface NavItem {
  title: string;
  href: string;
  children?: NavItem[];
}

export interface RFQFormData {
  name: string;
  email: string;
  company: string;
  phone: string;
  country: string;
  productInterest: string;
  quantity: number;
  message: string;
  attachments?: File[];
}
