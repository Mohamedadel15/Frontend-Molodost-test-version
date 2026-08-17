export const locales = ["en", "ar"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

const rtlLocales: ReadonlySet<Locale> = new Set(["ar"]);

export type Direction = "ltr" | "rtl";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function dirFor(locale: Locale): Direction {
  return rtlLocales.has(locale) ? "rtl" : "ltr";
}
