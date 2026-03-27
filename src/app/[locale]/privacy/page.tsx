export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isEs = locale === "es";
  return (
    <div className="bg-[#080808] pt-20 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-mono font-bold text-white mb-8">{isEs ? "Politica de Privacidad" : "Privacy Policy"}</h1>
        <div className="prose prose-invert font-sans text-[#A0A0A0] leading-relaxed space-y-4">
          <p>{isEs ? "Ultima actualizacion: Enero 2024" : "Last updated: January 2024"}</p>
          <p>{isEs ? "CMC Electric LLC respeta tu privacidad. Esta politica describe como recopilamos, usamos y protegemos tu informacion personal cuando usas nuestros servicios y plataforma educativa." : "CMC Electric LLC respects your privacy. This policy describes how we collect, use, and protect your personal information when you use our services and educational platform."}</p>
          <h2 className="text-white font-mono text-xl mt-6">{isEs ? "Informacion que recopilamos" : "Information We Collect"}</h2>
          <p>{isEs ? "Recopilamos nombre, correo electronico y datos de uso de la plataforma para proveer nuestros servicios educativos." : "We collect name, email address, and platform usage data to provide our educational services."}</p>
          <h2 className="text-white font-mono text-xl mt-6">{isEs ? "Uso de la informacion" : "Use of Information"}</h2>
          <p>{isEs ? "Usamos tu informacion unicamente para gestionar tu cuenta, darte acceso a los cursos y mejorar la plataforma." : "We use your information only to manage your account, provide course access, and improve the platform."}</p>
          <h2 className="text-white font-mono text-xl mt-6">{isEs ? "Contacto" : "Contact"}</h2>
          <p>info@cmcelectric.com</p>
        </div>
      </div>
    </div>
  );
}
