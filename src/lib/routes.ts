import {
  defaultCountry,
  isCountry,
  markets,
  type Country,
} from "@/config/markets";
import { defaultLocale, isLocale, type Locale } from "@/i18n/config";

/** Build an absolute path for a site-relative path within a market/locale. */
export function localePath(
  country: Country,
  locale: Locale,
  path = "/",
): string {
  const suffix = path === "/" ? "" : path;
  return `/${country}/${locale}${suffix}`;
}

/**
 * Replace the locale segment, preserving country and the rest of the path.
 * Falls back to the default country when the pathname is not a valid
 * /{country}/{locale}/... path (defensive — see foundation review).
 */
export function switchLocalePath(pathname: string, locale: Locale): string {
  const segments = pathname.split("/").filter(Boolean);
  const country = segments[0];
  if (!country || !isCountry(country)) {
    return localePath(defaultCountry, locale);
  }
  const rest = segments.slice(2);
  return `/${country}/${locale}${rest.length ? `/${rest.join("/")}` : ""}`;
}

/** Replace the country segment, preserving locale and the rest of the path. */
export function switchCountryPath(pathname: string, country: Country): string {
  const segments = pathname.split("/").filter(Boolean);
  const locale = segments[1];
  if (!locale || !isLocale(locale)) {
    return localePath(country, markets[country].defaultLocale ?? defaultLocale);
  }
  const rest = segments.slice(2);
  return `/${country}/${locale}${rest.length ? `/${rest.join("/")}` : ""}`;
}
