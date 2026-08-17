import type { Country } from "@/config/markets";
import { headerCta, headerNav } from "@/config/navigation";
import type { Locale } from "@/i18n/config";
import { localePath } from "@/lib/routes";
import type { Dictionary } from "@/types/dictionary";

import { HeaderClient } from "./HeaderClient";

export interface HeaderLink {
  href: string;
  label: string;
}

interface HeaderProps {
  country: Country;
  locale: Locale;
  dictionary: Dictionary;
}

/**
 * Server assembly: resolves nav labels + hrefs; the interactive shell
 * (scroll variant, mobile menu, switchers) is the client part.
 * Only narrow string slices cross the RSC boundary (component-map rule 1).
 */
export function Header({ country, locale, dictionary }: HeaderProps) {
  const { navigation, common } = dictionary;

  const items: HeaderLink[] = headerNav.map((item) => ({
    href: localePath(country, locale, item.path),
    label: navigation.links[item.key],
  }));

  const cta: HeaderLink = {
    href: localePath(country, locale, headerCta.path),
    label: navigation.links[headerCta.key],
  };

  return (
    <HeaderClient
      homeHref={localePath(country, locale)}
      siteName={common.siteName}
      items={items}
      cta={cta}
      menu={navigation.menu}
      switcher={navigation.switcher}
      country={country}
      locale={locale}
    />
  );
}
