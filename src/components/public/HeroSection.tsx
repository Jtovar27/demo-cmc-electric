"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ArrowRight, Calendar, ChevronDown, Zap } from "lucide-react";

interface HeroSectionProps {
  locale: string;
  dict: {
    hero: Record<string, string>;
    nav: Record<string, string>;
  };
}

export function HeroSection({ locale, dict }: HeroSectionProps) {
  const { hero } = dict;

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#080808]">
      {/* Background grid */}
      <div className="absolute inset-0 grid-overlay opacity-60" />

      {/* Yellow glow */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#FFD700]/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[#FFD700]/3 rounded-full blur-[80px] pointer-events-none" />

      {/* Diagonal yellow line accent */}
      <div className="absolute top-0 right-0 w-1/3 h-full overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-l from-[#FFD700]/[0.02] to-transparent" />
        <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-[#FFD700]/40 via-[#FFD700]/10 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center pt-24 pb-16">
          {/* Content */}
          <div className="flex flex-col gap-8">
            {/* Badge */}
            <div className="animate-fade-in-up">
              <Badge variant="yellow" size="md">
                <Zap className="h-3 w-3 mr-1.5 inline" />
                {hero.badge}
              </Badge>
            </div>

            {/* Title */}
            <div className="animate-fade-in-up delay-100">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-mono font-bold tracking-tight text-white leading-[1.05]">
                {hero.title}
                <br />
                <span className="text-gradient">{hero.titleHighlight}</span>
              </h1>
            </div>

            {/* Subtitle */}
            <div className="animate-fade-in-up delay-200">
              <p className="text-[#A0A0A0] text-lg md:text-xl leading-relaxed font-sans max-w-lg">
                {hero.subtitle}
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 animate-fade-in-up delay-300">
              <Link href={`/${locale}/programas`}>
                <Button
                  variant="primary"
                  size="lg"
                  iconRight={<ArrowRight className="h-4 w-4" />}
                >
                  {hero.cta_primary}
                </Button>
              </Link>
              <Link href={`/${locale}/agendar`}>
                <Button
                  variant="secondary"
                  size="lg"
                  icon={<Calendar className="h-4 w-4" />}
                >
                  {hero.cta_secondary}
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-8 pt-4 border-t border-[#1A1A1A] animate-fade-in-up delay-400">
              {[
                { value: hero.stat1_value, label: hero.stat1_label },
                { value: hero.stat2_value, label: hero.stat2_label },
                { value: hero.stat3_value, label: hero.stat3_label },
              ].map((stat, i) => (
                <div key={i} className="flex flex-col gap-1">
                  <span className="text-2xl md:text-3xl font-mono font-bold text-[#FFD700]">
                    {stat.value}
                  </span>
                  <span className="text-xs font-mono tracking-widest uppercase text-[#606060]">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Visual */}
          <div className="relative hidden lg:block animate-fade-in delay-200">
            <div className="relative aspect-[4/5] max-h-[600px]">
              {/* Main image */}
              <div className="absolute inset-0 overflow-hidden border border-[#2A2A2A]">
                <Image
                  src="https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800&auto=format&fit=crop&q=80"
                  alt="Electrical training"
                  fill
                  className="object-cover"
                  priority
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#080808]/40 to-transparent" />
              </div>

              {/* Corner accent */}
              <div className="absolute -top-3 -right-3 w-12 h-12 border-t-2 border-r-2 border-[#FFD700]" />
              <div className="absolute -bottom-3 -left-3 w-12 h-12 border-b-2 border-l-2 border-[#FFD700]" />

              {/* Floating card */}
              <div className="absolute bottom-6 left-6 right-6 bg-[#080808]/90 backdrop-blur-sm border border-[#1A1A1A] p-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-[#FFD700]/10 border border-[#FFD700]/20 flex items-center justify-center flex-shrink-0">
                    <Zap className="h-5 w-5 text-[#FFD700]" />
                  </div>
                  <div>
                    <div className="text-xs font-mono tracking-widest uppercase text-[#FFD700]">
                      Next Cohort
                    </div>
                    <div className="text-sm font-mono text-white">
                      Enrolling Now
                    </div>
                  </div>
                  <div className="ml-auto">
                    <div className="h-2 w-2 rounded-full bg-[#22C55E] animate-pulse" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <ChevronDown className="h-5 w-5 text-[#404040]" />
      </div>
    </section>
  );
}
