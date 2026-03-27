export const dynamic = "force-dynamic";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary } from "@/i18n";
import { prisma } from "@/lib/db";
import type { Locale } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { formatPrice } from "@/lib/utils";
import {
  Clock,
  BookOpen,
  Layers,
  ChevronDown,
  CheckCircle,
  ArrowLeft,
  ArrowRight,
  Lock,
  Play,
} from "lucide-react";

export default async function ProgramaDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const dict = await getDictionary(locale as Locale);
  const isEs = locale === "es";

  const course = await prisma.course.findUnique({
    where: { slug },
    include: {
      modules: {
        orderBy: { order: "asc" },
        include: {
          lessons: {
            where: { visible: true },
            orderBy: { order: "asc" },
          },
        },
      },
    },
  });

  if (!course || course.status !== "published") notFound();

  const title = isEs ? course.titleEs : course.title;
  const description = isEs ? course.descriptionEs : course.description;
  const longDesc = isEs ? (course.longDescEs || course.longDesc) : course.longDesc;
  const totalLessons = course.modules.reduce((acc, m) => acc + m.lessons.length, 0);

  const curriculum = [
    isEs ? "Fundamentos de circuitos electricos y teoria" : "Electrical circuit fundamentals and theory",
    isEs ? "Aplicacion practica de la Ley de Ohm" : "Practical application of Ohm's Law",
    isEs ? "Analisis de circuitos en serie y paralelo" : "Series and parallel circuit analysis",
    isEs ? "Mediciones electricas con multimetro" : "Electrical measurements with multimeter",
    isEs ? "Preparacion especifica para el examen" : "Specific exam preparation",
    isEs ? "Ejercicios de practica y evaluaciones" : "Practice exercises and assessments",
  ];

  return (
    <div className="bg-[#080808] pt-20">
      {/* Breadcrumb */}
      <div className="border-b border-[#1A1A1A] bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-4 flex items-center gap-2 text-xs font-mono text-[#606060]">
          <Link href={`/${locale}/programas`} className="hover:text-[#FFD700] transition-colors flex items-center gap-1.5">
            <ArrowLeft className="h-3 w-3" />
            {dict.programs.badge}
          </Link>
          <span>/</span>
          <span className="text-[#A0A0A0]">{title}</span>
        </div>
      </div>

      {/* Hero */}
      <section className="py-16 border-b border-[#1A1A1A]">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main info */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              <Badge variant={
                course.level === "advanced" ? "yellow" :
                course.level === "intermediate" ? "warning" : "muted"
              }>
                {(dict.programs as Record<string, string>)[`level_${course.level}`] || course.level}
              </Badge>

              <h1 className="text-4xl md:text-5xl font-mono font-bold tracking-tight text-white leading-tight">
                {title}
              </h1>

              <p className="text-[#A0A0A0] text-lg leading-relaxed font-sans">
                {description}
              </p>

              <div className="flex flex-wrap gap-6 py-4 border-y border-[#1A1A1A]">
                {course.duration && (
                  <div className="flex items-center gap-2 text-sm font-mono text-[#606060]">
                    <Clock className="h-4 w-4 text-[#FFD700]" />
                    {course.duration}
                  </div>
                )}
                <div className="flex items-center gap-2 text-sm font-mono text-[#606060]">
                  <Layers className="h-4 w-4 text-[#FFD700]" />
                  {course.modules.length} {dict.programs.modules_label}
                </div>
                <div className="flex items-center gap-2 text-sm font-mono text-[#606060]">
                  <BookOpen className="h-4 w-4 text-[#FFD700]" />
                  {totalLessons} {dict.programs.lessons_label}
                </div>
              </div>

              {/* What you'll learn */}
              {longDesc && (
                <div>
                  <h2 className="text-lg font-mono font-bold text-white mb-4 tracking-wide">
                    {isEs ? "Descripcion del Programa" : "Program Description"}
                  </h2>
                  <p className="text-[#A0A0A0] font-sans leading-relaxed">{longDesc}</p>
                </div>
              )}

              <div>
                <h2 className="text-lg font-mono font-bold text-white mb-4 tracking-wide">
                  {isEs ? "Lo que aprenderas" : "What You Will Learn"}
                </h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {curriculum.map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle className="h-4 w-4 text-[#FFD700] flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-[#A0A0A0] font-sans">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Enrollment card */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 bg-[#0F0F0F] border border-[#1A1A1A] overflow-hidden">
                {course.coverImage && (
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={course.coverImage}
                      alt={title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F] to-transparent" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="h-16 w-16 bg-[#FFD700]/20 border border-[#FFD700]/40 flex items-center justify-center backdrop-blur-sm">
                        <Play className="h-8 w-8 text-[#FFD700] fill-current ml-1" />
                      </div>
                    </div>
                  </div>
                )}

                <div className="p-6 flex flex-col gap-5">
                  <div>
                    <div className="text-xs font-mono tracking-widest uppercase text-[#606060] mb-1">
                      {dict.programs.price_label}
                    </div>
                    <div className="text-4xl font-mono font-bold text-[#FFD700]">
                      {course.price === 0 ? dict.programs.free : formatPrice(course.price)}
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    <Link href={`/${locale}/contacto`} className="block">
                      <Button variant="primary" size="lg" className="w-full" iconRight={<ArrowRight className="h-4 w-4" />}>
                        {dict.programs.enroll}
                      </Button>
                    </Link>
                    <Link href={`/${locale}/agendar`} className="block">
                      <Button variant="outline" size="md" className="w-full">
                        {isEs ? "Agendar Consulta" : "Schedule Consultation"}
                      </Button>
                    </Link>
                  </div>

                  <div className="flex flex-col gap-2 pt-2 border-t border-[#1A1A1A]">
                    {[
                      [isEs ? "Acceso de por vida" : "Lifetime access", true],
                      [isEs ? "Portal privado de estudiantes" : "Private student portal", true],
                      [isEs ? "Videos y materiales" : "Videos and materials", true],
                      [isEs ? "Soporte del instructor" : "Instructor support", true],
                    ].map(([text, included], i) => (
                      <div key={i} className="flex items-center gap-2 text-xs font-mono text-[#606060]">
                        <CheckCircle className="h-3.5 w-3.5 text-[#22C55E] flex-shrink-0" />
                        {text as string}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Curriculum */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-mono font-bold text-white tracking-wide mb-8">
              {isEs ? "Contenido del Programa" : "Program Curriculum"}
            </h2>

            <div className="flex flex-col gap-3">
              {course.modules.map((module, mi) => (
                <div key={module.id} className="bg-[#0F0F0F] border border-[#1A1A1A]">
                  <div className="flex items-center justify-between gap-4 px-5 py-4">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono text-[#FFD700] bg-[#FFD700]/10 border border-[#FFD700]/20 px-2 py-0.5">
                        {String(mi + 1).padStart(2, "0")}
                      </span>
                      <h3 className="text-sm font-mono font-bold text-white">
                        {isEs ? module.titleEs : module.title}
                      </h3>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-mono text-[#606060] flex-shrink-0">
                      <BookOpen className="h-3.5 w-3.5" />
                      {module.lessons.length} {dict.programs.lessons_label}
                    </div>
                  </div>

                  <div className="border-t border-[#1A1A1A]">
                    {module.lessons.slice(0, 3).map((lesson, li) => (
                      <div
                        key={lesson.id}
                        className="flex items-center gap-3 px-5 py-3 border-b border-[#141414] last:border-0"
                      >
                        <Lock className="h-3.5 w-3.5 text-[#404040] flex-shrink-0" />
                        <span className="text-xs text-[#606060] font-mono flex-1">
                          {isEs ? lesson.titleEs : lesson.title}
                        </span>
                        {lesson.duration && (
                          <span className="text-[10px] font-mono text-[#404040]">
                            {lesson.duration}
                          </span>
                        )}
                      </div>
                    ))}
                    {module.lessons.length > 3 && (
                      <div className="px-5 py-3 text-xs font-mono text-[#404040]">
                        +{module.lessons.length - 3} {isEs ? "clases mas" : "more lessons"}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
