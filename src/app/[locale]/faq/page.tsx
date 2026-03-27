export const dynamic = "force-dynamic";
import { getDictionary } from "@/i18n";
import { prisma } from "@/lib/db";
import type { Locale } from "@/types";
import { FAQSection } from "@/components/public/FAQSection";
import { Badge } from "@/components/ui/Badge";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return { title: locale === "es" ? "Preguntas Frecuentes" : "Frequently Asked Questions" };
}

export default async function FAQPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const isEs = locale === "es";

  const faqs = await prisma.fAQ.findMany({ orderBy: { order: "asc" } });

  return (
    <div className="bg-[#080808] pt-20">
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 grid-overlay opacity-40" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FFD700]/30 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-3xl">
            <Badge variant="yellow" className="mb-6">{dict.faq.badge}</Badge>
            <h1 className="text-5xl md:text-6xl font-mono font-bold tracking-tight text-white leading-tight mb-6">
              {dict.faq.title}{" "}
              <span className="text-gradient">{dict.faq.titleHighlight}</span>
            </h1>
            <p className="text-[#A0A0A0] text-xl leading-relaxed font-sans">{dict.faq.subtitle}</p>
          </div>
        </div>
      </section>

      <FAQSection locale={locale} dict={dict as Parameters<typeof FAQSection>[0]["dict"]} faqs={faqs} />

      <section className="py-16 bg-[#0A0A0A] border-t border-[#1A1A1A]">
        <div className="max-w-4xl mx-auto px-4 text-center flex flex-col items-center gap-4">
          <h2 className="text-2xl font-mono font-bold text-white">
            {isEs ? "Tienes mas preguntas?" : "Have more questions?"}
          </h2>
          <Link href={`/${locale}/contacto`}>
            <Button variant="primary" size="lg">{isEs ? "Contactanos" : "Contact Us"}</Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
