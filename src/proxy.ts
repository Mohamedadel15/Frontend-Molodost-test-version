import { NextResponse, type NextRequest } from "next/server";

import {
  defaultCountry,
  isCountry,
  isValidPair,
  markets,
  type Country,
} from "@/config/markets";
import { defaultLocale, isLocale, type Locale } from "@/i18n/config";
import { COUNTRY_COOKIE, LOCALE_COOKIE } from "@/lib/preferences";

/*
 * Entry redirects (docs/routing.md §Proxy):
 * - `/`                     → preferred (cookie) or default pair
 * - `/{country}`            → insert preferred/default locale
 * - `/{country}/{page...}`  → insert locale when segment 2 isn't one
 * - `/{locale}/...`         → insert preferred/default country
 * - anything else           → pass through; no route matches, so the
 *                             global-not-found document renders with 404
 * Valid `/{country}/{locale}/...` paths pass through untouched.
 *
 * Every redirect target depends on the ml-country/ml-locale preference
 * cookies, so all redirects are 307 (temporary): browsers cache 308s
 * indefinitely and would replay a stale target after the user switches
 * language/country. Query strings are preserved by cloning the request URL.
 */

function preferredCountry(request: NextRequest): Country {
  const cookie = request.cookies.get(COUNTRY_COOKIE)?.value;
  return cookie && isCountry(cookie) ? cookie : defaultCountry;
}

function preferredLocale(request: NextRequest, country: Country): Locale {
  const cookie = request.cookies.get(LOCALE_COOKIE)?.value;
  if (cookie && isLocale(cookie) && markets[country].locales.includes(cookie)) {
    return cookie;
  }
  return markets[country].defaultLocale ?? defaultLocale;
}

function redirectTo(request: NextRequest, pathname: string): NextResponse {
  const url = request.nextUrl.clone();
  url.pathname = pathname;
  return NextResponse.redirect(url, 307);
}

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const segments = pathname.split("/").filter(Boolean);
  const [first, second, ...rest] = segments;

  if (!first) {
    const country = preferredCountry(request);
    const locale = preferredLocale(request, country);
    return redirectTo(request, `/${country}/${locale}`);
  }

  if (isCountry(first)) {
    if (second && isValidPair(first, second)) {
      return NextResponse.next();
    }
    const locale = preferredLocale(request, first);
    const tail = second ? `/${[second, ...rest].join("/")}` : "";
    return redirectTo(request, `/${first}/${locale}${tail}`);
  }

  if (isLocale(first)) {
    const country = preferredCountry(request);
    const tail = segments.length > 1 ? `/${segments.slice(1).join("/")}` : "";
    return redirectTo(request, `/${country}/${first}${tail}`);
  }

  // Unknown structure — no route will match; global-not-found renders (404).
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api|favicon\\.ico|.*\\..*).*)"],
};
