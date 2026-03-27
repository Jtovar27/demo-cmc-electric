"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { MessageCircle, X, Send, Bot, User, Loader2 } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const knowledgeBase = {
  programs: [
    "Principios de Circuitos Electricos ($299, 40h)",
    "Instalaciones Electricas Avanzadas ($399, 60h)",
    "Doblado de Conductos Profesional ($249, 30h)",
    "Preparacion Examen Journeyman ($499, 80h)",
  ],
  services: [
    "Instalacion electrica residencial",
    "Interruptores y paneles",
    "GFCI installation",
    "Localizacion de fallas",
    "Cableado 3-way/4-way",
    "Tutoria electrica",
  ],
};

function getResponse(input: string, locale: string): string {
  const q = input.toLowerCase();
  const isEs = locale === "es";

  if (q.includes("program") || q.includes("curso") || q.includes("course") || q.includes("clases") || q.includes("train")) {
    return isEs
      ? `Tenemos 4 programas:\n\n${knowledgeBase.programs.join("\n")}\n\nPuede ver todos en /es/programas o agendar una consulta gratuita.`
      : `We have 4 programs:\n\n${knowledgeBase.programs.join("\n")}\n\nView all at /en/programas or schedule a free consultation.`;
  }

  if (q.includes("servicio") || q.includes("service") || q.includes("instalaci") || q.includes("install") || q.includes("repair") || q.includes("reparar")) {
    return isEs
      ? `Nuestros servicios incluyen:\n\n${knowledgeBase.services.join("\n")}\n\nContactanos para agendar o cotizar: info@cmcelectric.com`
      : `Our services include:\n\n${knowledgeBase.services.join("\n")}\n\nContact us to schedule: info@cmcelectric.com`;
  }

  if (q.includes("precio") || q.includes("price") || q.includes("cost") || q.includes("costo") || q.includes("$")) {
    return isEs
      ? "Nuestros programas van de $249 a $499 segun el nivel y duracion. Tambien ofrecemos planes de pago. Contactanos para mas detalles: info@cmcelectric.com"
      : "Our programs range from $249 to $499 depending on level and duration. Payment plans available. Contact us: info@cmcelectric.com";
  }

  if (q.includes("journeyman") || q.includes("examen") || q.includes("exam") || q.includes("licencia") || q.includes("license")) {
    return isEs
      ? "Nuestro programa de Preparacion para el Examen Journeyman ($499, 80h) te prepara completamente para el examen. Incluye pruebas de practica, revision de codigos NEC y guia experta."
      : "Our Journeyman Exam Prep program ($499, 80h) fully prepares you for the exam. Includes practice tests, NEC code review, and expert guidance.";
  }

  if (q.includes("contacto") || q.includes("contact") || q.includes("telefono") || q.includes("phone") || q.includes("whatsapp")) {
    return isEs
      ? "Puedes contactarnos por:\n\n- Email: info@cmcelectric.com\n- Telefono: +1 (555) 000-0000\n- WhatsApp: +1 (555) 000-0000\n- O agenda una cita en /es/agendar"
      : "You can reach us by:\n\n- Email: info@cmcelectric.com\n- Phone: +1 (555) 000-0000\n- WhatsApp: +1 (555) 000-0000\n- Or schedule at /en/agendar";
  }

  if (q.includes("horario") || q.includes("hours") || q.includes("schedule") || q.includes("agendar") || q.includes("cita")) {
    return isEs
      ? "Atendemos lunes a viernes de 8am a 6pm. Puedes agendar una consulta gratuita de 30 minutos en /es/agendar o por Calendly."
      : "We're available Mon-Fri 8am-6pm. You can schedule a free 30-min consultation at /en/agendar or via Calendly.";
  }

  if (q.includes("español") || q.includes("spanish") || q.includes("ingles") || q.includes("english") || q.includes("idioma") || q.includes("language")) {
    return isEs
      ? "Si, todos nuestros programas estan disponibles en Espanol e Ingles. Nuestros instructores son bilingues."
      : "Yes, all our programs are available in Spanish and English. Our instructors are fully bilingual.";
  }

  if (q.includes("student portal") || q.includes("portal") || q.includes("acceso") || q.includes("login") || q.includes("cuenta")) {
    return isEs
      ? "Una vez inscrito, recibes credenciales para el portal privado de estudiantes. Puedes acceder en /login para ver tus cursos, videos y materiales."
      : "Once enrolled, you receive credentials for the private student portal. Access it at /login to view your courses, videos, and materials.";
  }

  return isEs
    ? "Hola! Soy el asistente de CMC Electric. Puedo ayudarte con informacion sobre:\n\n- Programas y cursos\n- Servicios electricos\n- Precios\n- Agendar citas\n- Contacto\n\nEscribe tu pregunta."
    : "Hello! I'm the CMC Electric assistant. I can help with:\n\n- Programs and courses\n- Electrical services\n- Pricing\n- Scheduling\n- Contact info\n\nType your question.";
}

interface ChatBotProps {
  locale?: string;
}

export function ChatBot({ locale = "es" }: ChatBotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const isEs = locale === "es";

  const welcomeMsg = isEs
    ? "Hola! Soy el asistente virtual de CMC Electric. Como puedo ayudarte hoy?"
    : "Hello! I'm the CMC Electric virtual assistant. How can I help you today?";

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        { id: "welcome", role: "assistant", content: welcomeMsg },
      ]);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    // Simulate response delay
    await new Promise((r) => setTimeout(r, 800));

    const response = getResponse(userMsg.content, locale);
    setMessages((prev) => [
      ...prev,
      { id: (Date.now() + 1).toString(), role: "assistant", content: response },
    ]);
    setLoading(false);
  };

  return (
    <>
      {/* Toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "fixed bottom-6 left-6 z-40 h-14 w-14 flex items-center justify-center shadow-[0_4px_20px_rgba(0,0,0,0.5)] transition-all duration-300",
          isOpen
            ? "bg-[#1A1A1A] border border-[#2A2A2A] text-[#A0A0A0]"
            : "bg-[#FFD700] text-black hover:bg-[#FFC200]"
        )}
        aria-label="Toggle assistant"
      >
        {isOpen ? <X className="h-5 w-5" /> : <MessageCircle className="h-6 w-6" />}
      </button>

      {/* Chat window */}
      <div
        className={cn(
          "fixed bottom-24 left-6 z-40 w-80 md:w-96 bg-[#0A0A0A] border border-[#1A1A1A] shadow-[0_8px_40px_rgba(0,0,0,0.6)] flex flex-col transition-all duration-300 origin-bottom-left",
          isOpen ? "scale-100 opacity-100 pointer-events-auto" : "scale-95 opacity-0 pointer-events-none"
        )}
        style={{ maxHeight: "520px" }}
      >
        {/* Header */}
        <div className="flex items-center gap-3 p-4 border-b border-[#1A1A1A] bg-[#0F0F0F]">
          <div className="h-9 w-9 bg-[#FFD700]/10 border border-[#FFD700]/20 flex items-center justify-center flex-shrink-0">
            <Bot className="h-4 w-4 text-[#FFD700]" />
          </div>
          <div>
            <p className="text-sm font-mono font-bold text-white">
              {isEs ? "Asistente CMC" : "CMC Assistant"}
            </p>
            <div className="flex items-center gap-1.5">
              <div className="h-1.5 w-1.5 rounded-full bg-[#22C55E]" />
              <span className="text-[10px] font-mono text-[#606060]">Online</span>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="ml-auto text-[#606060] hover:text-white transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 min-h-0" style={{ maxHeight: "360px" }}>
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={cn(
                "flex gap-2.5",
                msg.role === "user" ? "flex-row-reverse" : "flex-row"
              )}
            >
              <div
                className={cn(
                  "h-7 w-7 flex items-center justify-center flex-shrink-0 border",
                  msg.role === "assistant"
                    ? "bg-[#FFD700]/10 border-[#FFD700]/20"
                    : "bg-white/5 border-white/10"
                )}
              >
                {msg.role === "assistant" ? (
                  <Bot className="h-3.5 w-3.5 text-[#FFD700]" />
                ) : (
                  <User className="h-3.5 w-3.5 text-[#A0A0A0]" />
                )}
              </div>
              <div
                className={cn(
                  "max-w-[80%] p-3 text-xs font-sans leading-relaxed whitespace-pre-line",
                  msg.role === "assistant"
                    ? "bg-[#141414] border border-[#1A1A1A] text-[#A0A0A0]"
                    : "bg-[#FFD700]/10 border border-[#FFD700]/20 text-white"
                )}
              >
                {msg.content}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex gap-2.5">
              <div className="h-7 w-7 flex items-center justify-center flex-shrink-0 border bg-[#FFD700]/10 border-[#FFD700]/20">
                <Bot className="h-3.5 w-3.5 text-[#FFD700]" />
              </div>
              <div className="bg-[#141414] border border-[#1A1A1A] p-3 flex items-center gap-1.5">
                <Loader2 className="h-3.5 w-3.5 animate-spin text-[#606060]" />
                <span className="text-xs text-[#606060] font-mono">
                  {isEs ? "Escribiendo..." : "Typing..."}
                </span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-3 border-t border-[#1A1A1A] flex items-center gap-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
            placeholder={isEs ? "Escribe tu pregunta..." : "Type your question..."}
            className="flex-1 h-9 bg-[#141414] border border-[#2A2A2A] px-3 text-xs font-mono text-white placeholder:text-[#404040] focus:outline-none focus:border-[#FFD700]"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || loading}
            className="h-9 w-9 flex items-center justify-center bg-[#FFD700] text-black disabled:opacity-40 hover:bg-[#FFC200] transition-all"
          >
            <Send className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </>
  );
}
