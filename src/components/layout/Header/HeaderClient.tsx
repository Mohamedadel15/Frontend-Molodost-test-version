"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

import { Container } from "@/components/layout/Container/Container";
import { ButtonLink } from "@/components/ui/Button/Button";
import { Icon } from "@/components/ui/Icon/Icon";
import type { Country } from "@/config/markets";
import type { Locale } from "@/i18n/config";
import { cn } from "@/lib/cn";
import type { Dictionary } from "@/types/dictionary";

import type { HeaderLink } from "./Header";
import { MobileMenu } from "./MobileMenu";
import { Switchers } from "./Switchers";

/* Must match --breakpoint-desktop (tokens.css) — matchMedia cannot read
   Tailwind breakpoints. */
const DESKTOP_MEDIA_QUERY = "(min-width: 1200px)";

function headerHeightPx(): number {
  const raw = getComputedStyle(document.documentElement).getPropertyValue(
    "--header-height",
  );
  return Number.parseFloat(raw) || 79;
}

interface HeaderClientProps {
  homeHref: string;
  siteName: string;
  items: HeaderLink[];
  cta: HeaderLink;
  menu: Dictionary["navigation"]["menu"];
  switcher: Dictionary["navigation"]["switcher"];
  country: Country;
  locale: Locale;
}

export function HeaderClient({
  homeHref,
  siteName,
  items,
  cta,
  menu,
  switcher,
  country,
  locale,
}: HeaderClientProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [overDark, setOverDark] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const closeMenu = useCallback(() => setOpen(false), []);

  // Close the drawer when the route changes (state adjustment during render).
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    if (open) setOpen(false);
  }

  // Close the drawer if the viewport grows past the desktop breakpoint —
  // otherwise the hidden overlay would keep the body scroll-locked.
  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_MEDIA_QUERY);
    const onChange = (event: MediaQueryListEvent) => {
      if (event.matches) setOpen(false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  /*
   * White-text variant while a [data-header-invert] region (e.g. the hero,
   * built in Phase 9) sits under the header (design-inventory §6).
   */
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const headerHeight = headerHeightPx();
      // Queried live: scroll scenes add/remove the attribute as they change
      const regions = document.querySelectorAll<HTMLElement>(
        "[data-header-invert]",
      );
      setOverDark(
        Array.from(regions).some((el) => {
          const rect = el.getBoundingClientRect();
          return rect.top <= headerHeight && rect.bottom >= headerHeight / 2;
        }),
      );
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [pathname]);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-(--z-header) h-(--header-height)",
          "transition-colors duration-(--motion-fast) ease-(--ease-inout)",
          overDark ? "text-inverse" : "text-accent",
        )}
      >
        {/* progressive backdrop blur under the header (reference) */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[150px] backdrop-blur-md [mask-image:linear-gradient(to_bottom,black_25%,transparent)]"
        />
        <Container className="flex h-full items-center justify-between gap-6">
          <Link href={homeHref} aria-label={siteName} className="text-wordmark">
            molodost&#8217;
          </Link>

          <div className="hidden items-center gap-10 desktop:flex">
            {/* 48px link gap per design-inventory §6 */}
            <nav aria-label={menu.label} className="flex items-center gap-12">
              {items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={cn(
                    "text-label transition-opacity duration-(--motion-fast)",
                    "hover:opacity-70",
                    isActive(item.href) &&
                      "underline decoration-1 underline-offset-8",
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <Switchers switcher={switcher} country={country} locale={locale} />
            <ButtonLink href={cta.href} variant={overDark ? "white" : "navy"}>
              {cta.label}
            </ButtonLink>
          </div>

          <button
            ref={menuButtonRef}
            type="button"
            className="desktop:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? menu.close : menu.open}
            onClick={() => setOpen((v) => !v)}
          >
            <Icon name={open ? "close" : "menu"} size={24} />
          </button>
        </Container>
      </header>

      <MobileMenu
        open={open}
        onClose={closeMenu}
        triggerRef={menuButtonRef}
        items={items}
        cta={cta}
        menu={menu}
        switcher={switcher}
        country={country}
        locale={locale}
      />
    </>
  );
}
