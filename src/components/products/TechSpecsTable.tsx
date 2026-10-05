import type { Product } from "@/lib/types";
import { Shield, Zap, Droplets, Cable, Wrench } from "lucide-react";

interface TechSpecsTableProps {
  product: Product;
}

export function TechSpecsTable({ product }: TechSpecsTableProps) {
  const specGroups = [
    {
      title: "Electrical",
      icon: Zap,
      specs: [
        { label: "Input Voltage", value: product.specs.voltage, critical: true },
        { label: "Power Consumption", value: `${product.specs.wattage}W`, critical: false },
        { label: "Luminous Flux", value: `${product.specs.lumenOutput} lm`, critical: false },
        { label: "Beam Angle", value: `${product.specs.beamAngle}°`, critical: false },
        { label: "Control Protocol", value: product.specs.controlProtocol, critical: true },
        { label: "Color Temperature", value: product.specs.colorTemp, critical: false },
      ],
    },
    {
      title: "Physical & Safety",
      icon: Shield,
      specs: [
        { label: "Material", value: product.specs.material, critical: true },
        { label: "Waterproof Rating", value: product.specs.ipRating, critical: true },
        { label: "Certifications", value: product.specs.certifications.join(", "), critical: true },
        { label: "Warranty", value: product.specs.warranty, critical: false },
        { label: "LED Lifespan", value: product.specs.lifespan, critical: false },
      ],
    },
    {
      title: "Dimensions & Installation",
      icon: Wrench,
      specs: [
        { label: "Diameter", value: `Ø${product.specs.dimensions.diameter}mm`, critical: false },
        { label: "Height", value: `${product.specs.dimensions.height}mm`, critical: false },
        ...(product.specs.dimensions.cutout
          ? [{ label: "Cutout", value: `Ø${product.specs.dimensions.cutout}mm`, critical: false }]
          : []),
        { label: "Cable Length", value: `${product.specs.cableLength}m`, critical: false },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      {specGroups.map((group) => (
        <div
          key={group.title}
          className="overflow-hidden rounded-xl border border-white/10 bg-white/[0.02]"
        >
          <div className="flex items-center gap-2 border-b border-white/10 px-5 py-3">
            <group.icon className="h-4 w-4 text-[#0EA5E9]" />
            <h4 className="text-sm font-semibold text-white">{group.title}</h4>
          </div>
          <div className="divide-y divide-white/5">
            {group.specs.map((spec) => (
              <div
                key={spec.label}
                className="flex items-center justify-between px-5 py-3"
              >
                <span className="text-sm text-white/50">{spec.label}</span>
                <span
                  className={`text-sm font-medium ${
                    spec.critical
                      ? "text-[#0EA5E9]"
                      : "text-white"
                  }`}
                >
                  {spec.value}
                  {spec.critical && (
                    <span className="ml-1.5 inline-block h-1.5 w-1.5 rounded-full bg-[#0EA5E9]" />
                  )}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
