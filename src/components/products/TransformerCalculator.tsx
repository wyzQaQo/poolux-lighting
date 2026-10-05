"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Calculator,
  Zap,
  AlertTriangle,
  CheckCircle2,
  Cable,
  Send,
  ArrowRight,
} from "lucide-react";

// AWG wire gauge resistance per 1000ft (Ω) and max current (A)
const awgTable: Record<number, { resistancePerKm: number; maxAmps: number; name: string }> = {
  18: { resistancePerKm: 20.95, maxAmps: 10, name: "18 AWG (0.82mm²)" },
  16: { resistancePerKm: 13.17, maxAmps: 13, name: "16 AWG (1.31mm²)" },
  14: { resistancePerKm: 8.28, maxAmps: 18, name: "14 AWG (2.08mm²)" },
  12: { resistancePerKm: 5.21, maxAmps: 25, name: "12 AWG (3.31mm²)" },
  10: { resistancePerKm: 3.28, maxAmps: 35, name: "10 AWG (5.26mm²)" },
  8: { resistancePerKm: 2.06, maxAmps: 50, name: "8 AWG (8.37mm²)" },
};

type ResultTier = "safe" | "borderline" | "danger";

interface CalculationResult {
  totalWattage: number;
  totalCurrent: number;
  voltageDropPercent: number;
  endVoltage: number;
  recommendedTransformerVA: number;
  recommendedAWG: number;
  tier: ResultTier;
  message: string;
  tips: string[];
}

export function TransformerCalculator() {
  const [numLights, setNumLights] = useState(10);
  const [wattagePerLight, setWattagePerLight] = useState(12);
  const [voltage, setVoltage] = useState<12 | 24>(12);
  const [distance, setDistance] = useState(30); // meters
  const [distanceUnit, setDistanceUnit] = useState<"m" | "ft">("m");

  const distanceInMeters = distanceUnit === "ft" ? distance * 0.3048 : distance;

  const result = useMemo((): CalculationResult => {
    const totalWattage = numLights * wattagePerLight;
    const totalCurrent = totalWattage / voltage;

    // Find minimum AWG that can handle the current
    let selectedAWG = 18;
    let awgEntry = awgTable[18];
    for (const [awg, entry] of Object.entries(awgTable)) {
      if (entry.maxAmps >= totalCurrent) {
        selectedAWG = Number(awg);
        awgEntry = entry;
        break;
      }
    }

    // Find BEST AWG if we have options (lower gauge = thicker wire)
    const awgOptions = Object.entries(awgTable)
      .filter(([_, e]) => e.maxAmps >= totalCurrent)
      .sort(([a], [b]) => Number(a) - Number(b));

    // Calculate voltage drop
    const wireResistance = awgEntry.resistancePerKm;
    const totalWireLength = distanceInMeters * 2; // round trip
    const voltageDrop = totalCurrent * (wireResistance * totalWireLength / 1000);
    const endVoltage = voltage - voltageDrop;
    const voltageDropPercent = (voltageDrop / voltage) * 100;

    // Determine tier
    let tier: ResultTier;
    let message: string;
    let tips: string[] = [];

    if (voltageDropPercent <= 5 && endVoltage >= voltage * 0.95) {
      tier = "safe";
      message = "Your installation is within safe voltage drop limits. All fixtures will receive adequate power for consistent brightness.";
      tips = [
        "Use the recommended wire gauge or thicker for best results",
        "Consider adding a second transformer if expanding in the future",
      ];
    } else if (voltageDropPercent <= 10 && endVoltage >= voltage * 0.9) {
      tier = "borderline";
      message = "Voltage drop is at the upper limit. The furthest fixtures may appear slightly dimmer. Consider upgrading your wire gauge.";
      tips = [
        "Upgrade to the next thicker wire gauge (lower AWG number)",
        "Position the transformer closer to the center of the pool",
        "Split fixtures across two transformers for large installations",
      ];
    } else {
      tier = "danger";
      message = "WARNING: Voltage drop exceeds safe limits! The furthest fixtures will be noticeably dimmer, and your transformer may be overloaded.";
      tips = [
        "MUST use the recommended thicker wire gauge",
        "Split installation across 2+ transformers",
        "Position transformer within 10m of the pool edge",
        "Contact our engineering team for a custom wiring layout",
      ];
    }

    // Calculate recommended transformer VA (add 20% safety margin)
    const recommendedTransformerVA = Math.ceil(totalWattage * 1.2 / 50) * 50;

    return {
      totalWattage,
      totalCurrent: Math.round(totalCurrent * 100) / 100,
      voltageDropPercent: Math.round(voltageDropPercent * 10) / 10,
      endVoltage: Math.round(endVoltage * 100) / 100,
      recommendedTransformerVA,
      recommendedAWG: selectedAWG,
      tier,
      message,
      tips,
    };
  }, [numLights, wattagePerLight, voltage, distanceInMeters]);

  const tierColors: Record<ResultTier, { bg: string; border: string; text: string; icon: string }> = {
    safe: {
      bg: "bg-[#10B981]/10",
      border: "border-[#10B981]/30",
      text: "text-[#10B981]",
      icon: "text-[#10B981]",
    },
    borderline: {
      bg: "bg-[#F59E0B]/10",
      border: "border-[#F59E0B]/30",
      text: "text-[#F59E0B]",
      icon: "text-[#F59E0B]",
    },
    danger: {
      bg: "bg-[#EF4444]/10",
      border: "border-[#EF4444]/30",
      text: "text-[#EF4444]",
      icon: "text-[#EF4444]",
    },
  };

  const tc = tierColors[result.tier];

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden">
      <div className="p-6 md:p-8">
        {/* Header */}
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0EA5E9]/10">
            <Calculator className="h-5 w-5 text-[#0EA5E9]" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">
              Transformer &amp; Wire Gauge Calculator
            </h3>
            <p className="text-sm text-white/50">
              Prevent voltage drop — ensure every fixture gets full power
            </p>
          </div>
        </div>

        {/* Inputs */}
        <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-2">
            <Label className="text-xs text-white/60">Number of Lights</Label>
            <div className="flex items-center gap-2">
              <Input
                type="number"
                min={1}
                max={200}
                value={numLights}
                onChange={(e) => setNumLights(Number(e.target.value) || 1)}
                className="border-white/10 bg-white/5 text-white"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label className="text-xs text-white/60">Watts per Light</Label>
            <Input
              type="number"
              min={1}
              max={100}
              value={wattagePerLight}
              onChange={(e) => setWattagePerLight(Number(e.target.value) || 1)}
              className="border-white/10 bg-white/5 text-white"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-xs text-white/60">System Voltage</Label>
            <div className="flex rounded-lg border border-white/10 overflow-hidden">
              {([12, 24] as const).map((v) => (
                <button
                  key={v}
                  onClick={() => setVoltage(v)}
                  className={`flex-1 py-2 text-sm font-medium transition-colors ${
                    voltage === v
                      ? "bg-[#0EA5E9] text-white"
                      : "bg-white/5 text-white/50 hover:text-white"
                  }`}
                >
                  {v}V DC
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <Label className="text-xs text-white/60">
              Max Distance (transformer → furthest light)
            </Label>
            <div className="flex gap-1">
              <Input
                type="number"
                min={1}
                value={distance}
                onChange={(e) => setDistance(Number(e.target.value) || 1)}
                className="flex-1 border-white/10 bg-white/5 text-white"
              />
              <div className="flex rounded-lg border border-white/10 overflow-hidden">
                {(["m", "ft"] as const).map((u) => (
                  <button
                    key={u}
                    onClick={() => setDistanceUnit(u)}
                    className={`px-2.5 py-2 text-xs font-medium transition-colors ${
                      distanceUnit === u
                        ? "bg-[#0EA5E9] text-white"
                        : "bg-white/5 text-white/50 hover:text-white"
                    }`}
                  >
                    {u}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${numLights}-${wattagePerLight}-${voltage}-${distance}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Status Banner */}
            <div className={`mb-6 rounded-xl border ${tc.border} ${tc.bg} p-4`}>
              <div className="flex items-start gap-3">
                {result.tier === "safe" ? (
                  <CheckCircle2 className={`mt-0.5 h-5 w-5 shrink-0 ${tc.icon}`} />
                ) : (
                  <AlertTriangle className={`mt-0.5 h-5 w-5 shrink-0 ${tc.icon}`} />
                )}
                <p className="text-sm text-white/80">{result.message}</p>
              </div>
            </div>

            {/* Key Metrics */}
            <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { label: "Total Wattage", value: `${result.totalWattage}W`, icon: Zap },
                { label: "Total Current", value: `${result.totalCurrent}A`, icon: Zap },
                { label: "Voltage Drop", value: `${result.voltageDropPercent}%`, icon: AlertTriangle },
                { label: "End Voltage", value: `${result.endVoltage}V`, icon: Zap },
              ].map((metric) => (
                <div
                  key={metric.label}
                  className="rounded-xl border border-white/10 bg-white/[0.02] p-3 text-center"
                >
                  <div className="mb-1 flex justify-center">
                    <metric.icon className="h-3.5 w-3.5 text-[#0EA5E9]" />
                  </div>
                  <div className="text-lg font-bold text-white">{metric.value}</div>
                  <div className="text-[10px] text-white/40">{metric.label}</div>
                </div>
              ))}
            </div>

            {/* Recommendations */}
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
                <div className="mb-2 flex items-center gap-2">
                  <Zap className="h-4 w-4 text-[#0EA5E9]" />
                  <span className="text-sm font-semibold text-white">
                    Recommended Transformer
                  </span>
                </div>
                <div className="text-2xl font-bold text-white">
                  {result.recommendedTransformerVA}VA
                </div>
                <p className="mt-1 text-xs text-white/40">
                  Minimum {result.recommendedTransformerVA}VA waterproof transformer
                  <br />
                  (includes 20% safety margin)
                </p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
                <div className="mb-2 flex items-center gap-2">
                  <Cable className="h-4 w-4 text-[#0EA5E9]" />
                  <span className="text-sm font-semibold text-white">
                    Recommended Wire Gauge
                  </span>
                </div>
                <div className="text-2xl font-bold text-white">
                  {awgTable[result.recommendedAWG]?.name || `${result.recommendedAWG} AWG`}
                </div>
                <p className="mt-1 text-xs text-white/40">
                  Pure copper wire only — avoid CCA (copper-clad aluminum)
                  <br />
                  Max current: {awgTable[result.recommendedAWG]?.maxAmps || "—"}A
                </p>
              </div>
            </div>

            {/* Tips */}
            {result.tips.length > 0 && (
              <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.02] p-4">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#0EA5E9]">
                  Engineering Tips
                </p>
                <ul className="space-y-1">
                  {result.tips.map((tip, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-white/50">
                      <span className="mt-0.5 text-[#0EA5E9]">•</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* CTA */}
        <div className="mt-6 border-t border-white/10 pt-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-white/40">
              Need a custom wiring layout for your specific pool dimensions?
            </p>
            <Button
              size="sm"
              className="shrink-0 bg-gradient-to-r from-[#0EA5E9] to-[#38BDF8] text-white"
            >
              <Link href="/contact">
                Get Free Wiring Diagram
                <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
