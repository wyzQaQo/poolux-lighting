import Link from "next/link";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { FadeContent } from "@/components/shared/FadeContent";
import { SpotlightCard } from "@/components/shared/SpotlightCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Waves, Droplets, Anchor, ArrowRight } from "lucide-react";
import { getCategories } from "@/lib/data";

const categoryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  Waves,
  Droplets,
  Anchor,
};

const categoryGradients: Record<string, string> = {
  "in-ground-pool-lights":
    "from-[#0EA5E9]/20 to-transparent",
  "fountain-water-feature-lights":
    "from-[#8B5CF6]/20 to-transparent",
  "marine-saltwater-lights":
    "from-[#06B6D4]/20 to-transparent",
};

export function ProductGrid() {
  const categories = getCategories();

  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <SectionHeading
          label="Product Categories"
          title="Built for the World's Most Demanding Water Environments"
          description="Three specialized categories — each engineered for a specific installation scenario. Choose by application, not by wattage."
        />

        <div className="grid gap-6 md:grid-cols-3">
          {categories.map((cat, i) => {
            const IconComponent = categoryIcons[cat.icon] || Waves;
            const gradient = categoryGradients[cat.slug] || "from-[#0EA5E9]/20 to-transparent";

            return (
              <FadeContent key={cat.slug} delay={i * 0.15}>
                <SpotlightCard
                  className="group h-full rounded-2xl border border-white/10 bg-white/[0.02] p-6 md:p-8"
                  spotlightColor={
                    cat.slug === "marine-saltwater-lights"
                      ? "rgba(6, 182, 212, 0.15)"
                      : cat.slug === "fountain-water-feature-lights"
                      ? "rgba(139, 92, 246, 0.15)"
                      : "rgba(14, 165, 233, 0.15)"
                  }
                >
                  <div className="relative z-10 flex h-full flex-col">
                    {/* Icon */}
                    <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br border border-white/10 bg-white/[0.03]">
                      <IconComponent className="h-7 w-7 text-[#0EA5E9]" />
                    </div>

                    {/* Content */}
                    <h3 className="mb-2 text-xl font-semibold text-white">
                      {cat.name}
                    </h3>
                    <p className="mb-6 flex-1 text-sm leading-relaxed text-white/50">
                      {cat.description}
                    </p>

                    <Link
                      href={`/products/${cat.slug}`}
                      className="inline-flex items-center gap-2 text-sm font-medium text-[#0EA5E9] transition-colors hover:text-[#38BDF8]"
                    >
                      Browse {cat.name} →
                    </Link>
                  </div>
                </SpotlightCard>
              </FadeContent>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <FadeContent className="mt-10 text-center">
          <Button
            variant="outline"
            className="border-white/20 text-white hover:bg-white/5"
          >
            <Link href="/products">
              View All IP68 SS316L Pool & Fountain Lights
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </FadeContent>
      </div>
    </section>
  );
}
