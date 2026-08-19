# Animation Inventory

Durations/easings marked *(est.)* are visual estimates. Values marked **(measured)** are not — Framer *does* expose its timelines, just not in the CSS:

- **Scroll reveals** — `__framer__enter` / `__framer__animate` / `__framer__exit` plus `__framer__animateOnce` and `__framer__threshold`, in `script_main.mjs`.
- **Page-load entrances** — the `__framer__appearAnimationsContent` JSON block inlined in every published page.
- **Code components** — their own modules (`TextScrollReveal`, `ImageParallaxVerticalNoize`, `Animator_Basic_With_Scroll`), with per-instance props in the page's route module.

Anything still marked *(est.)* has not been read out of those sources yet; prefer extracting over eyeballing.

## Motion tokens (single source for all durations below)

| Token | Value | Use |
|---|---|---|
| `motion-fast` | 250ms *(est.)* | hovers, icon slides, dot travel |
| `motion-normal` | 600ms *(est.)* | accordion, crossfades |
| `motion-slow` | 1200ms *(est.)* | hero image entrance, image scale-ins |
| `motion-reveal` | **800ms (measured)** | every viewport reveal |
| `motion-appear` | **1000ms (measured)** | page-load entrance |
| `motion-appear-slow` | **2000ms (measured)** | decorative wave lines on load |
| `ease-out-soft` | cubic-bezier(0.25, 0.1, 0.25, 1) *(est.)* | legacy default |
| `ease-inout` | **cubic-bezier(0.44, 0, 0.56, 1) (measured)** | reveals, links, card hovers |
| `ease-appear` | **cubic-bezier(0.2, 0, 0.2, 1) (measured)** | page-load entrance |
| `ease-appear-slow` | **cubic-bezier(0.4, 0, 0.2, 1) (measured)** | wave lines |

**Reveal defaults (measured)** — `opacity 0 → 1` and *nothing else*: no translate (every revealed node ships `transform:none`), `motion-reveal`, `ease-inout`, **delay 0 — no stagger**, `threshold: 0`, and **replayed on every re-entry**, with an instant (duration-0) reset to hidden on exit. The earlier "fade + 40px rise, once, threshold 20%, 80–120ms stagger" was a guess and was wrong on all five counts.

Technology plan: **CSS keyframes for the hero entrance** (it is the LCP region — it must be server-rendered and visible without JS; the timeline is pure opacity/translate/scale). **Motion (Framer Motion)** for below-the-fold reveals, hovers with state, accordion. **GSAP + ScrollTrigger** ONLY for the pinned scroll scenes (Toggle, How It Works, Big Quote reveal) and the odometer. GSAP logic is dynamically imported into already-server-rendered section markup with reserved heights — never `ssr:false` on the section component itself (CLS).

Touch policy (all hover-driven effects): hover states are enhancement-only — touch devices get the default state; active/focus-visible mirror the hover colors without the slide. No functionality may hide behind hover.

---

## 1. Hero entrance (page load)
- Implementation: CSS keyframes on server-rendered markup (see above) — `<AppearIn>`. Never `Reveal`: this is the LCP region and must not be gated on JS.
- Every element starts at **opacity 0.001** (not 0) and runs `motion-appear` / `ease-appear`, with an optional 20px approach.

**Measured entrance timeline (/about; the same shape on other inner pages):**

| Element | From | Delay |
|---|---|---|
| Decorative wave lines | opacity only, `motion-appear-slow` / `ease-appear-slow` | 0 |
| Header logo group | y +20 | 200ms |
| Nav: About / Services / Specialists / Stories / Book a session | y +20 | 400 / 500 / **700** / **600** / 800ms |
| Hero `h1` | **y −20** — the only element that drops in from above | 400ms |
| Hero lede | y +20 | 400ms |
| Page label ("About") | y +20 | 400ms |
| Lead paragraph | y +20 | 400ms |
| TrustPoint row | y +20 | 800ms |

The nav's 3rd and 4th links are transposed on the reference (Specialists 0.7s lands after Stories 0.6s). Reproduced as measured; clean to 600/700 if the design owner prefers.

- Mobile: identical (durations unchanged). RTL: unchanged (vertical motion). Reduced-motion: handled globally — durations *and delays* are capped to 0.01ms.

## 2. Toggle scroll scene (pinned, the signature animation)
Measured at the audit viewport (639px tall): section = 1195px total; inner container 100vh sticky; scrubbed scroll distance = section height − 100vh ≈ 556px (≈ 0.87 viewport-heights of scrub). Express in code as `height: 187vh` *(est. — height scales with viewport height; verify)*. Scroll progress drives:
- Stage A (0→30%): hero image lightens/washes out to near-white; navy/teal photographic scene fades in with light-streak imagery and circle line-art; white headline "If only unlocking peak vitality…" + sub-paragraph fade/rise in.
- Stage B (30→55%): "VITALITY" label + switch track fade in above the headline; the white knob animates into the track (drops in from above *(est.)*); switch shows OFF (knob left, track light).
- Stage C (55→100%): background crossfades to white; switch flips ON (knob slides right, track fills `#244C5F`); headline crossfades to "There is no single switch. But there is Longevity by Design." in `#2E3231`; sub-paragraph swaps to the 5D Framework line.
- Deep-link anchor lands on the ON state.
- Mobile: same scene, shorter pin distance *(est.)*; scrub stays scroll-linked (no autoplay). RTL: OFF/ON knob travel mirrors (ON = knob at inline-end). Reduced-motion: static ON state, no pin.

## 3. Section reveals (all sections) — **measured**
- Trigger: viewport enter at `threshold: 0` (any pixel), **every time**, not once.
- Fade only: `opacity 0 → 1`, `motion-reveal` (800ms), `ease-inout`. **No translate, no stagger, no delay.**
- On exit the element resets to `opacity: 0` instantly (exit transition duration 0) so the fade replays in full next time.
- Implemented in `.reveal` / `.reveal-visible` (globals.css) + `Reveal.tsx`. `Reveal` takes `once` and `delay` for deliberate departures; the reference uses neither.
- No stagger means nothing to mirror — RTL is unaffected. Mobile: identical. Reduced-motion: handled globally.
- **Outstanding**: the mechanism change is site-wide, but the leftover `delay` props were only stripped from the sections `/about` renders (`ContactPath`, `FAQSection`, `StoryFeature`, `SplitStatement`). Home-only sections — `ProgramsGrid`, `PhilosophyStatement`, `HowItWorks`, `JournalSection`, `StatsSection`, `ConsultationSection`, `SpecialistsSection`, `Hero` — still stagger their children and need the same sweep.

## 4. How It Works (pinned steps)
- Heading + intro: standard reveal.
- Steps block pins for ~1736px of scroll (measured "Steps" height at audit viewport). For each of the 3 steps: serif title + paragraph fade/rise in on the left, previous step fades out; the giant navy number (right, ~560px tall) transitions 01→02→03 — crossfade with slight vertical roll *(est.)*, ease-inout.
- Background squiggle line-art: static (subtle parallax drift *(est., verify)*).
- Mobile: unpinned; steps stack and reveal normally with smaller numbers *(assumption — verify at Phase 9)*. RTL: number column mirrors to inline-start, text inline-end. Reduced-motion: unpinned stacked list, no number animation.

## 5. Big Quote scroll reveal
- Full-bleed dark section. Quote starts at ~25% white opacity and reveals to full white **progressively with scroll** (word/line-level scrub). Attribution fades in at the end.
- Mobile: identical, shorter scrub *(est.)*. RTL: reveal follows Arabic reading order automatically (DOM order). Reduced-motion: static full-opacity text.

## 6. Statistics odometer
- Trigger: viewport enter, once. Each digit column rolls (vertical 0–9 strip) to target over ~1.2s (`motion-slow`) ease-out; "+" static. DOM evidence: per-digit strips in the published page.
- Digits are Western (latn) in BOTH locales — pin `numberingSystem: 'latn'` in the shared formatter.
- Mobile: identical. RTL: number value itself stays LTR (digit order unchanged); label alignment mirrors. Reduced-motion: static numbers.

## 7. Buttons (hover/press)
- Hover: background/text colors invert (navy ↔ white) and the dot slides to the opposite end, label shifts — `motion-fast`, ease-inout. Pure CSS (`:hover` + transforms with logical positioning) — no JS.
- Touch: no hover simulation; `:active` shows the inverted colors instantly. Focus-visible: same as hover + outline.
- RTL: dot sides come from logical inset properties; slide direction mirrors automatically.

## 8. Header variant swap
- Fixed header switches White ↔ Dark text variant when leaving/entering the hero (threshold ≈ hero height − header height). Crossfade ~250ms (`motion-fast`) *(est.)*.
- Applies to links and CTA pill variant together. Active-page link underlined.
- Mobile: same logic on the compact header. Reduced-motion: instant swap.

## 9. FAQ accordion
- Expand/collapse: height auto-animate `motion-normal` ease-inout; plus-circle icon rotates 45° *(est.)*.
- One-open-at-a-time *(unverified — check live during build)*.
- Mobile: identical. RTL: icon at inline-end, text inline-start. Reduced-motion: instant toggle.

## 10. Story feature images
- Two stacked images reveal with scale 1.06→1 + fade, `motion-slow`, ease-out-soft; subtle parallax offset between the two layers on scroll *(est.)*.
- Mobile: reveal identical; parallax reduced or disabled *(est.)*. RTL: image column mirrors; parallax (decorative vertical/depth) NOT mirrored. Reduced-motion: static, no parallax.

## 11. Pricing toggle (services/prices)
- "ONE ↔ UP TO +3 (20% OFF)": switch swaps the visible card set (crossfade ~300ms *(est.)*). Same switch component as §2 stage C in miniature, here user-interactive.
- Mobile: identical. RTL: knob travel mirrors. Reduced-motion: instant swap.

## 12. Mobile menu *(design unverified — see design-inventory Open Questions)*
- Assumed: hamburger → full-screen overlay/drawer, links stagger in (reading order), `motion-normal`; focus trap; body scroll lock.
- RTL: drawer origin at inline-end; stagger follows DOM. Reduced-motion: instant open/close.

## 13. Footer
- Newsletter/link columns: standard reveal (§3). Decorative long-line squiggles cross the seam; static *(verify — possible slow drift)*.
- Mobile: standard reveal. Reduced-motion: §3 policy.

## 14. /about — method panel and founder portrait — **measured**
- **`#the-way-we-help`**: full-bleed `#000` panel, `min-height: 120vh` desktop / `100vh` below. The statement scrubs word by word from opacity **0.2 → 1** as the panel crosses the viewport, starting when its top reaches the fold and completing a quarter down the screen. The reference smooths the scrub with a spring (`stiffness 500, damping 60, mass 1`); `WordReveal` approximates this with quantized progress. Type is its own preset (`text-statement`, 30/38/44px).
- **`#meet-anna` portrait**: the image is rendered `calc(100% + 300px)` tall inside a clipped frame and translates up across a full viewport traversal (normalised over `viewport height + frame height`, not the shorter `useElementProgress` window). Travel drops to **0 at phone**. A noise tile rides with it at 100×100px, opacity 0.15, `mix-blend-mode: overlay`. See `ParallaxImage`.
- **Specialist/discipline card grain**: separate treatment — 128px tile at opacity 0.1, no blend mode, static. See `MaskedPortrait`'s `noise` prop.
- Reduced motion: both disabled (the image sits at its natural height; the statement renders at full opacity).

## RTL animation policy (summary)
- Vertical motion (fades/rises): unchanged.
- Reading-order staggers: follow DOM order → automatically right-to-left in Arabic.
- Semantic horizontal motion (toggle ON direction, button dot travel, drawer origin): mirrored via logical positioning.
- Decorative motion (parallax, image scale, squiggle drift): NOT mirrored.
- Direction is provided to animation primitives from the `[locale]` layout via context/props (server-known) — never read from `document.dir` at render time (hydration safety).

## Reduced motion policy
`prefers-reduced-motion: reduce` ⇒ no pinned scenes (content stacks statically), no parallax, no odometer, opacity-only reveals ≤150ms, accordion/menu near-instant. Implemented centrally (`useMotionPreferences` returns an SSR-safe default and applies the real media-query value in an effect; CSS animations use the media query directly). All content fully accessible without motion.
