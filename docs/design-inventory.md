# Design Inventory — Molodost' Longevity

Source of truth: the live site **https://molodostlongevity.com/** (built on the ClearPath Framer template).
All values below were **measured from the published Framer CSS and live DOM** on 2026-08-17 unless marked *(estimated)* or *(unverified)*.

Measurement context: desktop viewport 1536×639 CSS px (Windows, DPR 1.25). Framer uses fixed px values per breakpoint (not fluid vw scaling), so values transfer directly.

---

## 1. Breakpoints (measured from published media queries)

| Name | Range | Notes |
|---|---|---|
| XL (base) | ≥ 1600px | Framer design canvas default |
| Desktop | 1200–1599px | primary target (1440 QA width falls here) |
| Tablet | 810–1199px | |
| Phone | ≤ 809px | |

Tailwind mapping for the rebuild: `sm`-free approach — use custom screens `phone: <810`, `tablet: 810`, `desktop: 1200`, `xl: 1600`.

---

## 2. Color tokens (measured — Framer CSS variables)

| Token | Value | Usage |
|---|---|---|
| `background` | `#FFFFFF` | page background |
| `surface` | `#FAFAFA` | pricing cards / subtle panels |
| `text-primary` | `#2E3231` | dark charcoal — headings, body on light |
| `text-secondary` | `#535956` | gray-green — secondary body, muted labels |
| `text-muted` | `#949E9B` | captions, specialist role lines |
| `accent` | `#244C5F` | navy — CTAs, serif headings, big numbers, eyebrows |
| `text-inverse` | `#FFFFFF` | text on dark |
| `text-inverse-muted` | `#FFFFFFA6` (65% white) | secondary text on dark |

Additional observed (non-token) surfaces:
- Toggle section: dark navy/teal photographic gradient background (image asset, not CSS gradient) with light streaks and thin circle line-art.
- Big Quote + Footer: full-bleed dark photographic backgrounds (hand/water; dark waves with gold particles).
- FAQ rows: white cards on white bg with 1px top hairline (`#2E3231` at low alpha *(estimated ~8–10%)*).

---

## 3. Fonts (measured from `document.fonts`)

| Family | Weights loaded | Role |
|---|---|---|
| **Crimson Text** | 400, 700 (+italics) | Serif display & headings (only 400 observed in use) |
| **Inter** | 400, 500, 600, 700, 900 (+italics) | Body, sans headings, labels, buttons (400/500/600 in use) |
| **Fragment Mono** | 400 | Loaded but no visible usage found on audited pages — treat as unused |

The wordmark "molodost'" in the header is an **image asset** (157×28 px), not live text.

**Arabic**: the reference site has **no Arabic version**. Arabic families cannot be measured — see "Open questions". Recommendation (to be approved): a low-contrast Naskh-flavored serif for display (e.g. **Amiri** or **Noto Naskh Arabic**) paired with **IBM Plex Sans Arabic** for body/labels; Latin numerals kept for stats.

---

## 4. Typography scale (measured from Framer style presets)

Format: size px at XL / Desktop / Tablet / Phone. lh = line-height, ls = letter-spacing.

| Style | Family/Weight | XL | D | T | P | lh | ls | Case |
|---|---|---|---|---|---|---|---|---|
| Display (hero h1) | Crimson 400 | 152 | 136 | —¹ | 64 | 84% (D: 90%) | −5% (D: −4%, P: −3%) | none |
| H2 serif | Crimson 400 | 80 | 72 | 64 | 48 | 100% (D: 96%) | −4% (D–P: −3%) | none |
| H3 serif (card titles) | Crimson 400 | 38 | 36 | 34 | 32 | 100% | −3% | none |
| H2 sans | Inter 500 | 48 | 44 | 38 | 34 | 120% | −4% | none |
| H4 sans (form/stat headings) | Inter 600 | 34 | 32 | 30 | 26 | 140% | −3% | none |
| H5 sans (intro/lede) | Inter 500 | 28 | 26 | —¹ | 22 | 140% | −3% | none |
| Feature headline / stat number² | Inter 600 | — | 72 | — | — | 100% | −3% | none |
| Body L | Inter 400 | 20 | 18 | 18 | 18 | 170% | 0 | none |
| Body | Inter 400 | 16 | 16 | 16 | 16 | 170% | 0 | none |
| Body S | Inter 400 | 14 | 14 | 14 | 14 | 180% | 0 | none |
| Label / Eyebrow / Nav / Button | Inter 600 | 12 | 12 | 12 | 12 | 140% | +0.11em | UPPERCASE |

¹ No tablet override exists in the published CSS — the XL base value cascades at tablet. For the Display style that yields 152px at 810–1199px, which is almost certainly a template artifact; verify visually at tablet during QA and clamp sensibly if it overflows *(flagged as open question)*.
² The Toggle-section headline ("If only unlocking peak vitality…") and the statistics numbers use Inter 600 72px at Desktop; their T/P sizes were not extractable (inline styles, not presets) *(estimated: scale with H2-sans ratios)*.

Two-tone serif headings: "How It Works" renders "How" in `#2E3231` and "It Works" in `#244C5F` via inline spans. Same Display preset.

---

## 5. Layout system (measured)

- **Content inline padding**: 64px per side at Desktop (hero H1 left edge = 64px; services cards start at x=64). No max-width container observed at ≤1600 — content is full-width minus 64px gutters. *(Behavior above 1600px unverified; assume a 1600px design width with the same 64px gutters or keep fluid.)*
- **Section vertical rhythm** (measured `padding` on section roots): 80px (Services top), **160px** (Journal, FAQ bottom, Specialists top, Book A Session — the dominant value), 200px (Philosophy top).
- **Grid gaps**: Services cards 16px. Journal 3-up row uses space-between distribution (~120px gutters at 1254vw). Specialists grid 3 cols × 2 rows, gap ~40–60px *(estimated from screenshots)*.
- **Header height**: 79px, `position: fixed`, transparent background at all times (no blur/solid state observed).
- **Full-page height** (home, 1536vw): 17,059px.

---

## 6. Header / Navigation

- Fixed, transparent, 79px tall; content padded 64px inline.
- Left: logo image (157×28).
- Right: nav links ABOUT / SERVICES / SPECIALISTS / STORIES (Label style, 12/600/+11%/uppercase), gap ~48px *(estimated)*, then pill CTA "BOOK A SESSION".
- **Two color variants** (Framer names: `Menu White`, `Menu Dark`):
  - Over the hero/dark imagery: white links; CTA pill = **white bg / navy text**, dot left of label.
  - Over light content (scrolled): navy `#244C5F` links; CTA pill = **navy bg / white text**, dot right of label.
  - Switch point: leaving the hero region *(mechanism is a scroll-position variant swap, not mix-blend)*.
- Active route state: current page link appears underlined (observed on inner pages: ABOUT underlined on /about).
- Mobile navigation: **not observable in audit** (see Open questions). Assumed hamburger + overlay/drawer per ClearPath conventions.

## 7. Buttons (measured)

Pill button (single component, variants):
- Radius 999px; height 39px (desktop); padding-inline 20px (label side) / 48px (dot side); label = Label style (Inter 600 12 uppercase +0.11em).
- A 4–5px dot sits on the opposite side from the label padding.
- Variants: `navy` (bg `#244C5F`, white text), `white` (bg white, navy text), `muted/slate` (Story B "READ FULL STORY" appears in a desaturated slate-blue over light bg *(unverified exact value — sample at build time)*), plus disabled/loading for forms (not in reference).
- **Hover**: inverts colors (navy ↔ white) and the dot slides to the opposite end (label shifts accordingly). Duration ~250ms (`motion-fast`) *(estimated)*.
- Text buttons: "READ MORE" pill (journal/services cards). Social icons: bare ~1.5px-stroke line glyphs ~20–22px (footer/contact screenshots show no circle enclosure except Instagram's own rounded square; verify treatment in Phase 9), white or navy stroke depending on surface.

## 8. Forms (measured)

- Inputs/textarea: transparent bg, no radius, **underline style** (1px bottom hairline on wrapper), 16px Inter 400, input height 40px, textarea 120px, placeholder `#949E9B` *(estimated from render)*.
- Selects: native, same underline treatment, chevron right.
- Checkboxes: small square ~18px with 1px border, label Body 16 *(estimated)*.
- Labels are placeholder-based (no floating labels). Required marked with `*`.
- Consultation form fields (measured from live form):
  1. Your Name* (text) · 2. Your Email* (email) · 3. Phone Number (tel)
  4. Preferred Pronouns* (select: She/Her, He/Him, They/Them, Prefer not to say)
  5. Preferred Clinic Location* (select: United Arab Emirates, Egypt)
  6. "What would you like to optimize?" (H4) + textarea
  7. "Which area are you interested in?" (H4) + 5 checkboxes: 5D Diagnostics & Check-up, Longevity Optimization, Regenerative Medicine & IV Therapy, Aesthetic Regeneration, Not sure yet — help me choose
  8. Where did you hear about us?* (select: Google Search, A friend or colleague, Therapist referral, Other)
  9. Email-updates opt-in + consent note (Body S) + submit pill "BOOK A SESSION"
- Newsletter (footer): underline email input + white pill SUBSCRIBE + Body S legal note.

## 9. Cards

**ProgramCard** (home "Our Services"): full-bleed image card, sharp corners (radius 0), ~336×560 at 1536vw (4-up, 16px gap). Serif H3 white title top-left (24px inset *(estimated)*); Body S white description pinned bottom; darkening gradient overlay top & bottom for legibility. Whole card is a link; "READ MORE" label present in DOM (hover reveal *(unverified)*).

**SpecialistCard**: organic blob-masked photo (mask varies per card) with a thin offset line-ellipse decoration; centered serif H3 navy name; Inter 14 `#949E9B` role lines; Body S `#535956` description. 3-up grid.

**ArticleCard** (journal): image (≈4:3, sharp corners), serif 36 title as link (navy), Body S description, READ MORE pill. 3-up with wide gutters; cards have unequal heights (natural content height).

**PriceCard** (services/prices): white card on `#FAFAFA`, radius ~16px *(estimated)*, serif H3 title, Body S description, list of included features, navy price "AED 1,234" (Inter 600 ~40px *(estimated)*), BOOK NOW pill. Pricing toggle above: "ONE ↔ UP TO +3 (20% OFF)".

**StoryFeature** (Story A/B sections): eyebrow (navy) → serif H2 → Body L→ pill CTA on the left column; right column = two overlapping portrait images (one large ~360×570, one offset behind, both sharp-cornered) with slight parallax between layers *(estimated)*; thin decorative line squiggle behind.

## 10. Footer (measured structure)

Dark full-bleed background image (waves + particles), ~593px tall (measured: page height 17,059 − footer top 16,466), decorative "Long Line" squiggle SVGs crossing the seam above it.
- Left: serif H2 white "Join Our Newsletter." + Body (65% white) + newsletter form + legal note.
- Right: "SITEMAP" label (65% white) + two link columns (Inter 600 16 *(estimated)* white): Home, About, Services, Specialists, Stories | Prices, Journal, Article, Privacy Policy, Terms of Use.
- Bottom row: social icon buttons (Instagram, Threads, Facebook, WhatsApp, Phone, Email) left; "Copyright 2026 Molodost'. All rights reserved." right (Body, 65% white).

## 11. Imagery

- Hosted on `framerusercontent.com` (31 images on home). Assets must be exported/recreated for the rebuild (list captured; download at build time).
- Treatment: soft-focus, ethereal portraits; muted teal/blue/sage palette; film-grain feel. Hero: extreme close-up of a face, cool tones, darker at left (text zone).
- Hero focal point: face occupies right-center; headline sits over the darker bottom-left. **Do not center-crop** — focal point ≈ 60% x / 30% y *(estimated)*.
- Sharp corners everywhere except price cards and pill buttons.
- Specialist photos: real clinic photography, blob-masked.
- Map: embedded Google map (Dubai Marina / JLT area) in the "Ready to find your path?" section — AE-specific.

## 12. Homepage sections (measured tops/heights at 1536vw; see animations.md for motion)

| # | Framer name | Top | Height | Summary |
|---|---|---|---|---|
| 1 | Page Intro (Hero) | 0 | 900 | Full-viewport image hero; Display H1 white bottom-left (2 lines, width ~806px); right column Body L white (~440px wide) + navy pill CTA; scroll indicator none |
| 2 | Toggle | 900 | 1195 | Pinned 100vh scroll scene: bg image→navy scene; VITALITY switch; headline swap OFF→ON (see animations) |
| 3 | Our Services | 2095 | 640 | 80px top pad; 4 ProgramCards 16px gap |
| 4 | Our Philosophy | 2735 | 683 | 200px top pad; centered eyebrow OUR PHILOSOPHY + H2-sans (44px, max-w ~1240) + navy pill THE BIOLOGICAL ARCHITECTURE |
| 5 | Story A | 3418 | 1059 | StoryFeature "Reclaiming Peak Vitality" (images right) |
| 6 | How It Works | 4477 | 2167 | Display H2 two-tone + H5 intro; pinned Steps: 3 steps, serif H2 navy titles left + giant navy number 01→03 right (~560px tall) with squiggle line art |
| 7 | Ready to find your path? | 6645 | 833 | 2-col: H2 serif "Ready to protect your biological capital?" + Body + TrustPoint block (5 avatars + "+81" chip, "Excellent 4.9 out of 5 ★ TrustPoint") + navy pill; right: map embed + "Connect with Molodost'…" + 6 social icon buttons |
| 8 | Specialists | 7478 | 2005 | 160px top pad; centered header (eyebrow OUR SPECIALISTS, serif H2, Body, pill MEET OUR SPECIALISTS); 3×2 SpecialistCards |
| 9 | Text Section | 9482 | 478 | 2-col: H2-sans left ("Clinical clarity, regenerative science…"); right Body in navy `#244C5F` |
| 10 | Big Quote | 9961 | 834 | Full-bleed dark image; serif H2 white quote with scroll-linked reveal; attribution Body S 65% white |
| 11 | Story B | 10795 | 1019 | StoryFeature "Optimizing Energy at the Source" (eyebrow DIAGNOSTICS, REGENERATION, VITALITY) |
| 12 | Journal | 11814 | 1313 | 160px pads; header row (eyebrow OUR JOURNAL + serif H2 left; Body + BROWSE INSIGHTS pill right); 3 ArticleCards |
| 13 | Text Section (Stats) | 13127 | 478+ | 2-col intro (H2-sans left, Body S right); 4 stat columns: rolling-digit numbers 450+ / 80+ / 9+ / 25+ (Inter 600 72 navy) + Body S labels |
| 14 | FAQ | 13904 | 736 | 2-col: left serif H2 "Your questions. Answered." + Body + pill ABOUT MOLODOST'; right accordion (6 items, plus-circle icons) |
| 15 | Book A Session | 14640 | 1826 | 160px pads; eyebrow BOOK A CONSULTATION; left: Display serif headline + Body + TrustPoint + connect/socials; right: consultation form |
| 16 | Footer | 16466 | ~593 | See §10 |

**Supplementary per-section attributes** (attributes not covered by the table above):
- Padding: Hero, Toggle, Story A/B, "Ready to find your path?", Text Sections, Big Quote and Footer have **no section-level vertical padding** — their heights come from content/viewport sizing (full-bleed scenes) or internal element spacing; horizontal content always sits inside the 64px `Container` gutters except full-bleed backgrounds (Hero, Toggle, Big Quote, Footer images bleed edge-to-edge).
- Borders/radius: no borders or radii anywhere on section level; radii exist only on pill buttons (999px), price cards (~16px est.), FAQ row cards (subtle, verify), avatars (circles).
- Interaction: sections are non-interactive except their CTAs/cards/accordion/form; the Toggle and How It Works sections capture scroll (pinned scenes) — see animations.md §2/§4.
- Per-section RTL notes: Hero — headline block inline-start, paragraph+CTA column inline-end (mirrors); Toggle — switch semantics mirror (see animations §2); Story A/B — text inline-start, images inline-end (mirror); How It Works — steps text inline-start, number inline-end (mirror); "Ready to find your path?" — copy/trust inline-start, map+channels inline-end (mirror); Text/Stats sections — 2-col mirror, stat digit order stays LTR; FAQ — accordion icons at inline-end; Book A Session — copy inline-start, form inline-end (mirror); two-tone headings keep DOM span order (accent segment renders in Arabic reading order naturally); centered sections (Philosophy, Specialists header, Big Quote) are RTL-neutral apart from text alignment.

## 13. Inner pages (structure audited; content captured)

All inner pages share: standard page hero (eyebrow + serif Display headline + Body lede, ~830px tall, light bg), then page sections, then shared closing sections (variants of Story/FAQ/Book A Session/"Ready to find your path?"), then Footer.

- **/about** — hero "Biological Architecture, Measured Early."; ABOUT intro; "The Way We Help" (method); "Our Clinical Philosophy" + founder quote (Dr. Ahmed Monir); specialists-roles trio; Text Section; Ready-to-find-your-path; Big Quote ("We do not just add years to life…"); Story ("Metabolic Health, Redesigned"); FAQ.
- **/services** — hero "Longevity Care, Designed Around You."; 4 alternating Service rows (5D Diagnostics & Biological Mapping / Regenerative Medicine / Aesthetic Regeneration / Concierge & IV Therapy — each with BOOK A SESSION); stats; Pricing (3 tiers × toggle ONE / UP TO +3 (20% OFF): Diagnostics, Optimization, Concierge); Story ("Aesthetic Regeneration Without Looking Different"); FAQ; Book A Session.
- **/specialists** — hero; 6 SpecialistCards (same as home, full bios); Ready-to-find-your-path. Detail pages `/specialists/[slug]` exist for all 6 *(not audited in depth)*.
- **/stories** — hero "Real biomarkers. Real change."; repeated StoryFeature rows (CMS list); Ready-to-find-your-path.
- **/stories/[slug]** — story detail: eyebrow/tags, serif Display title, lede; THE CHALLENGE; The Journey; Starting Point / Our Approach; pull-quote; outcome; Final Reflections; Read Next Story; CTA block.
- **/journal** — hero "Insights for Longevity."; ArticleCard list; CTA block. `/journal/[slug]` article detail *(not audited in depth)*.
- **/prices** — long 3-col price list grouped by category (item serif title + navy "AED n,nnn" + BOOK NOW pill). **Currency AED — must become market-aware (AED/EGP).**
- **/book-a-session** — standalone version of the Book A Session section.
- **/privacy-policy**, **/terms-of-use** — legal text pages *(not audited)*.

## 14. Responsive behavior

Measured: the typographic scale per breakpoint (§4). Layout at tablet/phone could **not** be rendered during the audit (the OS window refused programmatic resize). The following are informed assumptions to verify during implementation QA *(all flagged)*:
- 4-up services grid → 2-up (tablet) → 1-up or horizontal scroll (phone).
- Specialists 3×2 → 2×3 → 1-col.
- Journal 3-up → 1-col stacked.
- Story sections → text above images, stacked.
- 2-col sections (FAQ, stats, book-a-session) → single column, left column first.
- Nav collapses to hamburger at tablet or phone breakpoint.
- Inline padding 64 → ~40 (tablet) → ~20–24 (phone).

## 15. RTL requirements (for the rebuild — no reference exists)

- `dir="rtl"` on `<html>` for `ar`; all layout via logical properties; icon/dot sides mirror; eyebrow/label letter-spacing must be reduced or removed for Arabic (tracking breaks Arabic script joining — use `letter-spacing: 0` for Arabic text).
- Two-column sections mirror; image/text order follows reading direction.
- Serif display must be replaced by the approved Arabic display face; line-heights need +10–15% for Arabic ascenders/diacritics *(to tune visually)*.
- Numerals: keep Western Arabic numerals (matching stats style) unless the client requests Eastern Arabic-Indic digits.

## 16. Contact / market data captured (AE)

- WhatsApp/Phone: +971 50 402 3211 · Email: hello@molodostlongevity.com
- Instagram & Threads: @molodost.dubai · Facebook page: share/18NggSWpHC
- Location: Dubai (map embed near Dubai Marina/JLT). TrustPoint rating 4.9/5, "80+ clients".
- **Egypt market equivalents: not present in the reference — required from the client.**

---

## 17. Open questions (consolidated — everything that cannot be determined from the references)

Needs client input:
1. **Arabic typography** — no Arabic version of the reference exists. Font pairing (§3 recommendation) needs approval **before Phase 6** (hard blocker — metrics affect all later layout QA).
2. **Egypt market data** — phone, WhatsApp, address/map, social handles, EGP price list, TrustPoint equivalents. The reference is AE-only.
3. **Form submission target** — the Framer form posts to Framer's backend; the rebuild needs an endpoint (email service, CRM, or API — TBD).
4. **Asset sourcing** — export the `framerusercontent.com` imagery (URLs captured) or receive original assets; licensing to confirm.
5. **Country switcher UI** — the reference has no visible country switcher (market only appears as a form field). Placement/design is a new decision (header vs footer).

Needs re-measurement during implementation (Playwright viewport emulation at Phase 9 start — the audit browser window could not be resized):
6. **Tablet/phone layouts per section** — §14 assumptions to be replaced with measured captures at 834 and 390.
7. **Mobile menu** — trigger, layout, animation (assumed hamburger + overlay).
8. **Display heading tablet size** — CSS cascade gives 152px at 810–1199px (template artifact?); verify visually and clamp if broken.
9. **Toggle-headline / stat-number tablet+phone sizes** — inline styles, not extractable from presets; measure visually.
10. **Container behavior ≥1600px** — max-width vs fluid; verify on a wide viewport.
11. **Hover states of cards** (READ MORE reveal?), FAQ single-open behavior, squiggle-line drift, exact easings/durations — calibrate side-by-side in Phase 10.
12. **Prices page full item list** — long AED list; extract completely at build time (Phase 11).
13. **Specialist & journal detail pages** — not audited in depth; capture before Phase 11.
