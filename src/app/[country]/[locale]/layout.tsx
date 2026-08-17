import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";

import "@/styles/globals.css";

import { fontVariables } from "@/app/fonts";
import { Footer } from "@/components/layout/Footer/Footer";
import { Header } from "@/components/layout/Header/Header";
import { LocaleProvider } from "@/components/providers/LocaleProvider";
import { countries, isValidPair, markets, type Country } from "@/config/markets";
import { dirFor, isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";

/*
 * This is the ROOT layout (official App Router i18n pattern: <html> lives in
 * the dynamic segment; every route is inside /[country]/[locale]).
 * Only the 4 valid pairs are generated; anything else 404s (docs/routing.md).
 */

export const dynamicParams = false;

export function generateStaticParams(): Array<{
  country: Country;
  locale: Locale;
}> {
  return countries.flatMap((country) =>
    markets[country].locales.map((locale) => ({ country, locale })),
  );
}

interface LayoutParams {
  params: Promise<{ country: string; locale: string }>;
}

export async function generateMetadata({
  params,
}: LayoutParams): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dictionary = await getDictionary(locale);
  return {
    title: {
      default: dictionary.home.title,
      template: `%s — ${dictionary.common.siteName}`,
    },
    description: dictionary.home.description,
  };
}

export default async function RootLayout({
  children,
  params,
}: LayoutParams & { children: ReactNode }) {
  const { country, locale } = await params;
  if (!isValidPair(country, locale)) notFound();

  const typedCountry = country as Country;
  const typedLocale = locale as Locale;
  const dir = dirFor(typedLocale);
  const dictionary = await getDictionary(typedLocale);

  return (
    <html lang={typedLocale} dir={dir} className={fontVariables}>
      <body>
        <LocaleProvider country={typedCountry} locale={typedLocale} dir={dir}>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-[200] focus:bg-background focus:px-4 focus:py-2 focus:text-accent"
          >
            {dictionary.common.skipToContent}
          </a>
          <Header
            country={typedCountry}
            locale={typedLocale}
            dictionary={dictionary}
          />
          <main id="main" className="min-h-[60svh]">
            {children}
          </main>
          <Footer
            country={typedCountry}
            locale={typedLocale}
            dictionary={dictionary}
          />
        </LocaleProvider>
      </body>
    </html>
  );
}
