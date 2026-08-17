import type { Locale } from "@/i18n/config";

/**
 * Localized field on a content entry (component-map §Data: long-form and
 * CMS-like text lives on entries, not in the UI dictionaries).
 */
export type Localized<T = string> = Record<Locale, T>;

export function pick<T>(field: Localized<T>, locale: Locale): T {
  return field[locale];
}
