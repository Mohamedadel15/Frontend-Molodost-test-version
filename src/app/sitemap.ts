import type { MetadataRoute } from "next";

import { countries, markets } from "@/config/markets";
import { site } from "@/config/site";
import { articles } from "@/content/articles";
import { specialists } from "@/content/specialists";
import { storyFeatures } from "@/content/stories";

/*
 * Only valid /{country}/{locale} combinations are emitted (docs/routing.md).
 * Detail pages are derived from the content modules so the sitemap stays in
 * sync with generateStaticParams.
 */
const PAGES = [
  "",
  "/about",
  "/services",
  "/specialists",
  ...specialists.map((specialist) => `/specialists/${specialist.id}`),
  "/stories",
  ...storyFeatures.map((story) => `/stories/${story.id}`),
  "/journal",
  ...articles.map((article) => `/journal/${article.id}`),
  "/prices",
  "/book-a-session",
  "/privacy-policy",
  "/terms-of-use",
];

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
