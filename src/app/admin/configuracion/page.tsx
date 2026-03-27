import { prisma } from "@/lib/db";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Settings, Save } from "lucide-react";

export default async function AdminConfig() {
  const configs = await prisma.siteConfig.findMany({ orderBy: { key: "asc" } });

  const configMap = new Map(configs.map((c) => [c.key, c.value]));

  return (
    <div className="p-6 md:p-8 pt-20 lg:pt-8">
      <div className="mb-8">
        <h1 className="text-3xl font-mono font-bold text-white tracking-tight mb-1">Configuration</h1>
        <p className="text-[#606060] font-sans text-sm">Site-wide settings and integrations</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Contact settings */}
        <div className="bg-[#0F0F0F] border border-[#1A1A1A] p-6">
          <h2 className="text-sm font-mono tracking-widest uppercase text-[#FFD700] mb-5">
            Contact Settings
          </h2>
          <div className="flex flex-col gap-4">
            {[
              { key: "whatsapp", label: "WhatsApp Number" },
              { key: "phone", label: "Phone" },
              { key: "email", label: "Email" },
              { key: "address", label: "Address" },
            ].map((field) => (
              <div key={field.key} className="flex flex-col gap-1.5">
                <label className="text-[10px] font-mono tracking-widest uppercase text-[#606060]">
                  {field.label}
                </label>
                <div className="flex items-center gap-2 px-4 h-10 bg-[#141414] border border-[#2A2A2A] font-mono text-sm text-[#A0A0A0]">
                  {configMap.get(field.key) || "Not configured"}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Integration settings */}
        <div className="bg-[#0F0F0F] border border-[#1A1A1A] p-6">
          <h2 className="text-sm font-mono tracking-widest uppercase text-[#FFD700] mb-5">
            Integrations
          </h2>
          <div className="flex flex-col gap-4">
            {[
              { key: "calendly_url", label: "Calendly URL" },
              { key: "maps_embed", label: "Google Maps URL" },
              { key: "facebook", label: "Facebook URL" },
              { key: "instagram", label: "Instagram URL" },
              { key: "fb_pixel_id", label: "Facebook Pixel ID" },
            ].map((field) => (
              <div key={field.key} className="flex flex-col gap-1.5">
                <label className="text-[10px] font-mono tracking-widest uppercase text-[#606060]">
                  {field.label}
                </label>
                <div className="flex items-center gap-2 px-4 h-10 bg-[#141414] border border-[#2A2A2A] font-mono text-xs text-[#A0A0A0] overflow-hidden">
                  <span className="truncate">{configMap.get(field.key) || "Not configured"}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Info box */}
        <div className="lg:col-span-2 bg-[#FFD700]/5 border border-[#FFD700]/20 p-5">
          <div className="flex items-start gap-3">
            <Settings className="h-5 w-5 text-[#FFD700] flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-mono font-bold text-[#FFD700] mb-1">Configuration Note</p>
              <p className="text-xs text-[#A0A0A0] font-sans leading-relaxed">
                To edit these values, update them directly in the database or through the API.
                A full CMS editor for these settings will be available in the next phase.
                Sensitive values like API keys should be configured via environment variables.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
