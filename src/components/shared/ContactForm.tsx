"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Send, Loader2 } from "lucide-react";

export function ContactForm() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    // Simulate form submission
    await new Promise((r) => setTimeout(r, 1500));
    setSubmitting(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#10B981]/10">
          <Send className="h-8 w-8 text-[#10B981]" />
        </div>
        <h3 className="text-xl font-semibold text-white">Inquiry Sent!</h3>
        <p className="mt-2 text-white/60">
          Our engineering team will respond within 24 hours with a custom quote and wiring diagram.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-white/80">
            Full Name *
          </Label>
          <Input
            id="name"
            required
            placeholder="John Smith"
            className="border-white/10 bg-white/5 text-white placeholder:text-white/30 focus:border-[#0EA5E9]/50"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="company" className="text-white/80">
            Company *
          </Label>
          <Input
            id="company"
            required
            placeholder="ABC Resorts Ltd."
            className="border-white/10 bg-white/5 text-white placeholder:text-white/30 focus:border-[#0EA5E9]/50"
          />
        </div>
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-white/80">
            Work Email *
          </Label>
          <Input
            id="email"
            type="email"
            required
            placeholder="john@abcresorts.com"
            className="border-white/10 bg-white/5 text-white placeholder:text-white/30 focus:border-[#0EA5E9]/50"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone" className="text-white/80">
            Phone / WhatsApp
          </Label>
          <Input
            id="phone"
            placeholder="+1 (555) 123-4567"
            className="border-white/10 bg-white/5 text-white placeholder:text-white/30 focus:border-[#0EA5E9]/50"
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="product" className="text-white/80">
          Product Interest
        </Label>
        <Input
          id="product"
          placeholder="e.g., PLX InGround Pro 12W — 50 units for resort pool"
          className="border-white/10 bg-white/5 text-white placeholder:text-white/30 focus:border-[#0EA5E9]/50"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="message" className="text-white/80">
          Project Details *
        </Label>
        <Textarea
          id="message"
          required
          rows={4}
          placeholder="Tell us about your project: pool type, size, desired lighting effect, timeline..."
          className="border-white/10 bg-white/5 text-white placeholder:text-white/30 focus:border-[#0EA5E9]/50"
        />
      </div>
      <Button
        type="submit"
        disabled={submitting}
        className="w-full bg-gradient-to-r from-[#0EA5E9] to-[#38BDF8] text-white hover:from-[#0EA5E9]/90 hover:to-[#38BDF8]/90"
      >
        {submitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Send className="mr-2 h-4 w-4" />
            Send Inquiry — Get Quote Within 24 Hours
          </>
        )}
      </Button>
    </form>
  );
}
