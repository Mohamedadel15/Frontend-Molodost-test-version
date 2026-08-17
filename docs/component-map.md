# Component Map

Server Components by default; `"use client"` only where marked ⚡ (state/effects/GSAP). Two standing rules:

1. **RSC boundary hygiene** — client components receive narrow typed string slices (nav labels, a11y strings), never whole dictionaries/namespaces (avoids duplicating translation bytes in the RSC payload).
2. **Direction/locale** reach client components via props/context from the `[locale]` layout — never `document.dir` at render (hydration safety).

Responsive/RTL defaults (apply to every component unless a row notes otherwise): all spacing/positioning uses logical properties, so column mirroring in RTL is automatic; grids collapse per design-inventory §14 (4→2→1, 3→2→1, 2-col→stacked with the text column first); Arabic text drops letter-spacing to 0 and uses the Arabic font stack via `Heading`/`Text`/`Eyebrow` — components never hardcode families.

## Layout

| Component | Responsibility | Props | Responsive / RTL notes |
|---|---|---|---|
| `Container` | 64px inline gutters | `children`, `bleed?` | gutters 64 → ~40 (tablet) → ~24 (phone) *(verify)*; logical padding |
| `Section` | vertical rhythm + background + anchor | `padding: 'sm'\|'md'\|'lg'` (80/160/200), `theme: 'light'\|'dark'`, `id?` | vertical padding scales down at phone *(verify)* |
| `Header` ⚡(thin shell) | fixed nav, variant swap, active route | `country`, `locale`, nav label slice | server markup + small client shell for scroll threshold & menu state; collapses to hamburger at tablet/phone; RTL mirrors order automatically |
| `MobileMenu` ⚡ | overlay/drawer nav | from Header | *(design unverified — Open Questions)*; focus trap, `aria-modal`, scroll lock; drawer origin inline-end in RTL |
| `LocaleSwitcher` ⚡ | swap locale, preserve country+path, set pref cookie | — | `usePathname()` segment replacement |
| `CountrySwitcher` ⚡ | swap country, preserve locale+path, set pref cookie | — | same |
| `Footer` | newsletter, sitemap, socials, copyright | `country`, `locale` | server; only `NewsletterForm` inside is ⚡; columns stack at phone (newsletter → sitemap → socials/copyright); link columns right-aligned in RTL |

## UI primitives

| Component | Responsibility | Props | Notes |
|---|---|---|---|
| `Button` / `ButtonLink` | pill CTA, sliding dot | `variant: 'navy'\|'white'\|'slate'`, `href?`, `type?` | **Server-compatible; hover invert + dot slide is pure CSS** (logical inset → RTL free). `SubmitButton` ⚡ thin wrapper adds `loading` state for forms |
| `Eyebrow` | uppercase label | `children`, `tone: 'accent'\|'muted'\|'inverse'` | Arabic: `letter-spacing: 0`, no uppercase transform (N/A in Arabic script) |
| `Heading` | typographic headings | `as`, `style: 'display'\|'serif-xl'\|'serif-md'\|'sans-xl'\|'sans-lg'\|'sans-md'\|'sans-sm'`, `tone` | `sans-xl` = Inter 600 72 (Toggle headline; stats share via StatItem); two-tone accent spans (order follows DOM → correct in RTL); Arabic: display styles swap to Arabic display face, +10–15% line-height |
| `Text` | body copy | `size: 'lg'\|'md'\|'sm'`, `tone` | Arabic line-height bump |
| `Icon` | stroke icons | `name`, `size` | directional icons (chevrons) auto-flip in RTL; decorative ones don't |
| `Accordion` ⚡ | FAQ rows | `items: {question, answer}[]` | plus→close rotate; icon inline-end; height animation |
| `Toggle` ⚡ | switch visual | `checked`, `label?`, `onChange?`, `decorative?` | scroll-driven (ToggleScene) & interactive (pricing) modes; knob travel mirrors in RTL |
| `TrustPoint` | avatars + rating | `count`, `rating`, `avatars` | reused in 3+ sections; row reverses via logical flow |
| `SocialLinks` | icon button row | `channels` (from market config) | order follows DOM (mirrors in RTL) |
| `PillTag` | "READ MORE" small pill | `label`, `href` | |

## Cards

| Component | Props | Notes |
|---|---|---|
| `ProgramCard` | `program: {title, description, image, href}` | full-image, sharp corners, gradient overlays, whole-card link; text block inline-start-aligned (mirrors) |
| `SpecialistCard` | `specialist: {name, roles, bio, image, mask, href}` | blob mask variants, line-ellipse decoration; centered → RTL-neutral |
| `ArticleCard` | `article: {title, excerpt, image, href}` | serif link title, READ MORE |
| `PriceCard` | `tier: {title, tagline, features[], price: Money, href}` | Money via shared formatter (market currency, **`numberingSystem: 'latn'` pinned in both locales**) |
| `PriceListItem` | `item: {title, price: Money}` | prices page rows |
| `StatItem` ⚡ | `value`, `suffix`, `label` | odometer digits; latn digits both locales; digit order LTR in RTL |

## Sections (assembled from primitives; text via dictionaries/content)

| Component | Used on | Notes |
|---|---|---|
| `Hero` | home | **server-rendered; CSS-keyframe entrance** (LCP safety); image focal control |
| `PageHero` | all inner pages | eyebrow + display headline + lede |
| `ToggleScene` ⚡ | home | GSAP pinned scene (animations §2); reserved height; server markup + dynamic-imported animation logic |
| `ProgramsGrid` | home | 4 × ProgramCard; 4→2→1 columns |
| `PhilosophyStatement` | home | centered statement + CTA |
| `StoryFeature` | home ×2, stories, about, services | image side mirrors in RTL; stacked (text first) at phone |
| `HowItWorks` ⚡ | home | pinned steps + giant number; unpinned stack at phone; number column mirrors in RTL |
| `ContactPath` ("Ready to find your path?") | home, about, stories index, journal index, specialists index, story detail, article detail | headline/copy variants via dictionary; map + channels from market config; map is AE/EG-specific; 2-col → stacked |
| `SpecialistsSection` | home, specialists, about | header + grid 3→2→1 |
| `SplitStatement` | home, about | 2-col text; stacked at phone |
| `BigQuote` ⚡ | home, about | scroll text reveal; reading order handles RTL |
| `JournalSection` | home | header + 3 ArticleCards |
| `StatsSection` ⚡ | home, services | intro + 4 StatItems; 4→2×2→1 *(verify)* |
| `FAQSection` | home, services, about | left intro + Accordion; stacked at phone (intro first) |
| `ConsultationSection` | home, services, `/book-a-session` | left copy + `ConsultationForm`; stacked at phone (copy first) |
| `ServiceRows` | services | 4 alternating rows; alternation mirrors in RTL |
| `PricingTiers` ⚡ | services | ONE / +3 toggle |
| `PriceList` | prices | grouped 3-col list → 1-col at phone |
| `NewsletterForm` ⚡ | footer | validation, states |
| `ConsultationForm` ⚡ | consultation | market-aware phone validation, localized labels/errors, loading/success/failure; RTL: labels/inputs right-aligned, error icons inline-end |

## Animation primitives (`components/animations/`) — all ⚡

`Reveal`, `FadeIn`, `Stagger`, `TextReveal` (scroll-scrub quote), `ImageReveal`, `Parallax`, `StickyScene` (GSAP pin wrapper), `Odometer`.
Common props: `delay`, `duration`, `ease`, `distance`, `threshold`, `once`, `direction` (logical `start`/`end`, resolved from layout-provided dir context). All honor reduced motion via `useMotionPreferences` (SSR-safe default, media query applied in effect). None may wrap above-the-fold LCP content (the hero uses CSS keyframes instead).

## Data & config modules

- `config/markets.ts` — the ONLY country registry (locales, currency, phone code + validation pattern, contact channels, map embed, addresses).
- `config/site.ts` — base URL, site name, social handles.
- `config/navigation.ts` — nav + footer link definitions (route keys, not URLs).
- `i18n/` — `config.ts`, `getDictionary(locale)` (server-only), dictionaries `en/ar` × `common, navigation, home, about, services, specialists, stories, journal, prices, forms, faq, seo`. **Dictionaries hold UI strings and section chrome ONLY.**
- `content/` — typed entries for CMS-like data (programs, specialists, stories, articles, price lists per market). **Long-form text lives on the entries as localized fields (`{en, ar}` per field), with per-locale MDX for story/article bodies** — not in dictionaries (avoids key explosion, allows rich text). Structure/media shared; market availability flags per entry.
- `lib/seo/` — metadata + region-qualified hreflang builders; `lib/format/` — shared Money/number formatter (latn digits pinned); `lib/validation/` — zod schemas (phone per market).
