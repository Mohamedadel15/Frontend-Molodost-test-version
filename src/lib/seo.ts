import type { Metadata } from "next";

import { countries, markets, type Country } from "@/config/markets";
import { site } from "@/config/site";
import type { Locale } from "@/i18n/config";

interface PageMetadataInput {
  country: Country;
  locale: Locale;
  /** Site-relative path without the market prefix, e.g. "/services". */
  path: string;
  title: string;
  description: string;
}

/**
 * Per-page metadata: canonical + region-qualified hreflang + OG scoped to the
 * page path (the layout only covers the market root — docs/routing.md §SEO).
 * The title is plain — the layout template appends the site name.
 */
export function pageMetadata({
  country,
  locale,
  path,
  title,
  description,
}: PageMetadataInput): Metadata {
  const languages: Record<string, string> = {};
  for (const c of countries) {
    for (const l of markets[c].locales) {
      languages[`${l}-${c.toUpperCase()}`] = `${site.baseUrl}/${c}/${l}${path}`;
    }
  }
  languages["x-default"] = `${site.baseUrl}/ae/en${path}`;

  const url = `${site.baseUrl}/${country}/${locale}${path}`;

  return {
    title,
    description,
    alternates: { canonical: url, languages },
    openGraph: { title, description, url },
    twitter: { title, description },
  };
}
