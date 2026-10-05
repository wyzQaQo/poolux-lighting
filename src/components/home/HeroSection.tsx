"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Zap, Anchor } from "lucide-react";
import { motion } from "motion/react";

export function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    const particles: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
      life: number;
      maxLife: number;
    }[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const spawnParticle = () => {
      const y = canvas.height * (0.6 + Math.random() * 0.4);
      particles.push({
        x: Math.random() * canvas.width,
        y,
        vx: (Math.random() - 0.5) * 0.3,
        vy: -Math.random() * 0.8 - 0.2,
        size: Math.random() * 2 + 0.5,
        alpha: Math.random() * 0.5 + 0.2,
        life: 0,
        maxLife: 80 + Math.random() * 120,
      });
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Light rays from top
      for (let i = 0; i < 5; i++) {
        const x = canvas.width * (0.2 + i * 0.15 + Math.sin(Date.now() * 0.0003 + i) * 0.05);
        const gradient = ctx.createLinearGradient(x, 0, x, canvas.height * 0.7);
        gradient.addColorStop(0, "rgba(14, 165, 233, 0.08)");
        gradient.addColorStop(0.5, "rgba(14, 165, 233, 0.03)");
        gradient.addColorStop(1, "rgba(14, 165, 233, 0)");
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.moveTo(x - 80, 0);
        ctx.lineTo(x + 80, 0);
        ctx.lineTo(x + 30, canvas.height * 0.7);
        ctx.lineTo(x - 30, canvas.height * 0.7);
        ctx.closePath();
        ctx.fill();
      }

      // Caustic water particles
      if (particles.length < 60 && Math.random() < 0.3) {
        spawnParticle();
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life++;

        const progress = p.life / p.maxLife;
        const alpha = p.alpha * (1 - progress) * Math.sin(progress * Math.PI);

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(14, 165, 233, ${alpha})`;
        ctx.fill();

        if (p.life >= p.maxLife) {
          particles.splice(i, 1);
        }
      }

      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden">
      {/* Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0"
        style={{ background: "linear-gradient(180deg, #040D18 0%, #0A1628 50%, #0F1F3A 100%)" }}
      />

      {/* Gradient overlays */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-[#040D18]/60 via-transparent to-[#040D18]" />
      <div className="absolute bottom-0 left-0 right-0 z-[1] h-64 bg-gradient-to-t from-[#040D18] to-transparent" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 pt-20 md:px-8">
        <div className="mx-auto max-w-4xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 flex justify-center"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-[#0EA5E9]/30 bg-[#0EA5E9]/10 px-4 py-1.5 text-xs font-semibold text-[#0EA5E9]">
              <Shield className="h-3.5 w-3.5" />
              IP68 &middot; SS316L &middot; 12V/24V DC &middot; DMX512 Ready
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center text-4xl font-bold leading-tight tracking-tight text-white md:text-5xl lg:text-6xl xl:text-7xl"
          >
            Certified IP68 SS316
            <br />
            <span className="bg-gradient-to-r from-[#0EA5E9] via-[#38BDF8] to-[#0EA5E9] bg-clip-text text-transparent">
              Underwater Lighting Systems
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mx-auto mt-6 max-w-2xl text-center text-base leading-relaxed text-white/60 md:text-lg"
          >
            Engineered for resort pools, marine infrastructures, and
            architectural water features. Every unit undergoes 100%
            air-tightness testing and 48-hour submerged pressure validation
            before shipment.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Button
              size="lg"
              className="group bg-gradient-to-r from-[#0EA5E9] to-[#38BDF8] text-white shadow-lg shadow-[#0EA5E9]/25 hover:from-[#0EA5E9]/90 hover:to-[#38BDF8]/90"
            >
              <Link href="/products">
                Explore IP68 SS316L Underwater LED Lights
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/20 text-white hover:bg-white/5"
            >
              <Link href="/contact">
                Request IP68 Pool Light Quote
              </Link>
            </Button>
          </motion.div>

          {/* Trust Signals */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-16 grid grid-cols-3 gap-4 md:gap-8"
          >
            {[
              {
                icon: Shield,
                label: "100% Factory Tested",
                desc: "Air-tightness + 48hr submersion",
              },
              {
                icon: Zap,
                label: "12V/24V DC Safety",
                desc: "Human-safe low voltage operation",
              },
              {
                icon: Anchor,
                label: "Marine-Grade SS316L",
                desc: "5-year warranty against corrosion",
              },
            ].map((item) => (
              <div
                key={item.label}
                className="flex flex-col items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] p-4 text-center backdrop-blur-sm md:p-6"
              >
                <item.icon className="h-6 w-6 text-[#0EA5E9] md:h-7 md:w-7" />
                <span className="text-xs font-semibold text-white md:text-sm">
                  {item.label}
                </span>
                <span className="hidden text-xs text-white/40 md:block">
                  {item.desc}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
