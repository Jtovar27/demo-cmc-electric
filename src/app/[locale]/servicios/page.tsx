export const dynamic = "force-dynamic";
import Image from "next/image";
import Link from "next/link";
import { getDictionary } from "@/i18n";
import { prisma } from "@/lib/db";
import type { Locale } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Zap, ArrowRight, Phone, CheckCircle } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return {
    title: locale === "es" ? "Servicios Electricos" : "Electrical Services",
  };
}

export default async function ServiciosPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const isEs = locale === "es";

  const services = await prisma.service.findMany({
    orderBy: [{ featured: "desc" }, { order: "asc" }],
  });

  const serviceAreas = [
    isEs ? "Instalaciones residenciales" : "Residential installations",
    isEs ? "Reparaciones y mantenimiento" : "Repairs and maintenance",
    isEs ? "Actualizacion de paneles" : "Panel upgrades",
    isEs ? "Instalacion de GFCI" : "GFCI installation",
    isEs ? "Cableado 3-way y 4-way" : "3-way and 4-way wiring",
    isEs ? "Localizacion de fallas" : "Fault location",
    isEs ? "Tutoria electrica" : "Electrical tutoring",
    isEs ? "Diagnostico y evaluacion" : "Diagnostics and assessment",
  ];

  return (
    <div className="bg-[#080808] pt-20">
      {/* Header */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 grid-overlay opacity-40" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FFD700]/30 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-3xl">
            <Badge variant="yellow" className="mb-6">{dict.services.badge}</Badge>
            <h1 className="text-5xl md:text-6xl font-mono font-bold tracking-tight text-white leading-tight mb-6">
              {dict.services.title}{" "}
              <span className="text-gradient">{dict.services.titleHighlight}</span>
            </h1>
            <p className="text-[#A0A0A0] text-xl leading-relaxed font-sans">
              {dict.services.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Services grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => {
              const title = isEs ? service.titleEs : service.title;
              const description = isEs ? service.descriptionEs : service.description;

              return (
                <div
                  key={service.id}
                  className="bg-[#0F0F0F] border border-[#1A1A1A] hover:border-[#FFD700]/30 transition-all duration-300 group overflow-hidden flex flex-col"
                >
                  {service.image && (
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={service.image}
                        alt={title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F] to-transparent" />
                      <div className="absolute bottom-3 left-3">
                        {service.featured && (
                          <Badge variant="yellow" size="sm">
                            {isEs ? "Destacado" : "Featured"}
                          </Badge>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="flex flex-col gap-4 p-6 flex-1">
                    {!service.image && (
                      <div className="h-12 w-12 bg-[#FFD700]/10 border border-[#FFD700]/20 flex items-center justify-center">
                        <Zap className="h-6 w-6 text-[#FFD700]" />
                      </div>
                    )}

                    <h3 className="text-base font-mono font-bold text-white tracking-wide leading-snug group-hover:text-[#FFD700] transition-colors">
                      {title}
                    </h3>
                    <p className="text-sm text-[#606060] leading-relaxed font-sans flex-1">
                      {description}
                    </p>

                    <Link href={`/${locale}/contacto`}>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start px-0 text-[#FFD700]/60 hover:text-[#FFD700]"
                        iconRight={<ArrowRight className="h-3.5 w-3.5" />}
                      >
                        {dict.services.contact_us}
                      </Button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Service areas */}
      <section className="py-16 bg-[#0A0A0A] border-t border-[#1A1A1A]">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <SectionHeader
                badge={isEs ? "Areas de Servicio" : "Service Areas"}
                title={isEs ? "Que podemos" : "What We Can"}
                titleHighlight={isEs ? "hacer por ti" : "Do For You"}
                align="left"
              />
              <div className="mt-8 grid sm:grid-cols-2 gap-3">
                {serviceAreas.map((area, i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <CheckCircle className="h-4 w-4 text-[#FFD700] flex-shrink-0" />
                    <span className="text-sm text-[#A0A0A0] font-sans">{area}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact card */}
            <div className="bg-[#0F0F0F] border border-[#1A1A1A] p-8 flex flex-col gap-6">
              <div>
                <h3 className="text-xl font-mono font-bold text-white mb-2">
                  {isEs ? "Solicitar Servicio" : "Request Service"}
                </h3>
                <p className="text-sm text-[#606060] font-sans">
                  {isEs
                    ? "Contactanos para agendar tu servicio o solicitar un presupuesto gratuito."
                    : "Contact us to schedule your service or request a free estimate."}
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <Link href={`/${locale}/contacto`}>
                  <Button variant="primary" size="lg" className="w-full" icon={<Phone className="h-4 w-4" />}>
                    {dict.services.contact_us}
                  </Button>
                </Link>
                <Link href={`/${locale}/agendar`}>
                  <Button variant="outline" size="md" className="w-full">
                    {isEs ? "Agendar Cita" : "Schedule Appointment"}
                  </Button>
                </Link>
                <a
                  href="https://wa.me/15550000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 h-10 border border-[#25D366]/30 text-[#25D366] text-sm font-mono tracking-widest uppercase hover:bg-[#25D366]/5 transition-all duration-200"
                >
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
