"use client";

import { MessageCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface WhatsAppButtonProps {
  phone?: string;
  message?: string;
}

export function WhatsAppButton({
  phone = "15550000000",
  message = "Hello! I'm interested in CMC Electric training programs.",
}: WhatsAppButtonProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  const url = `https://wa.me/${phone.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "fixed bottom-6 right-6 z-40 flex items-center gap-3 bg-[#25D366] text-white px-4 py-3 shadow-[0_4px_20px_rgba(37,211,102,0.4)] transition-all duration-500 group",
        visible ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"
      )}
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="h-5 w-5 flex-shrink-0" />
      <span className="text-xs font-mono tracking-wider uppercase font-medium hidden sm:block">
        WhatsApp
      </span>
    </a>
  );
}
