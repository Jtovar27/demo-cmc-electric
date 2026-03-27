export default async function TermsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isEs = locale === "es";
  return (
    <div className="bg-[#080808] pt-20 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-mono font-bold text-white mb-8">{isEs ? "Terminos de Servicio" : "Terms of Service"}</h1>
        <div className="prose prose-invert font-sans text-[#A0A0A0] leading-relaxed space-y-4">
          <p>{isEs ? "Ultima actualizacion: Enero 2024" : "Last updated: January 2024"}</p>
          <p>{isEs ? "Al usar la plataforma de CMC Electric LLC, aceptas los siguientes terminos y condiciones." : "By using the CMC Electric LLC platform, you agree to the following terms and conditions."}</p>
          <h2 className="text-white font-mono text-xl mt-6">{isEs ? "Uso del servicio" : "Use of Service"}</h2>
          <p>{isEs ? "El acceso a los cursos es personal e intransferible. No puedes compartir tus credenciales ni distribuir el contenido de los programas." : "Course access is personal and non-transferable. You may not share your credentials or distribute program content."}</p>
          <h2 className="text-white font-mono text-xl mt-6">{isEs ? "Pagos y reembolsos" : "Payments and Refunds"}</h2>
          <p>{isEs ? "Los pagos son procesados de forma segura. Contamos con una politica de reembolso de 7 dias desde la inscripcion." : "Payments are processed securely. We offer a 7-day refund policy from enrollment date."}</p>
          <h2 className="text-white font-mono text-xl mt-6">{isEs ? "Contacto" : "Contact"}</h2>
          <p>info@cmcelectric.com</p>
        </div>
      </div>
    </div>
  );
}
