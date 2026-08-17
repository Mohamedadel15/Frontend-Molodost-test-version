"use client";

import Link from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";

import { useLocaleContext } from "@/components/providers/LocaleProvider";
import { localePath } from "@/lib/routes";

interface LocalizedLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Site-relative path, e.g. "/about" — country/locale prefix added automatically. */
  href: string;
  children: ReactNode;
}

/**
 * Client-side convenience link that prefixes the current country/locale.
 * Server Components should call localePath() directly with next/link instead.
 */
export function LocalizedLink({ href, children, ...rest }: LocalizedLinkProps) {
  const { country, locale } = useLocaleContext();
  return (
    <Link href={localePath(country, locale, href)} {...rest}>
      {children}
    </Link>
  );
}
