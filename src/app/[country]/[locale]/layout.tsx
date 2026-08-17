import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";

import "@/styles/globals.css";

import { fontVariables } from "@/app/fonts";
import { Footer } from "@/components/layout/Footer/Footer";
import { Header } from "@/components/layout/Header/Header";
import { LocaleProvider } from "@/components/providers/LocaleProvider";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { countries, isValidPair, markets, type Country } from "@/config/markets";
import { site } from "@/config/site";
import { dirFor, type Locale } from "@/i18n/config";
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

const OG_LOCALES: Record<string, string> = {
  "ae:en": "en_AE",
  "ae:ar": "ar_AE",
  "eg:en": "en_EG",
  "eg:ar": "ar_EG",
};

export async function generateMetadata({
  params,
}: LayoutParams): Promise<Metadata> {
  const { country, locale } = await params;
  if (!isValidPair(country, locale)) return {};
  const dictionary = await getDictionary(locale as Locale);

  // Region-qualified hreflang only — bare en/ar keys would collide across
  // the two markets (docs/routing.md §SEO)
  const languages: Record<string, string> = {};
  for (const c of countries) {
    for (const l of markets[c].locales) {
      languages[`${l}-${c.toUpperCase()}`] = `${site.baseUrl}/${c}/${l}`;
    }
  }
  languages["x-default"] = `${site.baseUrl}/ae/en`;

  return {
    metadataBase: new URL(site.baseUrl),
    title: {
      default: dictionary.home.title,
      template: `%s — ${dictionary.common.siteName}`,
    },
    description: dictionary.home.description,
    alternates: {
      canonical: `${site.baseUrl}/${country}/${locale}`,
      languages,
    },
    openGraph: {
      type: "website",
      siteName: dictionary.common.siteName,
      title: dictionary.home.title,
      description: dictionary.home.description,
      url: `${site.baseUrl}/${country}/${locale}`,
      locale: OG_LOCALES[`${country}:${locale}`],
      images: [{ url: "/images/og.png", width: 2004, height: 1046 }],
    },
    twitter: {
      card: "summary_large_image",
      title: dictionary.home.title,
      description: dictionary.home.description,
      images: ["/images/og.png"],
    },
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
        {/* Gates the reveal-hidden state on scripting (globals.css .js .reveal) */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
        <LocaleProvider country={typedCountry} locale={typedLocale} dir={dir}>
          <SmoothScroll />
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
