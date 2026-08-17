# Implementation Plan

Ordered phases. Each phase ends with `npm run lint && npm run typecheck && npm run build` green, plus the phase's own verification. No phase starts before the previous is stable.

Standing exit criterion from Phase 9 onward: **every section/page is checked on `/ae/ar` (RTL) at the same time it is checked on `/ae/en`** — Arabic placeholder strings are acceptable early, but layout must mirror correctly. RTL is not deferred to the end.

## Phase 1 — Architecture
Next.js (App Router, TypeScript strict) + Tailwind. Project structure per component-map. Dependencies: `motion`, `gsap`, `zod` only (no state libs). Base tsconfig/eslint/prettier. **Record the hosting decision** (middleware requires Node/edge runtime — `output: 'export'` is incompatible with the routing plan; see routing.md §Middleware).

## Phase 2 — Routing
`/[country]/[locale]` tree per routing.md: `generateStaticParams` (4 combos) + `dynamicParams=false` at the locale segment AND at every `[slug]` segment (slug params from `content/`); root `layout.tsx` + neutral root `not-found.tsx`; localized `not-found.tsx` + `[...rest]` catch-all; middleware (matcher, 308 structural redirects, preference cookie, locale-membership disambiguation).
✔ Verify: 4 routes render; `/xx/en`, `/eg/fr` → **root** 404 (bilingual, styled minimally); `/ae/en/nope` → **localized** 404; known slugs static, unknown slugs 404; `/` and `/ae` and `/ae/about` redirect correctly with expected status codes.

## Phase 3 — i18n
Server-only dictionary loader with typed keys; `en`/`ar` dictionaries split by namespace — **UI strings and section chrome only** (long-form content lives on content entries / MDX per component-map §Data — decide the content-entry shape NOW, before the type system hardens). No hardcoded UI strings (review gate). RSC-boundary rule: client components receive narrow string slices, never whole dictionaries.
✔ Verify: same page renders both languages from dictionaries only.

## Phase 4 — RTL/LTR
`<html lang dir>` from locale; logical-properties-only policy (stylelint/review); dir provided to client components via layout context (never `document.dir` at render). Arabic letter-spacing-zero rule wired into text primitives.
✔ Verify: `/ae/ar` renders `dir="rtl"` and mirrors layout.

## Phase 5 — Design tokens
`styles/tokens.css` (colors, spacing, radii, motion, z-index from design-inventory §2–§5) wired into Tailwind theme. Breakpoints 810/1200/1600. Shared `lib/format` Money/number formatter with `numberingSystem: 'latn'` pinned for both locales.

## Phase 6 — Typography
next/font: Crimson Text (400), Inter (400/500/600) + **Arabic pair — client approval is a hard blocker for this phase** (its metrics affect all later layout QA; placeholder config isolated in one file until approved). Typography presets as utilities matching inventory §4 exactly (per-breakpoint sizes), including `sans-xl`.
✔ Verify: type specimen page side-by-side vs reference screenshots, in both scripts.

## Phase 7 — Shared UI + animation primitives
Button (CSS-only hover invert + dot slide; `SubmitButton` client wrapper), Eyebrow, Heading (two-tone), Text, Icon set, Container, Section, TrustPoint, SocialLinks, PillTag, Toggle, Accordion.
**Animation primitives land here, before any section work**: `Reveal`, `Stagger`, `StickyScene` (GSAP pin wrapper, dynamic-imported logic, reserved heights), `TextReveal`, `Odometer`, `useMotionPreferences` — the pinned scenes in Phase 9 are structural and cannot be retrofitted.

## Phase 8 — Header & Footer
Header (fixed, White/Dark variants, active states, thin client shell), MobileMenu (**capture the live site's real mobile menu first** — see Open Questions), Footer (dark bg, newsletter, sitemap). Language/country switchers with preference cookie.
✔ Verify: switcher preservation matrix (routing.md §Switchers) + cookie honored by middleware.

## Phase 9 — Homepage sections (in visual order)
**Before starting: capture the reference at exact viewports with Playwright** (real viewport emulation at 1440×900 / 834×1112 / 390×844 — closes the tablet/phone gap in design-inventory §14; update §12/§14 with measured values).
Hero (CSS entrance) → ToggleScene → ProgramsGrid → PhilosophyStatement → StoryFeature A → HowItWorks → ContactPath → SpecialistsSection → SplitStatement → BigQuote → StoryFeature B → JournalSection → StatsSection → FAQSection → ConsultationSection.
Each section: build (with its scroll scaffolding where applicable) → screenshot at 1440/834/390 vs reference → fix largest deltas first (layout → height → container → type → images → spacing → colors → radii → animation) → RTL check.

## Phase 10 — Animation calibration
Side-by-side timing/easing calibration of all Phase 7/9 motion vs the live site; hover/touch states; reduced-motion completeness pass.

## Phase 11 — Inner pages
PageHero + About, Services (ServiceRows, PricingTiers, StatsSection, FAQSection, ConsultationSection), Specialists (+detail), Stories (+detail), Journal (+detail), Prices (market-aware Money), Book-a-session, legal pages. Same per-page verification incl. RTL and slug 404s.

## Phase 12 — Forms
ConsultationForm + NewsletterForm: zod validation, market-aware phone rules, localized labels/errors (both languages), loading/success/failure states, accessible errors (`aria-describedby`, focus management). Submission endpoint stub (target TBD — Open Questions).

## Phase 13 — SEO
Metadata builders: localized titles/descriptions, self-referencing canonicals, **region-qualified hreflang only** (`en-AE`, `ar-AE`, `en-EG`, `ar-EG` + `x-default` — bare `en`/`ar` forbidden, see routing.md §SEO), OG/Twitter + `og:locale`, sitemap.xml (valid combos only), robots.txt, JSON-LD (Organization/MedicalClinic — optional).

## Phase 14 — Accessibility
Keyboard nav, focus states, heading hierarchy, aria for menu/accordion/toggle/forms, alt text, contrast audit (65%-white-on-dark and muted grays need checking), reduced-motion completeness.

## Phase 15 — Performance
Image optimization (next/image, priority hero, lazy rest), font subsetting/display, GSAP: dynamic-import **animation logic only** inside server-rendered sections with reserved heights (never `ssr:false` section components — CLS), bundle analysis, CLS/LCP/INP pass.

## Phase 16 — Visual regression
Full-page screenshot matrix: 4 routes × key pages × 1440/834/390 vs reference captures; converge until structural diffs are gone. Final quality gate checklist from the master brief.

## Standing rules
- Reference fidelity over convenience; no design modernization.
- No Framer markup copying — native Next.js implementation.
- Content/config/translation/presentation separation (component-map §Data).
- Assets: export imagery from the live site (framerusercontent URLs captured) or receive originals from the client — decision pending (Open Questions).
