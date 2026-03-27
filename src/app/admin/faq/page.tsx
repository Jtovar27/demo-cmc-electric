import Link from "next/link";
import { prisma } from "@/lib/db";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Plus, Edit, HelpCircle } from "lucide-react";

export default async function AdminFAQ() {
  const faqs = await prisma.fAQ.findMany({ orderBy: { order: "asc" } });

  return (
    <div className="p-6 md:p-8 pt-20 lg:pt-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-mono font-bold text-white tracking-tight mb-1">FAQ</h1>
          <p className="text-[#606060] font-sans text-sm">{faqs.length} questions</p>
        </div>
        <Button variant="primary" size="md" icon={<Plus className="h-4 w-4" />}>
          Add Question
        </Button>
      </div>

      {faqs.length === 0 ? (
        <div className="bg-[#0F0F0F] border border-[#1A1A1A] p-12 text-center">
          <HelpCircle className="h-12 w-12 text-[#2A2A2A] mx-auto mb-4" />
          <p className="text-[#606060] font-mono">No FAQ items yet</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {faqs.map((faq) => (
            <div key={faq.id} className="bg-[#0F0F0F] border border-[#1A1A1A] p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    {faq.category && (
                      <Badge variant="muted" size="sm">{faq.category}</Badge>
                    )}
                    <span className="text-[10px] font-mono text-[#404040]">Order: {faq.order}</span>
                  </div>
                  <h3 className="text-sm font-mono font-bold text-white mb-2">
                    EN: {faq.question}
                  </h3>
                  <p className="text-xs font-mono text-[#A0A0A0] mb-3">
                    ES: {faq.questionEs}
                  </p>
                  <p className="text-xs text-[#606060] font-sans line-clamp-2">{faq.answer}</p>
                </div>
                <Button variant="outline" size="sm" icon={<Edit className="h-3.5 w-3.5" />}>
                  Edit
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
