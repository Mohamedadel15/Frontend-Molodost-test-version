"use client";

import Link from "next/link";
import { useEffect, useRef, type RefObject } from "react";

import { Container } from "@/components/layout/Container/Container";
import { ButtonLink } from "@/components/ui/Button/Button";
import type { Country } from "@/config/markets";
import type { Locale } from "@/i18n/config";
import { cn } from "@/lib/cn";
import type { Dictionary } from "@/types/dictionary";

import type { HeaderLink } from "./Header";
import { Switchers } from "./Switchers";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  /** Hamburger button — focus returns here when the drawer closes. */
  triggerRef: RefObject<HTMLButtonElement | null>;
  items: HeaderLink[];
  cta: HeaderLink;
  menu: Dictionary["navigation"]["menu"];
  switcher: Dictionary["navigation"]["switcher"];
  country: Country;
  locale: Locale;
}

/*
 * Full-screen overlay drawer sliding from the inline-end edge with a
 * staggered link reveal. The reference's real mobile menu could not be
 * captured in the audit (design-inventory §17 #7) — this follows the
 * documented ClearPath-convention assumption; recheck in Phase 9.
 *
 * Modality: while open, the page content (main/footer) is made inert so
 * Tab cannot reach obscured content; the header stays live for the close
 * button. Focus returns to the trigger on close.
 */
export function MobileMenu({
  open,
  onClose,
  triggerRef,
  items,
  cta,
  menu,
  switcher,
  country,
  locale,
}: MobileMenuProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  /*
   * onClose must be referentially stable (HeaderClient wraps it in
   * useCallback) — otherwise this effect would re-run mid-open and yank
   * focus back to the first link.
   */
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const inertTargets = Array.from(
      document.querySelectorAll<HTMLElement>("main, footer"),
    );
    inertTargets.forEach((el) => (el.inert = true));
    const firstLink = panelRef.current?.querySelector<HTMLElement>("a");
    firstLink?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    const trigger = triggerRef.current;
    return () => {
      document.body.style.overflow = "";
      inertTargets.forEach((el) => (el.inert = false));
      document.removeEventListener("keydown", onKeyDown);
      trigger?.focus();
    };
  }, [open, onClose, triggerRef]);

  return (
    <div
      id="mobile-menu"
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-label={menu.label}
      inert={!open}
      className={cn(
        "fixed inset-0 z-(--z-overlay) bg-background desktop:hidden",
        "transition-transform duration-(--motion-normal) ease-(--ease-inout)",
        open ? "translate-x-0" : "translate-x-full rtl:-translate-x-full",
      )}
    >
      <Container className="flex h-full flex-col overflow-y-auto pt-(--header-height)">
        <nav
          aria-label={menu.label}
          className="flex flex-1 flex-col justify-center gap-7"
        >
          {items.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              style={{ transitionDelay: open ? `${120 + index * 80}ms` : "0ms" }}
              className={cn(
                "text-serif-md text-primary",
                "transition-[opacity,translate] duration-(--motion-normal) ease-(--ease-out-soft)",
                open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex flex-col items-start gap-8 pb-12">
          <ButtonLink href={cta.href} variant="navy" onClick={onClose}>
            {cta.label}
          </ButtonLink>
          <Switchers switcher={switcher} country={country} locale={locale} />
        </div>
      </Container>
    </div>
  );
}
