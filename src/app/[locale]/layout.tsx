import type { Metadata } from "next";
import { JetBrains_Mono, Inter } from "next/font/google";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import { ChatBot } from "@/components/shared/ChatBot";
import { AuthProvider } from "@/components/shared/AuthProvider";
import { getDictionary, locales } from "@/i18n";
import type { Locale } from "@/types";
import "@/app/globals.css";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isEs = locale === "es";

  return {
    title: {
      default: "CMC Electric LLC — Professional Electrical Training",
      template: "%s | CMC Electric LLC",
    },
    description: isEs
      ? "Formacion electrica profesional en USA. Programas teorico-practicos para el examen Journeyman, instalaciones electricas y servicios residenciales."
      : "Professional electrical training in the USA. Theory and hands-on programs for the Journeyman exam, electrical installations, and residential services.",
    keywords: ["electrical training", "journeyman exam", "CMC Electric", "electrician", "electrical courses"],
    openGraph: {
      type: "website",
      locale: locale === "es" ? "es_US" : "en_US",
      siteName: "CMC Electric LLC",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  return (
    <html lang={locale} className={`${jetbrainsMono.variable} ${inter.variable}`}>
      <body className="bg-[#080808] text-white font-sans antialiased">
        <AuthProvider>
          <Navbar locale={locale} dict={dict as Parameters<typeof Navbar>[0]["dict"]} />
          <main>{children}</main>
          <Footer locale={locale} dict={dict as Parameters<typeof Footer>[0]["dict"]} />
          <WhatsAppButton />
          <ChatBot locale={locale} />
        </AuthProvider>
      </body>
    </html>
  );
}
