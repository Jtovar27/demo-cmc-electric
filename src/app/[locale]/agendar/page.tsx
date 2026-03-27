import { getDictionary } from "@/i18n";
import type { Locale } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { Calendar, Clock, Video, CheckCircle } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return { title: locale === "es" ? "Agendar Cita" : "Schedule Appointment" };
}

export default async function AgendarPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const isEs = locale === "es";

  const benefits = [
    {
      icon: Clock,
      title: isEs ? "30 minutos gratis" : "30 minutes free",
      desc: isEs ? "Una sesion introductoria sin compromiso" : "An introductory session with no commitment",
    },
    {
      icon: Video,
      title: isEs ? "Video llamada o telefono" : "Video call or phone",
      desc: isEs ? "Tu eliges el medio de comunicacion" : "You choose the communication method",
    },
    {
      icon: CheckCircle,
      title: isEs ? "Orientacion personalizada" : "Personalized guidance",
      desc: isEs ? "Resolvemos tus dudas y te orientamos" : "We answer your questions and guide you",
    },
  ];

  return (
    <div className="bg-[#080808] pt-20">
      {/* Header */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 grid-overlay opacity-40" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FFD700]/30 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-3xl">
            <Badge variant="yellow" className="mb-6">{dict.schedule.badge}</Badge>
            <h1 className="text-5xl md:text-6xl font-mono font-bold tracking-tight text-white leading-tight mb-6">
              {dict.schedule.title}{" "}
              <span className="text-gradient">{dict.schedule.titleHighlight}</span>
            </h1>
            <p className="text-[#A0A0A0] text-xl leading-relaxed font-sans">{dict.schedule.subtitle}</p>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-12 bg-[#0A0A0A] border-y border-[#1A1A1A]">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid sm:grid-cols-3 gap-6">
            {benefits.map((b, i) => (
              <div key={i} className="flex gap-4">
                <div className="h-10 w-10 bg-[#FFD700]/10 border border-[#FFD700]/20 flex items-center justify-center flex-shrink-0">
                  <b.icon className="h-5 w-5 text-[#FFD700]" />
                </div>
                <div>
                  <h3 className="text-sm font-mono font-bold text-white mb-1">{b.title}</h3>
                  <p className="text-xs text-[#606060] font-sans">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Calendly embed */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="bg-[#0F0F0F] border border-[#1A1A1A] overflow-hidden">
            <div className="p-6 border-b border-[#1A1A1A] flex items-center gap-3">
              <Calendar className="h-5 w-5 text-[#FFD700]" />
              <span className="text-sm font-mono tracking-wide text-white">
                {dict.schedule.calendar_note}
              </span>
            </div>

            {/* Calendly iframe placeholder */}
            <div className="min-h-[600px] flex items-center justify-center bg-[#0A0A0A]">
              <div className="text-center flex flex-col items-center gap-4 max-w-sm">
                <div className="h-16 w-16 bg-[#FFD700]/10 border border-[#FFD700]/20 flex items-center justify-center">
                  <Calendar className="h-8 w-8 text-[#FFD700]" />
                </div>
                <h3 className="text-lg font-mono font-bold text-white">
                  {isEs ? "Calendly Integration" : "Calendly Integration"}
                </h3>
                <p className="text-sm text-[#606060] font-sans">
                  {isEs
                    ? "El calendario de Calendly se integrara aqui con tu URL personalizada."
                    : "The Calendly calendar will be integrated here with your custom URL."}
                </p>
                <div className="bg-[#141414] border border-[#2A2A2A] px-4 py-3 text-xs font-mono text-[#404040] w-full text-left">
                  {`// Replace with your Calendly URL:`}
                  <br />
                  {`// https://calendly.com/cmcelectric`}
                </div>
                <a
                  href="https://calendly.com/cmcelectric"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 h-11 px-6 bg-[#FFD700] text-black font-mono text-sm font-medium tracking-widest uppercase hover:bg-[#FFC200] transition-all duration-200"
                >
                  <Calendar className="h-4 w-4" />
                  {isEs ? "Abrir Calendly" : "Open Calendly"}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
