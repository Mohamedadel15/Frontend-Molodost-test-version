"use client";

import { createContext, useContext, useEffect, type ReactNode } from "react";

import type { Country } from "@/config/markets";
import type { Direction, Locale } from "@/i18n/config";
import { savePreferences } from "@/lib/preferences";

interface LocaleContextValue {
  country: Country;
  locale: Locale;
  dir: Direction;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({
  country,
  locale,
  dir,
  children,
}: LocaleContextValue & { children: ReactNode }) {
  /*
   * Persist the visited pair on every page view so entry URLs ("/", the 404
   * page's home link, bare "/ae" or "/en") resolve to the visitor's last
   * country/language rather than the defaults (docs/routing.md §Proxy).
   */
  useEffect(() => {
    savePreferences(country, locale);
  }, [country, locale]);

  return (
    <LocaleContext.Provider value={{ country, locale, dir }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocaleContext(): LocaleContextValue {
  const value = useContext(LocaleContext);
  if (!value) {
    throw new Error("useLocaleContext must be used within LocaleProvider");
  }
  return value;
}
