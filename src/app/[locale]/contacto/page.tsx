"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Input";
import { Phone, Mail, MapPin, MessageCircle, Clock, CheckCircle, Calendar } from "lucide-react";

const contactInfo = {
  phone: "+1 (555) 000-0000",
  email: "info@cmcelectric.com",
  location: "United States",
  hours: "Mon - Fri: 8am - 6pm",
};

export default function ContactoPage() {
  const params = useParams();
  const locale = params.locale as string;
  const isEs = locale === "es";

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    // Simulate form submission
    await new Promise((r) => setTimeout(r, 1500));
    setStatus("success");
  };

  const t = {
    badge: isEs ? "Contacto" : "Contact",
    title: isEs ? "Ponte en" : "Get In",
    highlight: isEs ? "Contacto" : "Touch",
    subtitle: isEs
      ? "Listo para comenzar tu formacion o necesitas servicios? Estamos aqui para ayudarte."
      : "Ready to start your training or need electrical services? We're here to help.",
    name: isEs ? "Nombre Completo" : "Full Name",
    email: isEs ? "Correo Electronico" : "Email Address",
    phone: isEs ? "Telefono (opcional)" : "Phone (optional)",
    subject: isEs ? "Asunto" : "Subject",
    message: isEs ? "Mensaje" : "Message",
    send: isEs ? "Enviar Mensaje" : "Send Message",
    sending: isEs ? "Enviando..." : "Sending...",
    success: isEs
      ? "Mensaje enviado correctamente. Te contactaremos pronto."
      : "Message sent successfully. We'll get back to you shortly.",
    whatsapp: isEs ? "Chatear por WhatsApp" : "Chat on WhatsApp",
    schedule: isEs ? "Agendar una Llamada" : "Schedule a Call",
    location: isEs ? "Ubicacion" : "Location",
    hours: isEs ? "Horario" : "Hours",
  };

  return (
    <div className="bg-[#080808] pt-20">
      {/* Header */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 grid-overlay opacity-40" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FFD700]/30 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-3xl">
            <Badge variant="yellow" className="mb-6">{t.badge}</Badge>
            <h1 className="text-5xl md:text-6xl font-mono font-bold tracking-tight text-white leading-tight mb-6">
              {t.title}{" "}
              <span className="text-gradient">{t.highlight}</span>
            </h1>
            <p className="text-[#A0A0A0] text-xl leading-relaxed font-sans">{t.subtitle}</p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Form */}
            <div className="lg:col-span-3">
              {status === "success" ? (
                <div className="bg-[#0F0F0F] border border-green-500/20 p-12 flex flex-col items-center gap-4 text-center">
                  <div className="h-16 w-16 bg-green-500/10 border border-green-500/20 flex items-center justify-center">
                    <CheckCircle className="h-8 w-8 text-green-400" />
                  </div>
                  <h3 className="text-xl font-mono font-bold text-white">{isEs ? "Mensaje Enviado" : "Message Sent"}</h3>
                  <p className="text-[#A0A0A0] font-sans">{t.success}</p>
                  <Button variant="outline" size="md" onClick={() => setStatus("idle")}>
                    {isEs ? "Enviar otro mensaje" : "Send another message"}
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <Input
                      label={t.name}
                      name="name"
                      placeholder={isEs ? "Tu nombre completo" : "Your full name"}
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                    <Input
                      label={t.email}
                      name="email"
                      type="email"
                      placeholder={isEs ? "tu@correo.com" : "you@email.com"}
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <Input
                      label={t.phone}
                      name="phone"
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                    <Input
                      label={t.subject}
                      name="subject"
                      placeholder={isEs ? "Asunto de tu mensaje" : "What is this about?"}
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <Textarea
                    label={t.message}
                    name="message"
                    placeholder={isEs ? "Escribe tu mensaje aqui..." : "Write your message here..."}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="min-h-[160px]"
                  />
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    loading={status === "loading"}
                    className="self-start"
                  >
                    {status === "loading" ? t.sending : t.send}
                  </Button>
                </form>
              )}
            </div>

            {/* Contact info */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              {/* Contact details */}
              <div className="bg-[#0F0F0F] border border-[#1A1A1A] p-6 flex flex-col gap-5">
                <h3 className="text-sm font-mono tracking-widest uppercase text-[#FFD700]">
                  {isEs ? "Informacion de Contacto" : "Contact Information"}
                </h3>

                <div className="flex flex-col gap-4">
                  <a href="tel:+15550000000" className="flex items-center gap-3 group">
                    <div className="h-10 w-10 bg-[#FFD700]/10 border border-[#FFD700]/20 flex items-center justify-center flex-shrink-0 group-hover:bg-[#FFD700]/20 transition-all">
                      <Phone className="h-4 w-4 text-[#FFD700]" />
                    </div>
                    <div>
                      <div className="text-[10px] font-mono tracking-widest uppercase text-[#404040]">
                        {isEs ? "Telefono" : "Phone"}
                      </div>
                      <div className="text-sm font-mono text-white">{contactInfo.phone}</div>
                    </div>
                  </a>

                  <a href="mailto:info@cmcelectric.com" className="flex items-center gap-3 group">
                    <div className="h-10 w-10 bg-[#FFD700]/10 border border-[#FFD700]/20 flex items-center justify-center flex-shrink-0 group-hover:bg-[#FFD700]/20 transition-all">
                      <Mail className="h-4 w-4 text-[#FFD700]" />
                    </div>
                    <div>
                      <div className="text-[10px] font-mono tracking-widest uppercase text-[#404040]">
                        {isEs ? "Correo" : "Email"}
                      </div>
                      <div className="text-sm font-mono text-white">{contactInfo.email}</div>
                    </div>
                  </a>

                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-[#FFD700]/10 border border-[#FFD700]/20 flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-4 w-4 text-[#FFD700]" />
                    </div>
                    <div>
                      <div className="text-[10px] font-mono tracking-widest uppercase text-[#404040]">
                        {t.location}
                      </div>
                      <div className="text-sm font-mono text-white">{contactInfo.location}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-[#FFD700]/10 border border-[#FFD700]/20 flex items-center justify-center flex-shrink-0">
                      <Clock className="h-4 w-4 text-[#FFD700]" />
                    </div>
                    <div>
                      <div className="text-[10px] font-mono tracking-widest uppercase text-[#404040]">
                        {t.hours}
                      </div>
                      <div className="text-sm font-mono text-white">{contactInfo.hours}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick actions */}
              <div className="flex flex-col gap-3">
                <a
                  href="https://wa.me/15550000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 h-12 bg-[#25D366] text-white font-mono text-sm tracking-widest uppercase font-medium hover:bg-[#1ebc59] transition-all duration-200"
                >
                  <MessageCircle className="h-4 w-4" />
                  {t.whatsapp}
                </a>
                <a
                  href={`/${locale}/agendar`}
                  className="flex items-center justify-center gap-3 h-12 border border-[#FFD700] text-[#FFD700] font-mono text-sm tracking-widest uppercase hover:bg-[#FFD700] hover:text-black transition-all duration-200"
                >
                  <Calendar className="h-4 w-4" />
                  {t.schedule}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map placeholder */}
      <section className="h-64 bg-[#0F0F0F] border-t border-[#1A1A1A] flex items-center justify-center">
        <div className="text-center flex flex-col items-center gap-3">
          <MapPin className="h-8 w-8 text-[#FFD700]" />
          <p className="text-sm font-mono text-[#606060] tracking-wide uppercase">
            {isEs ? "Ubicados en los Estados Unidos" : "Located in the United States"}
          </p>
          <a
            href="https://maps.google.com/?q=United+States"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-mono text-[#FFD700] hover:underline"
          >
            {isEs ? "Ver en Google Maps" : "View on Google Maps"}
          </a>
        </div>
      </section>
    </div>
  );
}
