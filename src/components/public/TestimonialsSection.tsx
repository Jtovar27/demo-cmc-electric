import { SectionHeader } from "@/components/ui/SectionHeader";
import { Quote } from "lucide-react";

interface TestimonialsSectionProps {
  locale: string;
  dict: {
    testimonials: Record<string, string>;
  };
}

const testimonials = [
  {
    quote: "CMC Electric's program completely transformed my understanding of electrical systems. The hands-on approach and video lessons made complex concepts easy to grasp. I passed my Journeyman exam on the first try.",
    quoteEs: "El programa de CMC Electric transformo por completo mi comprension de los sistemas electricos. El enfoque practico y las lecciones en video hicieron que los conceptos complejos fueran faciles de entender. Aprobe mi examen Journeyman al primer intento.",
    name: "Miguel A.",
    role: "Journeyman Electrician",
    roleEs: "Electricista Journeyman",
  },
  {
    quote: "The bilingual training was exactly what I needed. Being able to learn in Spanish while preparing for English-language exams gave me a huge advantage. The structured curriculum is outstanding.",
    quoteEs: "La formacion bilingue fue exactamente lo que necesitaba. Poder aprender en espanol mientras me preparaba para examenes en ingles me dio una gran ventaja. El curriculo estructurado es sobresaliente.",
    name: "Carlos R.",
    role: "Electrical Apprentice",
    roleEs: "Aprendiz de Electricista",
  },
  {
    quote: "I've been in the electrical industry for years, but CMC Electric helped me fill critical knowledge gaps. The conduit bending and fault location modules were especially valuable for my daily work.",
    quoteEs: "He estado en la industria electrica por anos, pero CMC Electric me ayudo a llenar vacios criticos de conocimiento. Los modulos de doblado de conductos y localizacion de fallas fueron especialmente valiosos.",
    name: "Robert M.",
    role: "Master Electrician",
    roleEs: "Electricista Maestro",
  },
];

export function TestimonialsSection({ locale, dict }: TestimonialsSectionProps) {
  const { testimonials: t } = dict;
  const isEs = locale === "es";

  return (
    <section className="py-24 bg-[#0A0A0A] relative overflow-hidden">
      {/* Yellow line accents */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FFD700]/20 to-transparent" />

      {/* Background subtle pattern */}
      <div className="absolute inset-0 grid-overlay opacity-20" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <SectionHeader
          badge={t.badge}
          title={t.title}
          titleHighlight={t.titleHighlight}
          subtitle={t.subtitle}
          align="center"
          className="mb-16"
        />

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, i) => (
            <div
              key={i}
              className="bg-[#0F0F0F] border border-[#1A1A1A] p-7 flex flex-col gap-6 relative group hover:border-[#FFD700]/20 transition-all duration-300"
            >
              {/* Quote icon */}
              <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                <Quote className="h-10 w-10 text-[#FFD700]" />
              </div>

              {/* Stars */}
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, si) => (
                  <svg
                    key={si}
                    className="h-3.5 w-3.5 fill-[#FFD700] text-[#FFD700]"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-sm text-[#A0A0A0] leading-relaxed font-sans flex-1 italic">
                &ldquo;{isEs ? testimonial.quoteEs : testimonial.quote}&rdquo;
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-3 border-t border-[#1A1A1A] pt-5">
                <div className="h-10 w-10 bg-[#FFD700]/10 border border-[#FFD700]/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-mono font-bold text-[#FFD700]">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-sm font-mono font-bold text-white">
                    {testimonial.name}
                  </span>
                  <span className="text-xs font-mono text-[#606060]">
                    {isEs ? testimonial.roleEs : testimonial.role}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
