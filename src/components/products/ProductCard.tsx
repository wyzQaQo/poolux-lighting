import Link from "next/link";
import { SpotlightCard } from "@/components/shared/SpotlightCard";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Shield, Zap, Droplets } from "lucide-react";
import type { Product } from "@/lib/types";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <SpotlightCard className="group h-full rounded-2xl border border-white/10 bg-white/[0.02] transition-all hover:border-[#0EA5E9]/20">
      <Link href={`/products/${product.slug}`} className="flex h-full flex-col p-6">
        {/* Key Spec Badges */}
        <div className="mb-4 flex flex-wrap gap-1.5">
          <Badge variant="secondary" className="border-[#0EA5E9]/20 bg-[#0EA5E9]/5 text-[#0EA5E9] text-[11px]">
            {product.specs.voltage}
          </Badge>
          <Badge variant="secondary" className="border-[#10B981]/20 bg-[#10B981]/5 text-[#10B981] text-[11px]">
            {product.specs.ipRating}
          </Badge>
          <Badge variant="secondary" className="border-white/10 bg-white/5 text-white/60 text-[11px]">
            {product.specs.material}
          </Badge>
        </div>

        {/* Product name */}
        <h3 className="mb-1 text-lg font-semibold text-white transition-colors group-hover:text-[#0EA5E9]">
          {product.name}
        </h3>
        <p className="mb-4 text-xs text-[#0EA5E9]/80">{product.tagline}</p>

        {/* Quick specs */}
        <div className="mb-4 flex-1 space-y-2">
          <div className="flex items-center gap-2 text-sm text-white/50">
            <Zap className="h-3.5 w-3.5 shrink-0 text-[#0EA5E9]/50" />
            {product.specs.wattage}W &middot; {product.specs.lumenOutput}lm &middot; {product.specs.beamAngle}°
          </div>
          <div className="flex items-center gap-2 text-sm text-white/50">
            <Droplets className="h-3.5 w-3.5 shrink-0 text-[#0EA5E9]/50" />
            {product.specs.ipRating} &middot; {product.specs.controlProtocol}
          </div>
          <div className="flex items-center gap-2 text-sm text-white/50">
            <Shield className="h-3.5 w-3.5 shrink-0 text-[#0EA5E9]/50" />
            {product.specs.warranty} warranty &middot; {product.specs.lifespan}
          </div>
        </div>

        {/* View Details */}
        <div className="flex items-center justify-between border-t border-white/10 pt-4">
          <span className="text-xs text-white/40">
            {product.specs.certifications.slice(0, 3).join(" · ")}
          </span>
          <span className="flex items-center gap-1 text-sm font-medium text-[#0EA5E9]">
            Details
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </Link>
    </SpotlightCard>
  );
}
