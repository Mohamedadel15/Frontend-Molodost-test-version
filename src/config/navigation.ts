import type { Dictionary } from "@/types/dictionary";

export interface NavItem {
  /** Key into dictionary.navigation */
  key: keyof Dictionary["navigation"]["links"];
  /** Site-relative path (country/locale prefix added by localePath) */
  path: string;
}

/** Header navigation (design-inventory §6) */
export const headerNav: readonly NavItem[] = [
  { key: "about", path: "/about" },
  { key: "services", path: "/services" },
  { key: "specialists", path: "/specialists" },
  { key: "stories", path: "/stories" },
];

export const headerCta: NavItem = { key: "bookASession", path: "/book-a-session" };

/** Footer sitemap columns (design-inventory §10) */
export const footerSitemap: readonly (readonly NavItem[])[] = [
  [
    { key: "home", path: "/" },
    { key: "about", path: "/about" },
    { key: "services", path: "/services" },
    { key: "specialists", path: "/specialists" },
    { key: "stories", path: "/stories" },
  ],
  [
    { key: "prices", path: "/prices" },
    { key: "journal", path: "/journal" },
    { key: "article", path: "/journal/the-5d-longevity-framework" },
    { key: "privacyPolicy", path: "/privacy-policy" },
    { key: "termsOfUse", path: "/terms-of-use" },
  ],
];
