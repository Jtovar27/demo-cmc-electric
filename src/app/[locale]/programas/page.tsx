export const dynamic = "force-dynamic";
import Image from "next/image";
import Link from "next/link";
import { getDictionary } from "@/i18n";
import { prisma } from "@/lib/db";
import type { Locale } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { formatPrice } from "@/lib/utils";
import { Clock, BookOpen, ArrowRight, Star, Layers } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return {
    title: locale === "es" ? "Programas de Formacion" : "Training Programs",
    description: locale === "es"
      ? "Explora todos nuestros programas de formacion electrica profesional"
      : "Explore all our professional electrical training programs",
  };
}

export default async function ProgramasPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const isEs = locale === "es";
  const { programs } = dict;

  const courses = await prisma.course.findMany({
    where: { status: "published" },
    orderBy: [{ featured: "desc" }, { order: "asc" }],
    include: {
      _count: { select: { modules: true, enrollments: true } },
      modules: {
        include: {
          _count: { select: { lessons: true } },
        },
      },
    },
  });

  const levelVariants: Record<string, "yellow" | "muted" | "warning"> = {
    beginner: "muted",
    intermediate: "warning",
    advanced: "yellow",
  };

  const totalLessons = (course: typeof courses[number]) =>
    course.modules.reduce((acc, m) => acc + m._count.lessons, 0);

  return (
    <div className="bg-[#080808] pt-20">
      {/* Header */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 grid-overlay opacity-40" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FFD700]/30 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-3xl">
            <Badge variant="yellow" className="mb-6">{programs.badge}</Badge>
            <h1 className="text-5xl md:text-6xl font-mono font-bold tracking-tight text-white leading-tight mb-6">
              {programs.title}{" "}
              <span className="text-gradient">{programs.titleHighlight}</span>
            </h1>
            <p className="text-[#A0A0A0] text-xl leading-relaxed font-sans">
              {programs.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Course grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {courses.map((course) => {
              const title = isEs ? course.titleEs : course.title;
              const description = isEs ? course.descriptionEs : course.description;
              const longDesc = isEs ? course.longDescEs : course.longDesc;
              const lessons = totalLessons(course);

              return (
                <article
                  key={course.id}
                  className="bg-[#0F0F0F] border border-[#1A1A1A] hover:border-[#FFD700]/30 transition-all duration-300 group flex flex-col overflow-hidden"
                >
                  {/* Image */}
                  <div className="relative h-56 overflow-hidden bg-[#141414]">
                    {course.coverImage ? (
                      <Image
                        src={course.coverImage}
                        alt={title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-[#141414]">
                        <BookOpen className="h-16 w-16 text-[#2A2A2A]" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F] to-transparent" />

                    {course.featured && (
                      <div className="absolute top-4 right-4">
                        <Badge variant="yellow" size="sm">
                          <Star className="h-2.5 w-2.5 mr-1 inline fill-current" />
                          {programs.featured}
                        </Badge>
                      </div>
                    )}

                    <div className="absolute bottom-4 left-4">
                      <Badge variant={levelVariants[course.level] || "muted"} size="sm">
                        {(programs as Record<string, string>)[`level_${course.level}`] || course.level}
                      </Badge>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col gap-5 p-6 flex-1">
                    <div>
                      <h2 className="text-lg font-mono font-bold text-white tracking-wide leading-snug group-hover:text-[#FFD700] transition-colors mb-2">
                        {title}
                      </h2>
                      <p className="text-sm text-[#606060] leading-relaxed font-sans">
                        {longDesc || description}
                      </p>
                    </div>

                    {/* Stats row */}
                    <div className="flex flex-wrap items-center gap-5 border-t border-[#1A1A1A] pt-4">
                      {course.duration && (
                        <div className="flex items-center gap-2 text-xs font-mono text-[#606060]">
                          <Clock className="h-3.5 w-3.5 text-[#FFD700]" />
                          {course.duration}
                        </div>
                      )}
                      <div className="flex items-center gap-2 text-xs font-mono text-[#606060]">
                        <Layers className="h-3.5 w-3.5 text-[#FFD700]" />
                        {course._count.modules} {programs.modules_label}
                      </div>
                      <div className="flex items-center gap-2 text-xs font-mono text-[#606060]">
                        <BookOpen className="h-3.5 w-3.5 text-[#FFD700]" />
                        {lessons} {programs.lessons_label}
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between mt-auto pt-2">
                      <div className="flex flex-col gap-0.5">
                        <span className="text-[10px] font-mono tracking-widest uppercase text-[#404040]">
                          {programs.price_label}
                        </span>
                        <span className="text-2xl font-mono font-bold text-[#FFD700]">
                          {course.price === 0 ? programs.free : formatPrice(course.price)}
                        </span>
                      </div>
                      <div className="flex gap-3">
                        <Link href={`/${locale}/agendar`}>
                          <Button variant="outline" size="sm">
                            {isEs ? "Agendar" : "Schedule"}
                          </Button>
                        </Link>
                        <Link href={`/${locale}/programas/${course.slug}`}>
                          <Button variant="primary" size="sm" iconRight={<ArrowRight className="h-3.5 w-3.5" />}>
                            {programs.learn_more}
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 bg-[#0A0A0A] border-t border-[#1A1A1A]">
        <div className="max-w-4xl mx-auto px-4 text-center flex flex-col items-center gap-6">
          <h2 className="text-3xl font-mono font-bold text-white">
            {isEs ? "No estas seguro por donde empezar?" : "Not sure where to start?"}
          </h2>
          <p className="text-[#606060] font-sans">
            {isEs
              ? "Agenda una consulta gratuita y te orientamos al programa correcto para tu nivel."
              : "Schedule a free consultation and we'll guide you to the right program for your level."}
          </p>
          <Link href={`/${locale}/agendar`}>
            <Button variant="primary" size="lg">
              {isEs ? "Consulta Gratuita" : "Free Consultation"}
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
