"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/Button";
import {
  Menu,
  X,
  Globe,
  ChevronDown,
  GraduationCap,
} from "lucide-react";

interface NavbarProps {
  locale: string;
  dict: {
    nav: Record<string, string>;
    auth: { sign_in: string };
  };
}

const navLinks = (locale: string) => [
  { key: "home", href: `/${locale}` },
  { key: "about", href: `/${locale}/nosotros` },
  { key: "programs", href: `/${locale}/programas` },
  { key: "services", href: `/${locale}/servicios` },
  { key: "gallery", href: `/${locale}/galeria` },
  { key: "blog", href: `/${locale}/blog` },
  { key: "faq", href: `/${locale}/faq` },
  { key: "contact", href: `/${locale}/contacto` },
];

export function Navbar({ locale, dict }: NavbarProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const otherLocale = locale === "es" ? "en" : "es";
  const otherLocalePath = pathname.replace(`/${locale}`, `/${otherLocale}`);

  const links = navLinks(locale);

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-[#080808]/95 backdrop-blur-md border-b border-[#1A1A1A] shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
            : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-18">
            {/* Logo */}
            <Logo href={`/${locale}`} />

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {links.map((link) => {
                const isActive = pathname === link.href ||
                  (link.href !== `/${locale}` && pathname.startsWith(link.href));
                return (
                  <Link
                    key={link.key}
                    href={link.href}
                    className={cn(
                      "px-3 py-2 text-[11px] font-mono tracking-widest uppercase transition-all duration-200",
                      isActive
                        ? "text-[#FFD700]"
                        : "text-[#A0A0A0] hover:text-white"
                    )}
                  >
                    {dict.nav[link.key]}
                  </Link>
                );
              })}
            </div>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-3">
              <Link
                href={otherLocalePath}
                className="flex items-center gap-1.5 text-[11px] font-mono tracking-widest uppercase text-[#606060] hover:text-[#FFD700] transition-colors duration-200"
              >
                <Globe className="h-3.5 w-3.5" />
                {otherLocale.toUpperCase()}
              </Link>
              <Link href={`/${locale}/agendar`}>
                <Button variant="outline" size="sm">
                  {dict.nav.schedule}
                </Button>
              </Link>
              <Link href="/login">
                <Button variant="primary" size="sm" icon={<GraduationCap className="h-3.5 w-3.5" />}>
                  {dict.auth.sign_in}
                </Button>
              </Link>
            </div>

            {/* Mobile Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 text-[#A0A0A0] hover:text-white transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={cn(
          "fixed inset-0 z-40 lg:hidden transition-all duration-300",
          isOpen ? "visible opacity-100" : "invisible opacity-0"
        )}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />

        {/* Menu Panel */}
        <div
          className={cn(
            "absolute top-0 right-0 h-full w-80 bg-[#080808] border-l border-[#1A1A1A] flex flex-col transition-transform duration-300",
            isOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-5 border-b border-[#1A1A1A]">
            <Logo size="sm" href={`/${locale}`} />
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 text-[#606060] hover:text-white transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Links */}
          <nav className="flex-1 overflow-y-auto p-5">
            <div className="flex flex-col gap-1">
              {links.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.key}
                    href={link.href}
                    className={cn(
                      "flex items-center px-4 py-3 text-sm font-mono tracking-widest uppercase border-l-2 transition-all duration-200",
                      isActive
                        ? "border-[#FFD700] text-[#FFD700] bg-[#FFD700]/5"
                        : "border-transparent text-[#A0A0A0] hover:text-white hover:border-white/20"
                    )}
                  >
                    {dict.nav[link.key]}
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* Footer Actions */}
          <div className="p-5 border-t border-[#1A1A1A] flex flex-col gap-3">
            <Link href={`/${locale}/agendar`} className="w-full">
              <Button variant="outline" size="md" className="w-full">
                {dict.nav.schedule}
              </Button>
            </Link>
            <Link href="/login" className="w-full">
              <Button variant="primary" size="md" className="w-full" icon={<GraduationCap className="h-4 w-4" />}>
                {dict.auth.sign_in}
              </Button>
            </Link>
            <Link
              href={otherLocalePath}
              className="flex items-center justify-center gap-2 text-xs font-mono tracking-widest uppercase text-[#606060] hover:text-[#FFD700] transition-colors py-2"
            >
              <Globe className="h-3.5 w-3.5" />
              Switch to {otherLocale.toUpperCase()}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
