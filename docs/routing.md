# Routing Architecture

## URL structure

Canonical public structure: `/[country]/[locale]/...`

Valid combinations (and only these — anything else is a 404):

| Country | Locale | Route | Dir |
|---|---|---|---|
| ae | en | `/ae/en` | LTR |
| ae | ar | `/ae/ar` | RTL |
| eg | en | `/eg/en` | LTR |
| eg | ar | `/eg/ar` | RTL |

Country and locale are **independent axes**:
- **Country** (market): contact info, phone format/validation, address & map, currency (AED / EGP), prices, availability, country-specific SEO.
- **Locale** (language): translations, direction, typography (Latin vs Arabic stacks), localized metadata.

Configured centrally in `config/markets.ts`:

```
markets = {
  ae: { locales: ['en','ar'], defaultLocale: 'en', currency: 'AED', phoneCountryCode: '+971', ... },
  eg: { locales: ['en','ar'], defaultLocale: 'en', currency: 'EGP', phoneCountryCode: '+20',  ... },
}
```

No other file may hardcode the country/locale lists.

**Slugs are locale-invariant** (same story/article/specialist slug in en and ar). The path-preserving switchers and the 4-way hreflang mapping both depend on this; localized slugs would break both and are explicitly out of scope.

## App Router layout (as implemented, Next 16)

```
src/app/
  global-not-found.tsx  ← self-contained bilingual 404 document (experimental.globalNotFound)
  fonts.ts              ← next/font setup (Latin measured pair + Arabic pair pending approval)
  [country]/
    [locale]/
      layout.tsx        ← THE root layout (official i18n pattern): validates params,
      │                   renders <html lang dir>, loads dictionary + market config
      page.tsx          ← Home
      about/page.tsx
      services/page.tsx
      specialists/page.tsx
      specialists/[slug]/page.tsx
      stories/page.tsx
      stories/[slug]/page.tsx
      journal/page.tsx
      journal/[slug]/page.tsx
      prices/page.tsx
      book-a-session/page.tsx
      privacy-policy/page.tsx
      terms-of-use/page.tsx
```

There is deliberately **no `src/app/layout.tsx`**: with a root layout above the dynamic
segments, `<html lang dir>` could only be set via `headers()`, which would force dynamic
rendering of the whole site. The official App Router i18n pattern (root layout inside the
locale segment) keeps every page fully static.

### 404 behavior (explicit — validated against Next 16.3)

- `generateStaticParams` at `[country]/[locale]` yields only the 4 valid pairs; `dynamicParams = false`. Anything that matches no generated route — invalid combos (`/xx/en`), unknown structures (`/whatever`), and unknown inner paths (`/ae/en/nope`) — renders **`global-not-found.tsx`** with a 404 status.
- Segment-level `not-found.tsx` boundaries are **not usable** in this architecture: when the root layout lives in a dynamic segment, Next serves `notFound()` results in its internal error shell on first paint (the boundary content only appears after hydration). This is the documented motivation for `global-not-found` (Next 16 `not-found.md`: "your root layout is defined using top-level dynamic segments"). Verified empirically.
- `global-not-found.tsx` is therefore the single 404 for the whole site: a complete HTML document importing the design tokens/fonts, with **bilingual (EN + RTL AR) copy** and home links pointing at `/` (the proxy then honors the visitor's preference cookies). Per-locale 404 chrome is intentionally traded for a correct, styled, statically served 404.
- Every `[slug]` page (Phase 11) exports its own `generateStaticParams` (driven by `content/`) with `dynamicParams = false` at that segment — known slugs are fully static, unknown slugs fall through to the global 404. No page renders on demand; the whole site stays static.
- Invalid locale under a valid country (`/eg/fr`) is structurally indistinguishable from a page path (`/eg/about`), so the proxy completes it to `/eg/en/fr`, which then 404s. Net result is identical (no content served).

### Proxy (entry redirects — Next 16 renamed middleware.ts to proxy.ts)

- Matcher excludes `_next`, `api`, and files with extensions.
- `/` → preference cookies (`ml-country`/`ml-locale`) if valid, else `/ae/en`. The cookies are written client-side **on every page view** (LocaleProvider), so any entry URL — including the 404 page's home link — returns the visitor to their **last-visited** country/language, not the defaults. Written client-side (not proxy `Set-Cookie`) to keep static document responses CDN-cacheable. *(Geo-based detection: optional later enhancement.)*
- Partial paths: `/{seg}` where seg is a known country → append preferred/default locale (`/ae` → `/ae/en`). `/{country}/{seg2}/...` where seg2 is NOT in that market's locale list → treat seg2 as a path and insert the default locale (`/ae/about` → `/ae/en/about`). Locale membership is tested against `config/markets.ts` only.
- **All redirects are 307 (temporary)**: every target depends on the preference cookies, and browsers cache permanent 308s indefinitely — a cached `/ae → /ae/en` would override a later switch to Arabic. Query strings are preserved (URL clone, pathname-only rewrite).
- **Hosting note**: middleware requires a Node/edge runtime (e.g. Vercel). `output: 'export'` is NOT compatible with this plan — if a static host is ever mandated, these redirects move to host-level rules. Record the hosting decision in Phase 1.

## Page inventory (from the reference site)

| Page | Route (suffix) | Notes |
|---|---|---|
| Home | `/` | 16 sections (see design-inventory §12) |
| About | `/about` | |
| Services | `/services` | includes pricing tiers (market currency) |
| Specialists | `/specialists` | index |
| Specialist detail | `/specialists/[slug]` | 6 known slugs |
| Stories | `/stories` | index |
| Story detail | `/stories/[slug]` | reclaiming-peak-vitality, optimizing-energy-at-the-source, … |
| Journal | `/journal` | index |
| Article detail | `/journal/[slug]` | the-5d-longevity-framework, regenerative-recovery-measured, what-your-biomarkers-can-tell-you |
| Prices | `/prices` | full price list — **market currency** |
| Book a session | `/book-a-session` | consultation form page |
| Privacy Policy | `/privacy-policy` | legal |
| Terms of Use | `/terms-of-use` | legal |

Anchors: home retains a `#toggle-on` anchor equivalent for in-page CTA scrolls.

## Switchers

- **Language switcher** preserves country AND current path: `/ae/en/services → /ae/ar/services`, `/eg/ar/journal → /eg/en/journal`. The translated route always exists (single route tree) — never fall back to home.
- **Country switcher** preserves locale AND current path: `/ae/en/prices → /eg/en/prices`.
- Both are implemented once, from `usePathname()` segment replacement — no per-page logic. They do not write cookies themselves; the destination page's LocaleProvider persists the new pair on arrival.

## SEO

- Every route: localized `title`/`description`, canonical `https://<domain>/<country>/<locale>/<path>` (self-referencing per variant), Open Graph + Twitter, `og:locale` (`en_AE`, `ar_AE`, `en_EG`, `ar_EG`).
- `hreflang`: **region-qualified codes only** — `en-AE`, `ar-AE`, `en-EG`, `ar-EG` + `x-default` (→ `/ae/en`). Bare `en`/`ar` keys are forbidden: with two markets they would collide and Google would discard the annotation set, leaving the AE/EG English pages competing as duplicates. (Next's `alternates.languages` map accepts region-qualified keys — the metadata builder in `lib/seo` enforces this shape.)
- `sitemap.xml`: all valid country/locale/page combinations only. `robots.txt` standard.
