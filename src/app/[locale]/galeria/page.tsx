import Image from "next/image";
import { getDictionary } from "@/i18n";
import type { Locale } from "@/types";
import { Badge } from "@/components/ui/Badge";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return { title: locale === "es" ? "Galeria" : "Gallery" };
}

const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800&auto=format&fit=crop&q=80",
    alt: "Electrical panel installation",
    altEs: "Instalacion de panel electrico",
    category: "installation",
    span: "col-span-2 row-span-2",
  },
  {
    src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&auto=format&fit=crop&q=80",
    alt: "Circuit breaker work",
    altEs: "Trabajo con interruptores",
    category: "service",
    span: "",
  },
  {
    src: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&auto=format&fit=crop&q=80",
    alt: "Conduit bending training",
    altEs: "Entrenamiento de doblado de conductos",
    category: "training",
    span: "",
  },
  {
    src: "https://images.unsplash.com/photo-1486304873000-235643847519?w=600&auto=format&fit=crop&q=80",
    alt: "Electrical outlet installation",
    altEs: "Instalacion de toma electrica",
    category: "installation",
    span: "",
  },
  {
    src: "https://images.unsplash.com/photo-1613665813446-82a78c468a1d?w=600&auto=format&fit=crop&q=80",
    alt: "Wiring and circuits",
    altEs: "Cableado y circuitos",
    category: "training",
    span: "",
  },
  {
    src: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&auto=format&fit=crop&q=80",
    alt: "Educational training session",
    altEs: "Sesion de formacion educativa",
    category: "education",
    span: "",
  },
  {
    src: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&auto=format&fit=crop&q=80",
    alt: "Student studying electrical theory",
    altEs: "Estudiante estudiando teoria electrica",
    category: "education",
    span: "col-span-2",
  },
];

export default async function GaleriaPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const isEs = locale === "es";

  return (
    <div className="bg-[#080808] pt-20">
      {/* Header */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 grid-overlay opacity-40" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FFD700]/30 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-3xl">
            <Badge variant="yellow" className="mb-6">{dict.gallery.badge}</Badge>
            <h1 className="text-5xl md:text-6xl font-mono font-bold tracking-tight text-white leading-tight mb-6">
              {dict.gallery.title}{" "}
              <span className="text-gradient">{dict.gallery.titleHighlight}</span>
            </h1>
            <p className="text-[#A0A0A0] text-xl leading-relaxed font-sans">{dict.gallery.subtitle}</p>
          </div>
        </div>
      </section>

      {/* Gallery grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 auto-rows-[220px]">
            {galleryImages.map((img, i) => (
              <div
                key={i}
                className={`relative overflow-hidden bg-[#141414] border border-[#1A1A1A] group cursor-pointer ${img.span}`}
              >
                <Image
                  src={img.src}
                  alt={isEs ? img.altEs : img.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-xs font-mono text-white tracking-wide">
                    {isEs ? img.altEs : img.alt}
                  </p>
                </div>
                <div className="absolute top-3 right-3">
                  <Badge variant="yellow" size="sm">{img.category}</Badge>
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-xs font-mono text-[#404040] mt-8">
            {isEs
              ? "Imagenes representativas. Activos finales seran proporcionados por el cliente."
              : "Representative images. Final assets will be provided by the client."}
          </p>
        </div>
      </section>
    </div>
  );
}
