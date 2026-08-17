import type { Metadata } from "next";
import "@/styles/globals.css";

import { fontVariables } from "@/app/fonts";
import { notFoundCopy } from "@/i18n/not-found-copy";

/*
 * Global 404 document (experimental.globalNotFound). It bypasses the
 * app's layouts, so it must be a complete, self-contained HTML document.
 * The requested URL's locale is unknown at routing level, so the page is
 * bilingual-neutral; the home links point at "/", which the proxy resolves
 * to the visitor's preferred (cookie) or default country/locale.
 *
 * Links are plain <a> elements: this document renders outside the app
 * router tree, so next/link client navigation does not function here — a
 * full document navigation also lets the proxy resolve "/" from cookies.
 *
 * The Arabic section relies on the :lang(ar)-scoped typography overrides in
 * globals.css (font swap, zero tracking, leading relief) — no per-element
 * font patching needed.
 */

export const metadata: Metadata = {
  title: "404 — Molodost'",
};

const HOME_HREF = "/";

export default function GlobalNotFound() {
  const en = notFoundCopy.en;
  const ar = notFoundCopy.ar;

  return (
    <html lang="en" dir="ltr" className={fontVariables}>
      <body>
        <header className="fixed inset-x-0 top-0 flex h-(--header-height) items-center px-(--container-gutter) text-accent">
          <a href={HOME_HREF} aria-label="Molodost'" className="text-wordmark">
            molodost&#8217;
          </a>
        </header>
        <main className="flex min-h-svh flex-col items-center justify-center gap-16 px-(--container-gutter) py-(--space-section-md)">
          <section className="flex max-w-xl flex-col items-center gap-6 text-center">
            <p className="text-label text-accent">{en.eyebrow}</p>
            <h1 className="text-serif-xl">{en.title}</h1>
            <p className="text-body-lg text-secondary">{en.body}</p>
            <a
              href={HOME_HREF}
              className="text-label text-accent underline decoration-1 underline-offset-8"
            >
              {en.backHome}
            </a>
          </section>
          <section
            lang="ar"
            dir="rtl"
            className="flex max-w-xl flex-col items-center gap-6 border-t border-primary/10 pt-16 text-center"
          >
            <p className="text-label text-accent">{ar.eyebrow}</p>
            <p className="text-serif-md">{ar.title}</p>
            <p className="text-body-lg text-secondary">{ar.body}</p>
            <a
              href={HOME_HREF}
              className="text-label text-accent underline decoration-1 underline-offset-8"
            >
              {ar.backHome}
            </a>
          </section>
        </main>
      </body>
    </html>
  );
}
