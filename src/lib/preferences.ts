import type { Country } from "@/config/markets";
import type { Locale } from "@/i18n/config";

/*
 * Preference cookies record the last-visited market/language. The proxy
 * reads them to resolve partial URLs ("/", "/ae", "/en", the 404 page's
 * home link) back to the visitor's last pair instead of the defaults.
 * They are written client-side on every page view (LocaleProvider) so
 * static document responses stay cacheable (no Set-Cookie from the proxy).
 */

export const COUNTRY_COOKIE = "ml-country";
export const LOCALE_COOKIE = "ml-locale";

const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

function setCookie(name: string, value: string) {
  document.cookie = `${name}=${value}; path=/; max-age=${COOKIE_MAX_AGE}; samesite=lax`;
}

export function savePreferences(country: Country, locale: Locale) {
  setCookie(COUNTRY_COOKIE, country);
  setCookie(LOCALE_COOKIE, locale);
}
