import type { MetadataRoute } from "next";

import { countries, markets } from "@/config/markets";
import { site } from "@/config/site";

/*
 * Only valid /{country}/{locale} combinations are emitted (docs/routing.md).
 * Extend PAGES as inner pages are implemented in Phase 11.
 */
const PAGES = [""];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];
  for (const country of countries) {
    for (const locale of markets[country].locales) {
      for (const page of PAGES) {
        entries.push({
          url: `${site.baseUrl}/${country}/${locale}${page}`,
          lastModified: new Date(),
          changeFrequency: "weekly",
          priority: page === "" ? 1 : 0.7,
        });
      }
    }
  }
  return entries;
}
