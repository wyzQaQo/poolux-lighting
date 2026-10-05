"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sun, Droplets, Palette } from "lucide-react";

interface ColorPreset {
  name: string;
  label: string;
  hex: string;
  rgb: string;
  description: string;
}

const colorPresets: ColorPreset[] = [
  {
    name: "warm-white",
    label: "Warm White",
    hex: "#F5A623",
    rgb: "245, 166, 35",
    description: "Luxurious warm ambience — ideal for evening resort poolside dining",
  },
  {
    name: "cool-white",
    label: "Cool White",
    hex: "#E8F4FD",
    rgb: "232, 244, 253",
    description: "Crisp, clean illumination — commercial standard for lap pools",
  },
  {
    name: "blue",
    label: "Ocean Blue",
    hex: "#0EA5E9",
    rgb: "14, 165, 233",
    description: "Maldives-inspired sci-fi blue — the signature resort color",
  },
  {
    name: "cyan",
    label: "Cyan",
    hex: "#06B6D4",
    rgb: "6, 182, 212",
    description: "Tropical lagoon cyan — popular for infinity pools and water features",
  },
  {
    name: "purple",
    label: "Violet",
    hex: "#8B5CF6",
    rgb: "139, 92, 246",
    description: "Dramatic evening mood — musical fountain & event lighting",
  },
  {
    name: "green",
    label: "Emerald",
    hex: "#10B981",
    rgb: "16, 185, 129",
    description: "Natural lagoon green — blends with landscape and garden pools",
  },
  {
    name: "red",
    label: "Ruby Red",
    hex: "#EF4444",
    rgb: "239, 68, 68",
    description: "High-energy event lighting — parties, nightclubs, theme parks",
  },
  {
    name: "amber",
    label: "Amber",
    hex: "#F59E0B",
    rgb: "245, 158, 11",
    description: "Golden sunset tone — warm and inviting for lounge areas",
  },
];

export function RGBWSimulator() {
  const [activeColor, setActiveColor] = useState<ColorPreset>(colorPresets[2]); // Default: Ocean Blue
  const [intensity, setIntensity] = useState(80);

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden">
      <div className="p-6 md:p-8">
        {/* Header */}
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0EA5E9]/10">
            <Palette className="h-5 w-5 text-[#0EA5E9]" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">
              Interactive RGBW Color Simulator
            </h3>
            <p className="text-sm text-white/50">
              Click a color to preview how your pool will look
            </p>
          </div>
        </div>

        {/* Pool Preview */}
        <div className="relative mb-6 overflow-hidden rounded-xl">
          {/* Pool scene */}
          <div
            className="relative aspect-[2/1] w-full transition-all duration-700"
            style={{
              background: `
                radial-gradient(
                  ellipse at 50% 120%,
                  rgba(${activeColor.rgb}, 0.6) 0%,
                  rgba(${activeColor.rgb}, 0.3) 30%,
                  rgba(${activeColor.rgb}, 0.1) 60%,
                  #0A1628 100%
                )
              `,
            }}
          >
            {/* Pool surface */}
            <div className="absolute inset-0">
              {/* Water surface shimmer */}
              <div
                className="absolute inset-0 opacity-50"
                style={{
                  background: `
                    linear-gradient(
                      180deg,
                      transparent 0%,
                      rgba(${activeColor.rgb}, 0.15) 40%,
                      rgba(${activeColor.rgb}, 0.25) 60%,
                      rgba(${activeColor.rgb}, 0.4) 80%,
                      rgba(${activeColor.rgb}, 0.6) 100%
                    )
                  `,
                }}
              />

              {/* Caustic lines */}
              <svg className="absolute inset-0 h-full w-full" viewBox="0 0 800 400" preserveAspectRatio="none">
                <defs>
                  <pattern id="caustics" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
                    <path
                      d="M0 100 Q50 80 100 100 T200 100"
                      fill="none"
                      stroke={`rgba(${activeColor.rgb}, 0.2)`}
                      strokeWidth="0.5"
                    />
                    <path
                      d="M0 130 Q70 110 140 130 T280 130"
                      fill="none"
                      stroke={`rgba(${activeColor.rgb}, 0.15)`}
                      strokeWidth="0.3"
                    />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#caustics)">
                  <animateTransform
                    attributeName="transform"
                    type="translate"
                    from="0 0"
                    to="200 0"
                    dur="10s"
                    repeatCount="indefinite"
                  />
                </rect>
              </svg>

              {/* Light points at bottom */}
              <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-16 pb-4">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="h-4 w-4 rounded-full animate-pulse-glow"
                    style={{
                      background: `radial-gradient(circle, rgba(${activeColor.rgb}, 0.9), rgba(${activeColor.rgb}, 0.2))`,
                      boxShadow: `0 0 30px rgba(${activeColor.rgb}, 0.5), 0 0 60px rgba(${activeColor.rgb}, 0.2)`,
                      animationDelay: `${i * 0.3}s`,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Pool edge / infinity edge */}
            <div className="absolute bottom-0 left-0 right-0 h-3 bg-gradient-to-t from-white/10 to-transparent" />

            {/* Label */}
            <div className="absolute right-4 top-4 rounded-lg border border-white/10 bg-black/40 px-3 py-1.5 text-xs text-white/60 backdrop-blur-sm">
              {activeColor.label} &middot; {intensity}%
            </div>
          </div>
        </div>

        {/* Color Swatches */}
        <div className="mb-6">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-white/40">
            Select Color
          </p>
          <div className="flex flex-wrap gap-3">
            {colorPresets.map((color) => (
              <motion.button
                key={color.name}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveColor(color)}
                className={`group relative flex flex-col items-center gap-1.5`}
              >
                <div
                  className={`h-10 w-10 rounded-full border-2 transition-all ${
                    activeColor.name === color.name
                      ? "border-white shadow-lg"
                      : "border-transparent hover:border-white/30"
                  }`}
                  style={{
                    background: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.3), ${color.hex})`,
                    boxShadow:
                      activeColor.name === color.name
                        ? `0 0 20px ${color.hex}80`
                        : "none",
                  }}
                />
                <span
                  className={`text-[10px] transition-colors ${
                    activeColor.name === color.name
                      ? "text-white"
                      : "text-white/40"
                  }`}
                >
                  {color.label}
                </span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Intensity Slider */}
        <div>
          <div className="mb-2 flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-wider text-white/40">
              Intensity
            </p>
            <span className="text-xs text-white/60">{intensity}%</span>
          </div>
          <input
            type="range"
            min={10}
            max={100}
            value={intensity}
            onChange={(e) => setIntensity(Number(e.target.value))}
            className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-white/10 accent-[#0EA5E9]"
            style={{
              background: `linear-gradient(to right, #0EA5E9 ${intensity}%, rgba(255,255,255,0.1) ${intensity}%)`,
            }}
          />
        </div>

        {/* Current Color Description */}
        <AnimatePresence mode="wait">
          <motion.p
            key={activeColor.name}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="mt-4 rounded-lg border border-white/10 bg-white/[0.02] px-4 py-3 text-sm text-white/50"
          >
            <span className="font-medium text-white">{activeColor.label}:</span>{" "}
            {activeColor.description}
          </motion.p>
        </AnimatePresence>

        {/* CTA */}
        <div className="mt-6 border-t border-white/10 pt-4">
          <p className="text-xs text-white/40">
            All Poolux lights support RGBW + Warm White color mixing via DMX512
            or 4-Wire Sync.{" "}
            <span className="text-[#0EA5E9]">
              Request a demo video with real pool footage.
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
