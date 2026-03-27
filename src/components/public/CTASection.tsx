import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Calendar } from "lucide-react";

interface CTASectionProps {
  locale: string;
  dict: {
    cta: Record<string, string>;
  };
}

export function CTASection({ locale, dict }: CTASectionProps) {
  const { cta } = dict;

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[#0A0A0A]" />
      <div className="absolute inset-0 bg-gradient-to-br from-[#FFD700]/5 via-transparent to-transparent" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FFD700]/40 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FFD700]/20 to-transparent" />

      {/* Grid */}
      <div className="absolute inset-0 grid-overlay opacity-40" />

      {/* Center glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#FFD700]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-6 lg:px-8 text-center">
        <div className="flex flex-col items-center gap-8">
          {/* Decorative line */}
          <div className="flex items-center gap-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#FFD700]/40" />
            <div className="h-2 w-2 bg-[#FFD700]" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#FFD700]/40" />
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-mono font-bold tracking-tight text-white leading-tight">
            {cta.title}
            <br />
            <span className="text-gradient">{cta.titleHighlight}</span>
          </h2>

          <p className="text-[#A0A0A0] text-lg max-w-2xl leading-relaxed font-sans">
            {cta.subtitle}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href={`/${locale}/programas`}>
              <Button
                variant="primary"
                size="lg"
                iconRight={<ArrowRight className="h-4 w-4" />}
              >
                {cta.primary}
              </Button>
            </Link>
            <Link href={`/${locale}/agendar`}>
              <Button
                variant="secondary"
                size="lg"
                icon={<Calendar className="h-4 w-4" />}
              >
                {cta.secondary}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
