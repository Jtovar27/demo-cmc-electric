import { NextRequest, NextResponse } from "next/server";

const locales = ["es", "en"];
const defaultLocale = "es";

function getLocale(request: NextRequest): string {
  const acceptLanguage = request.headers.get("accept-language") || "";
  const preferred = acceptLanguage.split(",")[0]?.split("-")[0]?.toLowerCase();
  return locales.includes(preferred) ? preferred : defaultLocale;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip API, static files, auth routes, portals
  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/login") ||
    pathname.startsWith("/student") ||
    pathname.startsWith("/admin") ||
    pathname.includes(".") ||
    pathname === "/favicon.ico"
  ) {
    return NextResponse.next();
  }

  // Check if pathname already has a locale
  const hasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );

  if (!hasLocale) {
    const locale = getLocale(request);
    const url = request.nextUrl.clone();
    url.pathname = `/${locale}${pathname}`;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
