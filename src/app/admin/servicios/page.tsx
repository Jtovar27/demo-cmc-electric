import { prisma } from "@/lib/db";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Plus, Edit, Wrench } from "lucide-react";

export default async function AdminServices() {
  const services = await prisma.service.findMany({ orderBy: [{ featured: "desc" }, { order: "asc" }] });

  return (
    <div className="p-6 md:p-8 pt-20 lg:pt-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-mono font-bold text-white tracking-tight mb-1">Services</h1>
          <p className="text-[#606060] font-sans text-sm">{services.length} services</p>
        </div>
        <Button variant="primary" size="md" icon={<Plus className="h-4 w-4" />}>Add Service</Button>
      </div>

      {services.length === 0 ? (
        <div className="bg-[#0F0F0F] border border-[#1A1A1A] p-12 text-center">
          <Wrench className="h-12 w-12 text-[#2A2A2A] mx-auto mb-4" />
          <p className="text-[#606060] font-mono">No services yet</p>
        </div>
      ) : (
        <div className="bg-[#0F0F0F] border border-[#1A1A1A] overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#1A1A1A]">
                {["Service", "Category", "Featured", "Order", ""].map((h) => (
                  <th key={h} className="text-left px-5 py-4 text-[10px] font-mono tracking-widest uppercase text-[#606060]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {services.map((s) => (
                <tr key={s.id} className="border-b border-[#141414] table-row-hover">
                  <td className="px-5 py-4">
                    <div>
                      <p className="text-sm font-mono font-bold text-white">{s.title}</p>
                      <p className="text-[10px] font-mono text-[#606060] line-clamp-1">{s.description}</p>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    {s.category && <Badge variant="muted" size="sm">{s.category}</Badge>}
                  </td>
                  <td className="px-5 py-4">
                    {s.featured ? <Badge variant="yellow" size="sm">Yes</Badge> : <span className="text-xs text-[#606060] font-mono">No</span>}
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-xs font-mono text-[#606060]">{s.order}</span>
                  </td>
                  <td className="px-5 py-4">
                    <Button variant="outline" size="sm" icon={<Edit className="h-3.5 w-3.5" />}>Edit</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
