"use client";

import { useState } from "react";
import Link from "next/link";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { Plus, Minus } from "lucide-react";

interface FAQ {
  id: string;
  question: string;
  questionEs: string;
  answer: string;
  answerEs: string;
}

interface FAQSectionProps {
  locale: string;
  dict: {
    faq: Record<string, string>;
  };
  faqs: FAQ[];
}

export function FAQSection({ locale, dict, faqs }: FAQSectionProps) {
  const { faq } = dict;
  const isEs = locale === "es";
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id || null);

  return (
    <section className="py-24 bg-[#080808] relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#1A1A1A] to-transparent" />

      <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8">
        <SectionHeader
          badge={faq.badge}
          title={faq.title}
          titleHighlight={faq.titleHighlight}
          subtitle={faq.subtitle}
          align="center"
          className="mb-16"
        />

        <div className="flex flex-col gap-2">
          {faqs.map((item) => {
            const isOpen = openId === item.id;
            const question = isEs ? item.questionEs : item.question;
            const answer = isEs ? item.answerEs : item.answer;

            return (
              <div
                key={item.id}
                className={cn(
                  "border transition-all duration-300",
                  isOpen
                    ? "border-[#FFD700]/30 bg-[#0F0F0F]"
                    : "border-[#1A1A1A] bg-[#0A0A0A] hover:border-[#2A2A2A]"
                )}
              >
                <button
                  onClick={() => setOpenId(isOpen ? null : item.id)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span
                    className={cn(
                      "text-sm font-mono font-medium tracking-wide leading-snug",
                      isOpen ? "text-[#FFD700]" : "text-white"
                    )}
                  >
                    {question}
                  </span>
                  <span
                    className={cn(
                      "flex-shrink-0 h-7 w-7 flex items-center justify-center border transition-all duration-300",
                      isOpen
                        ? "border-[#FFD700]/30 bg-[#FFD700]/10 text-[#FFD700]"
                        : "border-[#2A2A2A] text-[#606060]"
                    )}
                  >
                    {isOpen ? (
                      <Minus className="h-3.5 w-3.5" />
                    ) : (
                      <Plus className="h-3.5 w-3.5" />
                    )}
                  </span>
                </button>

                {isOpen && (
                  <div className="px-6 pb-5">
                    <div className="h-px bg-[#1A1A1A] mb-4" />
                    <p className="text-sm text-[#A0A0A0] leading-relaxed font-sans">
                      {answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center flex flex-col items-center gap-4">
          <p className="text-sm font-mono text-[#606060]">
            {faq.still_questions}
          </p>
          <Link href={`/${locale}/contacto`}>
            <Button variant="secondary" size="md">
              {faq.contact_us}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
