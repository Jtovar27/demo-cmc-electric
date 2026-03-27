import Image from "next/image";
import Link from "next/link";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Zap } from "lucide-react";

interface Service {
  id: string;
  title: string;
  titleEs: string;
  description: string;
  descriptionEs: string;
  image?: string | null;
  featured: boolean;
}

interface ServicesSectionProps {
  locale: string;
  dict: {
    services: Record<string, string>;
    nav: Record<string, string>;
  };
  services: Service[];
}

export function ServicesSection({ locale, dict, services }: ServicesSectionProps) {
  const { services: s } = dict;
  const isEs = locale === "es";

  return (
    <section className="py-24 bg-[#080808] relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#1A1A1A] to-transparent" />

      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex flex-col gap-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <SectionHeader
              badge={s.badge}
              title={s.title}
              titleHighlight={s.titleHighlight}
              subtitle={s.subtitle}
              align="left"
            />
            <Link href={`/${locale}/servicios`} className="flex-shrink-0">
              <Button
                variant="outline"
                size="md"
                iconRight={<ArrowRight className="h-4 w-4" />}
              >
                {dict.nav.services}
              </Button>
            </Link>
          </div>

          {/* Services grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((service) => {
              const title = isEs ? service.titleEs : service.title;
              const description = isEs ? service.descriptionEs : service.description;

              return (
                <div
                  key={service.id}
                  className="group relative bg-[#0F0F0F] border border-[#1A1A1A] hover:border-[#FFD700]/20 p-6 transition-all duration-300 overflow-hidden"
                >
                  {/* Background image subtle overlay */}
                  {service.image && (
                    <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-300">
                      <Image
                        src={service.image}
                        alt={title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}

                  {/* Content */}
                  <div className="relative z-10 flex flex-col gap-4">
                    <div className="h-10 w-10 bg-[#FFD700]/10 border border-[#FFD700]/20 flex items-center justify-center group-hover:bg-[#FFD700]/20 transition-all duration-300">
                      <Zap className="h-5 w-5 text-[#FFD700]" />
                    </div>

                    <h3 className="text-sm font-mono font-bold text-white tracking-wide group-hover:text-[#FFD700] transition-colors duration-200 leading-snug">
                      {title}
                    </h3>

                    <p className="text-xs text-[#606060] leading-relaxed font-sans line-clamp-3">
                      {description}
                    </p>

                    <Link
                      href={`/${locale}/contacto`}
                      className="text-xs font-mono tracking-widest uppercase text-[#FFD700]/60 hover:text-[#FFD700] transition-colors duration-200 flex items-center gap-1.5 mt-auto"
                    >
                      {s.contact_us}
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>

                  {/* Corner accent on hover */}
                  <div className="absolute top-0 right-0 w-0 h-0 border-t-[30px] border-r-[30px] border-t-transparent border-r-[#FFD700]/0 group-hover:border-r-[#FFD700]/20 transition-all duration-300" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
