import Image from "next/image";
import Link from "next/link";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { formatPrice } from "@/lib/utils";
import { Clock, BookOpen, ArrowRight, Star } from "lucide-react";
import type { CourseCard } from "@/types";

interface ProgramsSectionProps {
  locale: string;
  dict: {
    programs: Record<string, string>;
  };
  courses: CourseCard[];
}

export function ProgramsSection({ locale, dict, courses }: ProgramsSectionProps) {
  const { programs } = dict;
  const isEs = locale === "es";

  const levelVariants: Record<string, "yellow" | "muted" | "warning"> = {
    beginner: "muted",
    intermediate: "warning",
    advanced: "yellow",
  };

  return (
    <section className="py-24 bg-[#0A0A0A] relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 grid-overlay opacity-30" />

      {/* Top accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FFD700]/30 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <SectionHeader
            badge={programs.badge}
            title={programs.title}
            titleHighlight={programs.titleHighlight}
            subtitle={programs.subtitle}
            align="left"
          />
          <Link href={`/${locale}/programas`} className="flex-shrink-0">
            <Button
              variant="outline"
              size="md"
              iconRight={<ArrowRight className="h-4 w-4" />}
            >
              {programs.view_all}
            </Button>
          </Link>
        </div>

        {/* Course cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => {
            const title = isEs ? course.title : course.title;
            const description = isEs ? course.description : course.description;
            const level = course.level;

            return (
              <article
                key={course.id}
                className="bg-[#0F0F0F] border border-[#1A1A1A] hover:border-[#FFD700]/30 transition-all duration-300 group flex flex-col overflow-hidden"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden bg-[#141414]">
                  {course.coverImage ? (
                    <Image
                      src={course.coverImage}
                      alt={title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <BookOpen className="h-12 w-12 text-[#2A2A2A]" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F] to-transparent" />

                  {/* Featured badge */}
                  {course.featured && (
                    <div className="absolute top-3 right-3">
                      <Badge variant="yellow" size="sm">
                        <Star className="h-2.5 w-2.5 mr-1 inline fill-current" />
                        {programs.featured}
                      </Badge>
                    </div>
                  )}

                  {/* Level */}
                  <div className="absolute bottom-3 left-3">
                    <Badge
                      variant={levelVariants[level] || "muted"}
                      size="sm"
                    >
                      {programs[`level_${level}`] || level}
                    </Badge>
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-col gap-4 p-5 flex-1">
                  <h3 className="text-base font-mono font-bold text-white tracking-wide leading-snug group-hover:text-[#FFD700] transition-colors duration-200">
                    {title}
                  </h3>

                  <p className="text-sm text-[#606060] leading-relaxed font-sans line-clamp-2">
                    {description}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center gap-4 text-xs font-mono text-[#404040]">
                    {course.duration && (
                      <span className="flex items-center gap-1.5">
                        <Clock className="h-3 w-3 text-[#FFD700]" />
                        {course.duration}
                      </span>
                    )}
                    {course.moduleCount !== undefined && (
                      <span className="flex items-center gap-1.5">
                        <BookOpen className="h-3 w-3 text-[#FFD700]" />
                        {course.moduleCount} {programs.modules_label}
                      </span>
                    )}
                  </div>
                </div>

                {/* Footer */}
                <div className="px-5 pb-5 flex items-center justify-between border-t border-[#1A1A1A] pt-4">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[10px] font-mono tracking-widest uppercase text-[#404040]">
                      {programs.price_label}
                    </span>
                    <span className="text-lg font-mono font-bold text-[#FFD700]">
                      {course.price === 0 ? programs.free : formatPrice(course.price)}
                    </span>
                  </div>
                  <Link href={`/${locale}/programas/${course.slug}`}>
                    <Button
                      variant="primary"
                      size="sm"
                      iconRight={<ArrowRight className="h-3.5 w-3.5" />}
                    >
                      {programs.learn_more}
                    </Button>
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
