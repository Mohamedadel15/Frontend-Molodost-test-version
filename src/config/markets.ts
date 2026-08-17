import { type Locale, isLocale } from "@/i18n/config";

export const countries = ["ae", "eg"] as const;

export type Country = (typeof countries)[number];

export const defaultCountry: Country = "ae";

export interface MarketContact {
  email: string;
  /** E.164, also used for the tel: link */
  phone?: string;
  /** wa.me target, digits only */
  whatsapp?: string;
  instagram?: string;
  threads?: string;
  facebook?: string;
}

export interface Market {
  code: Country;
  locales: readonly Locale[];
  defaultLocale: Locale;
  currency: "AED" | "EGP";
  phoneCountryCode: string;
  contact: MarketContact;
  /** Google Maps embed src for the contact section. */
  mapEmbedUrl?: string;
}

/**
 * The ONLY registry of markets. No other module may hardcode country or
 * locale lists (docs/routing.md).
 */
export const markets: Record<Country, Market> = {
  ae: {
    code: "ae",
    locales: ["en", "ar"],
    defaultLocale: "en",
    currency: "AED",
    phoneCountryCode: "+971",
    contact: {
      // Measured from the reference site (design-inventory §16)
      email: "hello@molodostlongevity.com",
      phone: "+971504023211",
      whatsapp: "971504023211",
      instagram: "https://www.instagram.com/molodost.dubai",
      threads: "https://www.threads.com/@molodost.dubai",
      facebook: "https://www.facebook.com/share/18NggSWpHC",
    },
    // Reference shows the Dubai Marina / JLT area (design-inventory §16)
    mapEmbedUrl: "https://www.google.com/maps?q=Dubai+Marina&output=embed",
  },
  eg: {
    code: "eg",
    locales: ["en", "ar"],
    defaultLocale: "en",
    currency: "EGP",
    phoneCountryCode: "+20",
    contact: {
      // Egypt channels are not published on the reference site — the AE
      // channels are used as placeholders until client data arrives
      // (design-inventory §17, Open Questions #2)
      email: "hello@molodostlongevity.com",
      phone: "+971504023211",
      whatsapp: "971504023211",
      instagram: "https://www.instagram.com/molodost.dubai",
      threads: "https://www.threads.com/@molodost.dubai",
      facebook: "https://www.facebook.com/share/18NggSWpHC",
    },
    mapEmbedUrl: "https://www.google.com/maps?q=Cairo&output=embed",
  },
};

export function isCountry(value: string): value is Country {
  return (countries as readonly string[]).includes(value);
}

export function isValidPair(country: string, locale: string): boolean {
  return (
    isCountry(country) &&
    isLocale(locale) &&
    markets[country].locales.includes(locale)
  );
}
