import Image from "next/image";
import Link from "next/link";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { Target, BookOpen, Users, Award, ArrowRight } from "lucide-react";

interface AboutSectionProps {
  locale: string;
  dict: {
    about: Record<string, string>;
    nav: Record<string, string>;
  };
}

const icons = [Target, BookOpen, Users, Award];

export function AboutSection({ locale, dict }: AboutSectionProps) {
  const { about } = dict;

  const values = [
    { titleKey: "value1_title", descKey: "value1_desc" },
    { titleKey: "value2_title", descKey: "value2_desc" },
    { titleKey: "value3_title", descKey: "value3_desc" },
    { titleKey: "value4_title", descKey: "value4_desc" },
  ];

  return (
    <section className="py-24 bg-[#080808] relative overflow-hidden">
      {/* Left accent line */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#FFD700]/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image side */}
          <div className="relative hidden lg:block">
            <div className="relative aspect-[3/4] max-h-[560px]">
              <div className="absolute inset-0 overflow-hidden border border-[#1A1A1A]">
                <Image
                  src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=700&auto=format&fit=crop&q=80"
                  alt="About CMC Electric"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/60 via-transparent to-transparent" />
              </div>

              {/* Accent corners */}
              <div className="absolute -top-3 -left-3 w-10 h-10 border-t-2 border-l-2 border-[#FFD700]" />
              <div className="absolute -bottom-3 -right-3 w-10 h-10 border-b-2 border-r-2 border-[#FFD700]" />

              {/* Experience badge */}
              <div className="absolute -right-6 top-1/2 -translate-y-1/2 bg-[#FFD700] p-6 flex flex-col items-center gap-1 shadow-[0_0_40px_rgba(255,215,0,0.3)]">
                <span className="text-4xl font-mono font-bold text-black leading-none">10+</span>
                <span className="text-[9px] font-mono tracking-[0.15em] text-black uppercase leading-tight text-center">
                  Years of<br />Excellence
                </span>
              </div>
            </div>
          </div>

          {/* Content side */}
          <div className="flex flex-col gap-10">
            <SectionHeader
              badge={about.badge}
              title={about.title}
              titleHighlight={about.titleHighlight}
              subtitle={about.description}
              align="left"
            />

            {/* Mission statement */}
            <div className="border-l-2 border-[#FFD700] pl-6">
              <p className="text-[#E5E5E5] text-base leading-relaxed font-sans italic">
                {about.mission}
              </p>
            </div>

            {/* Values grid */}
            <div className="grid sm:grid-cols-2 gap-4">
              {values.map((value, i) => {
                const Icon = icons[i];
                return (
                  <div
                    key={i}
                    className="flex gap-4 p-4 bg-[#0F0F0F] border border-[#1A1A1A] hover:border-[#FFD700]/20 transition-all duration-300 group"
                  >
                    <div className="flex-shrink-0 h-10 w-10 bg-[#FFD700]/10 border border-[#FFD700]/20 flex items-center justify-center group-hover:bg-[#FFD700]/15 transition-all duration-300">
                      <Icon className="h-5 w-5 text-[#FFD700]" />
                    </div>
                    <div className="flex flex-col gap-1 min-w-0">
                      <h4 className="text-sm font-mono font-bold text-white tracking-wide">
                        {about[value.titleKey]}
                      </h4>
                      <p className="text-xs text-[#606060] leading-relaxed font-sans">
                        {about[value.descKey]}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div>
              <Link href={`/${locale}/nosotros`}>
                <Button
                  variant="secondary"
                  size="md"
                  iconRight={<ArrowRight className="h-4 w-4" />}
                >
                  {dict.nav.about}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
