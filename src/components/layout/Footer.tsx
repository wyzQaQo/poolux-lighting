import Link from "next/link";
import { Zap, Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const footerLinks = {
  products: {
    title: "Products",
    links: [
      { label: "In-Ground Pool Lights", href: "/products/in-ground-pool-lights" },
      { label: "Fountain & Water Feature", href: "/products/fountain-water-feature-lights" },
      { label: "Marine & Saltwater-Grade", href: "/products/marine-saltwater-lights" },
      { label: "All Products", href: "/products" },
    ],
  },
  resources: {
    title: "Resources",
    links: [
      { label: "Technical Blog", href: "/blog" },
      { label: "Wiring Diagrams", href: "/resources" },
      { label: "Installation Guides", href: "/resources" },
      { label: "Certifications", href: "/certificates" },
    ],
  },
  company: {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Factory Tour", href: "/factory" },
      { label: "Quality Control", href: "/quality" },
      { label: "Contact", href: "/contact" },
    ],
  },
};

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#060E1A]">
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="mb-4 flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-[#0EA5E9] to-[#38BDF8] shadow-lg shadow-[#0EA5E9]/25">
                <Zap className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-bold tracking-tight text-white">
                Pool<span className="text-[#0EA5E9]">ux</span>
              </span>
            </Link>
            <p className="mb-6 max-w-sm text-sm leading-relaxed text-white/50">
              Certified IP68 SS316L underwater lighting systems engineered for
              resort pools, marine infrastructures, and architectural water
              features. 100% factory air-tightness tested. 60+ countries served.
            </p>
            <div className="space-y-2 text-sm text-white/50">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-[#0EA5E9]" />
                Zhongshan, Guangdong 528400, China
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-[#0EA5E9]" />
                inquiry@poolux-lighting.com
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-[#0EA5E9]" />
                +86 138 1234 5678
              </div>
            </div>
          </div>

          {/* Link columns */}
          {Object.values(footerLinks).map((section) => (
            <div key={section.title}>
              <h4 className="mb-4 text-sm font-semibold tracking-wide text-white uppercase">
                {section.title}
              </h4>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/50 transition-colors hover:text-[#0EA5E9]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="mt-12 rounded-2xl border border-white/10 bg-white/[0.02] p-6 md:p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h4 className="text-lg font-semibold text-white">
                Get Technical Updates & Industry Insights
              </h4>
              <p className="mt-1 text-sm text-white/50">
                IP68 testing reports, new product launches, and installation tips — delivered monthly.
              </p>
            </div>
            <div className="flex min-w-0 gap-2 md:w-96">
              <Input
                placeholder="your@email.com"
                className="border-white/10 bg-white/5 text-white placeholder:text-white/30"
              />
              <Button className="shrink-0 bg-gradient-to-r from-[#0EA5E9] to-[#38BDF8] text-white">
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 md:flex-row">
          <p className="text-xs text-white/40">
            &copy; {new Date().getFullYear()} Poolux Lighting. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy-policy" className="text-xs text-white/40 transition-colors hover:text-white/70">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="text-xs text-white/40 transition-colors hover:text-white/70">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
