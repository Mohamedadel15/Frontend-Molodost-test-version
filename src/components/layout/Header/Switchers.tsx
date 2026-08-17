"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { MouseEvent } from "react";

import { countries, type Country } from "@/config/markets";
import { locales, type Locale } from "@/i18n/config";
import { cn } from "@/lib/cn";
import { switchCountryPath, switchLocalePath } from "@/lib/routes";
import type { Dictionary } from "@/types/dictionary";

interface SwitchersProps {
  switcher: Dictionary["navigation"]["switcher"];
  country: Country;
  locale: Locale;
  className?: string;
}

/**
 * Language switcher preserves country + path; country switcher preserves
 * locale + path (docs/routing.md §Switchers). Preference cookies are NOT
 * written here — the destination page's LocaleProvider persists the new
 * pair on arrival (single mechanism for every navigation).
 *
 * Query strings: hrefs are pathname-based (usePathname excludes search, and
 * useSearchParams would force a Suspense/CSR bailout on static pages), so the
 * click handler re-appends window.location.search at interaction time.
 * Open-in-new-tab loses query params — an accepted trade-off.
 */
export function Switchers({
  switcher,
  country,
  locale,
  className,
}: SwitchersProps) {
  const pathname = usePathname();
  const router = useRouter();

  const onSwitch = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    const search = window.location.search;
    if (search) {
      event.preventDefault();
      router.push(`${href}${search}`);
    }
  };

  const optionClass = (active: boolean) =>
    cn(
      "text-label transition-opacity duration-(--motion-fast)",
      active
        ? "underline decoration-1 underline-offset-8"
        : "opacity-60 hover:opacity-100",
    );

  return (
    <div className={cn("flex items-center gap-6", className)}>
      <div
        role="group"
        aria-label={switcher.languageLabel}
        className="flex items-center gap-3"
      >
        {locales.map((l) => {
          const href = switchLocalePath(pathname, l);
          return (
            <Link
              key={l}
              href={href}
              aria-current={l === locale ? "true" : undefined}
              className={optionClass(l === locale)}
              onClick={(event) => onSwitch(event, href)}
            >
              {switcher.locales[l]}
            </Link>
          );
        })}
      </div>
      <div
        role="group"
        aria-label={switcher.countryLabel}
        className="flex items-center gap-3"
      >
        {countries.map((c) => {
          const href = switchCountryPath(pathname, c);
          return (
            <Link
              key={c}
              href={href}
              aria-current={c === country ? "true" : undefined}
              className={optionClass(c === country)}
              onClick={(event) => onSwitch(event, href)}
            >
              {switcher.countries[c]}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
