import Link from "next/link";
import { Logo } from "./Logo";
import { Phone, Mail, MapPin } from "lucide-react";

const FacebookIcon = () => (
  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
  </svg>
);

const InstagramIcon = () => (
  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
  </svg>
);

const YoutubeIcon = () => (
  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

interface FooterProps {
  locale: string;
  dict: {
    footer: Record<string, string>;
    nav: Record<string, string>;
  };
}

export function Footer({ locale, dict }: FooterProps) {
  const year = new Date().getFullYear();

  const quickLinks = [
    { key: "home", href: `/${locale}` },
    { key: "about", href: `/${locale}/nosotros` },
    { key: "programs", href: `/${locale}/programas` },
    { key: "services", href: `/${locale}/servicios` },
    { key: "gallery", href: `/${locale}/galeria` },
    { key: "blog", href: `/${locale}/blog` },
  ];

  const contactLinks = [
    { key: "faq", href: `/${locale}/faq` },
    { key: "contact", href: `/${locale}/contacto` },
    { key: "schedule", href: `/${locale}/agendar` },
  ];

  return (
    <footer className="bg-[#080808] border-t border-[#1A1A1A]">
      {/* Yellow top bar */}
      <div className="h-0.5 bg-gradient-to-r from-transparent via-[#FFD700] to-transparent" />

      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Main footer */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand column */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <Logo size="lg" href={`/${locale}`} />
            <p className="text-[#606060] text-sm leading-relaxed font-sans max-w-sm">
              {dict.footer.description}
            </p>
            {/* Social */}
            <div className="flex items-center gap-3">
              <a
                href="https://facebook.com/cmcelectric"
                target="_blank"
                rel="noopener noreferrer"
                className="h-9 w-9 flex items-center justify-center border border-[#1A1A1A] text-[#606060] hover:text-[#FFD700] hover:border-[#FFD700]/30 transition-all duration-200"
                aria-label="Facebook"
              >
                <FacebookIcon />
              </a>
              <a
                href="https://instagram.com/cmcelectric"
                target="_blank"
                rel="noopener noreferrer"
                className="h-9 w-9 flex items-center justify-center border border-[#1A1A1A] text-[#606060] hover:text-[#FFD700] hover:border-[#FFD700]/30 transition-all duration-200"
                aria-label="Instagram"
              >
                <InstagramIcon />
              </a>
              <a
                href="https://youtube.com/@cmcelectric"
                target="_blank"
                rel="noopener noreferrer"
                className="h-9 w-9 flex items-center justify-center border border-[#1A1A1A] text-[#606060] hover:text-[#FFD700] hover:border-[#FFD700]/30 transition-all duration-200"
                aria-label="YouTube"
              >
                <YoutubeIcon />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-5">
            <h4 className="text-xs font-mono tracking-[0.2em] text-[#FFD700] uppercase">
              {dict.footer.quick_links}
            </h4>
            <nav className="flex flex-col gap-2">
              {quickLinks.map((link) => (
                <Link
                  key={link.key}
                  href={link.href}
                  className="text-sm text-[#606060] hover:text-white transition-colors font-mono tracking-wide flex items-center gap-2 group"
                >
                  <span className="h-px w-4 bg-[#2A2A2A] group-hover:bg-[#FFD700] group-hover:w-6 transition-all duration-300" />
                  {dict.nav[link.key]}
                </Link>
              ))}
              {contactLinks.map((link) => (
                <Link
                  key={link.key}
                  href={link.href}
                  className="text-sm text-[#606060] hover:text-white transition-colors font-mono tracking-wide flex items-center gap-2 group"
                >
                  <span className="h-px w-4 bg-[#2A2A2A] group-hover:bg-[#FFD700] group-hover:w-6 transition-all duration-300" />
                  {dict.nav[link.key]}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-5">
            <h4 className="text-xs font-mono tracking-[0.2em] text-[#FFD700] uppercase">
              {dict.footer.contact_title}
            </h4>
            <div className="flex flex-col gap-4">
              <a
                href="tel:+15550000000"
                className="flex items-start gap-3 text-[#606060] hover:text-white transition-colors group"
              >
                <Phone className="h-4 w-4 mt-0.5 flex-shrink-0 group-hover:text-[#FFD700] transition-colors" />
                <span className="text-sm font-mono">+1 (555) 000-0000</span>
              </a>
              <a
                href="mailto:info@cmcelectric.com"
                className="flex items-start gap-3 text-[#606060] hover:text-white transition-colors group"
              >
                <Mail className="h-4 w-4 mt-0.5 flex-shrink-0 group-hover:text-[#FFD700] transition-colors" />
                <span className="text-sm font-mono">info@cmcelectric.com</span>
              </a>
              <div className="flex items-start gap-3 text-[#606060]">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span className="text-sm font-mono">United States</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-6 border-t border-[#1A1A1A] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs font-mono text-[#404040]">
            &copy; {year} CMC Electric LLC. {dict.footer.rights}
          </p>
          <div className="flex items-center gap-6">
            <Link
              href={`/${locale}/privacy`}
              className="text-xs font-mono text-[#404040] hover:text-[#A0A0A0] transition-colors"
            >
              {dict.footer.privacy}
            </Link>
            <Link
              href={`/${locale}/terms`}
              className="text-xs font-mono text-[#404040] hover:text-[#A0A0A0] transition-colors"
            >
              {dict.footer.terms}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
