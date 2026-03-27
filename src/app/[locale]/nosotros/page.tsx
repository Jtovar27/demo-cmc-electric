import Image from "next/image";
import Link from "next/link";
import { getDictionary } from "@/i18n";
import type { Locale } from "@/types";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import {
  Target,
  Eye,
  Shield,
  Award,
  Users,
  Zap,
  CheckCircle,
  ArrowRight,
} from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return {
    title: locale === "es" ? "Nosotros" : "About Us",
    description: locale === "es"
      ? "Conoce el equipo y la mision de CMC Electric LLC"
      : "Meet the team and mission of CMC Electric LLC",
  };
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const isEs = locale === "es";

  const values = [
    {
      icon: Target,
      title: isEs ? "Mision" : "Mission",
      text: isEs
        ? "Ofrecer educacion electrica de alta calidad que cumpla con los estandares de la industria y prepare a los estudiantes para una carrera exitosa en los oficios."
        : "To deliver high-quality electrical education that meets industry standards and prepares students for a rewarding career in the trades.",
    },
    {
      icon: Eye,
      title: isEs ? "Vision" : "Vision",
      text: isEs
        ? "Ser el proveedor de formacion electrica de referencia en la comunidad hispana de los EE.UU., reconocido por la calidad, accesibilidad y resultados reales."
        : "To be the reference electrical training provider in the US Hispanic community, recognized for quality, accessibility, and real results.",
    },
    {
      icon: Shield,
      title: isEs ? "Valores" : "Values",
      text: isEs
        ? "Integridad, excelencia tecnica, responsabilidad, orientacion al estudiante y compromiso real con el exito de cada persona que pasa por nuestros programas."
        : "Integrity, technical excellence, accountability, student orientation, and real commitment to every person who goes through our programs.",
    },
  ];

  const differentiators = [
    isEs ? "Formacion bilingue Espanol / Ingles" : "Bilingual Spanish / English training",
    isEs ? "Curriculum alineado con el NEC y estandares del examen Journeyman" : "Curriculum aligned with NEC and Journeyman exam standards",
    isEs ? "Enfoque teorico-practico con videos y materiales descargables" : "Theory and hands-on approach with videos and downloadable materials",
    isEs ? "Portal privado de estudiantes disponible 24/7" : "Private student portal available 24/7",
    isEs ? "Instructores con experiencia real en campo" : "Instructors with real field experience",
    isEs ? "Soporte y acompanamiento durante todo el proceso" : "Support and guidance throughout the entire process",
    isEs ? "Clases organizadas por modulos progresivos" : "Classes organized by progressive modules",
    isEs ? "Preparacion especifica para el examen Journeyman" : "Specific preparation for the Journeyman exam",
  ];

  return (
    <div className="bg-[#080808] pt-20">
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 grid-overlay opacity-40" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FFD700]/30 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-3xl">
            <Badge variant="yellow" className="mb-6">
              {dict.about.badge}
            </Badge>
            <h1 className="text-5xl md:text-6xl font-mono font-bold tracking-tight text-white leading-tight mb-6">
              {isEs ? "Sobre" : "About"}{" "}
              <span className="text-gradient">CMC Electric</span>
            </h1>
            <p className="text-[#A0A0A0] text-xl leading-relaxed font-sans">
              {dict.about.description}
            </p>
          </div>
        </div>
      </section>

      {/* Story section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="relative aspect-video overflow-hidden border border-[#1A1A1A]">
                <Image
                  src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop&q=80"
                  alt="CMC Electric team at work"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/60 to-transparent" />
              </div>
              <div className="absolute -top-3 -left-3 w-10 h-10 border-t-2 border-l-2 border-[#FFD700]" />
              <div className="absolute -bottom-3 -right-3 w-10 h-10 border-b-2 border-r-2 border-[#FFD700]" />
            </div>

            <div className="flex flex-col gap-8">
              <div>
                <h2 className="text-3xl font-mono font-bold text-white tracking-tight mb-4">
                  {isEs ? "Nuestra Historia" : "Our Story"}
                </h2>
                <div className="flex flex-col gap-4 text-[#A0A0A0] font-sans leading-relaxed">
                  <p>
                    {isEs
                      ? "CMC Electric LLC nacio de la necesidad real de ofrecer formacion electrica profesional y accesible para la comunidad hispana en los Estados Unidos. Muchos tecnicos talentosos se enfrentaban a barreras de idioma, material de baja calidad y falta de orientacion estructurada."
                      : "CMC Electric LLC was born from the real need to offer professional, accessible electrical training for the Hispanic community in the United States. Many talented technicians faced language barriers, poor quality materials, and lack of structured guidance."}
                  </p>
                  <p>
                    {isEs
                      ? "Decidimos construir algo diferente: una plataforma de formacion electrica tecnica, bilingue y de alta calidad, que combine teoria solida con practica real y prepare a los estudiantes no solo para aprobar examenes, sino para destacar en su campo."
                      : "We decided to build something different: a high-quality, bilingual, technical electrical training platform that combines solid theory with real practice and prepares students not just to pass exams, but to excel in their field."}
                  </p>
                  <p>
                    {isEs
                      ? "Hoy, CMC Electric es una plataforma completa con cursos, videos, materiales y soporte profesional para electricistas en todos los niveles."
                      : "Today, CMC Electric is a complete platform with courses, videos, materials, and professional support for electricians at all levels."}
                  </p>
                </div>
              </div>

              <div className="border-l-2 border-[#FFD700] pl-6">
                <p className="text-[#E5E5E5] italic font-sans">
                  {dict.about.mission}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission / Vision / Values */}
      <section className="py-20 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6">
            {values.map((value, i) => (
              <div
                key={i}
                className="bg-[#0F0F0F] border border-[#1A1A1A] p-8 flex flex-col gap-5 hover:border-[#FFD700]/20 transition-all duration-300"
              >
                <div className="h-12 w-12 bg-[#FFD700]/10 border border-[#FFD700]/20 flex items-center justify-center">
                  <value.icon className="h-6 w-6 text-[#FFD700]" />
                </div>
                <h3 className="text-xl font-mono font-bold text-white tracking-wide">
                  {value.title}
                </h3>
                <p className="text-[#606060] font-sans leading-relaxed text-sm">
                  {value.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why CMC Electric */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="flex flex-col gap-8">
              <SectionHeader
                badge={isEs ? "Por que elegirnos" : "Why Choose Us"}
                title={isEs ? "La diferencia" : "The CMC"}
                titleHighlight={isEs ? "CMC Electric" : "Electric Difference"}
                align="left"
              />
              <div className="flex flex-col gap-3">
                {differentiators.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-[#FFD700] flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-[#A0A0A0] font-sans">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { label: isEs ? "Estudiantes Formados" : "Students Trained", value: "100+" },
                { label: isEs ? "Programas Activos" : "Active Programs", value: "4" },
                { label: isEs ? "Tasa de Aprobacion" : "Pass Rate", value: "98%" },
                { label: isEs ? "Anos de Experiencia" : "Years Experience", value: "10+" },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="bg-[#0F0F0F] border border-[#1A1A1A] p-6 flex flex-col gap-2"
                >
                  <span className="text-3xl font-mono font-bold text-[#FFD700]">
                    {stat.value}
                  </span>
                  <span className="text-xs font-mono tracking-widest uppercase text-[#606060]">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#0A0A0A] border-t border-[#1A1A1A]">
        <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 text-center flex flex-col items-center gap-6">
          <h2 className="text-3xl font-mono font-bold text-white">
            {isEs ? "Listo para comenzar?" : "Ready to get started?"}
          </h2>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href={`/${locale}/programas`}>
              <Button variant="primary" size="lg" iconRight={<ArrowRight className="h-4 w-4" />}>
                {isEs ? "Ver Programas" : "View Programs"}
              </Button>
            </Link>
            <Link href={`/${locale}/contacto`}>
              <Button variant="secondary" size="lg">
                {isEs ? "Contactanos" : "Contact Us"}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
