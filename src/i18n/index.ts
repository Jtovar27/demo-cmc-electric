import type { Locale } from "@/types";

const dictionaries = {
  en: () => import("./locales/en.json").then((m) => m.default),
  es: () => import("./locales/es.json").then((m) => m.default),
};

export const getDictionary = async (locale: Locale) => {
  return dictionaries[locale]?.() ?? dictionaries.en();
};

export const locales: Locale[] = ["en", "es"];
export const defaultLocale: Locale = "es";
