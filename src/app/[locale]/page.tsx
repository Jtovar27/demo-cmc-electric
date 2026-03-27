export const dynamic = "force-dynamic";
import { getDictionary } from "@/i18n";
import { prisma } from "@/lib/db";
import type { Locale } from "@/types";
import { HeroSection } from "@/components/public/HeroSection";
import { AboutSection } from "@/components/public/AboutSection";
import { ProgramsSection } from "@/components/public/ProgramsSection";
import { ServicesSection } from "@/components/public/ServicesSection";
import { TestimonialsSection } from "@/components/public/TestimonialsSection";
import { FAQSection } from "@/components/public/FAQSection";
import { CTASection } from "@/components/public/CTASection";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  // Fetch data from database
  const [courses, services, faqs] = await Promise.all([
    prisma.course.findMany({
      where: { status: "published" },
      orderBy: [{ featured: "desc" }, { order: "asc" }],
      take: 3,
      include: {
        _count: { select: { modules: true } },
      },
    }),
    prisma.service.findMany({
      orderBy: [{ featured: "desc" }, { order: "asc" }],
      take: 6,
    }),
    prisma.fAQ.findMany({
      orderBy: { order: "asc" },
      take: 6,
    }),
  ]);

  const courseCards = courses.map((c) => ({
    id: c.id,
    title: c.title,
    titleEs: c.titleEs,
    slug: c.slug,
    description: c.description,
    descriptionEs: c.descriptionEs,
    coverImage: c.coverImage,
    price: c.price,
    level: c.level,
    duration: c.duration,
    instructor: c.instructor,
    featured: c.featured,
    moduleCount: c._count.modules,
  }));

  return (
    <>
      <HeroSection locale={locale} dict={dict as Parameters<typeof HeroSection>[0]["dict"]} />
      <AboutSection locale={locale} dict={dict as Parameters<typeof AboutSection>[0]["dict"]} />
      <ProgramsSection
        locale={locale}
        dict={dict as Parameters<typeof ProgramsSection>[0]["dict"]}
        courses={courseCards}
      />
      <ServicesSection
        locale={locale}
        dict={dict as Parameters<typeof ServicesSection>[0]["dict"]}
        services={services}
      />
      <TestimonialsSection
        locale={locale}
        dict={dict as Parameters<typeof TestimonialsSection>[0]["dict"]}
      />
      <FAQSection
        locale={locale}
        dict={dict as Parameters<typeof FAQSection>[0]["dict"]}
        faqs={faqs}
      />
      <CTASection locale={locale} dict={dict as Parameters<typeof CTASection>[0]["dict"]} />
    </>
  );
}
